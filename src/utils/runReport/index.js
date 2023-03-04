import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { FacebookAdsApi, AdAccount } from "facebook-nodejs-business-sdk";

import { CONNECTION_TYPES, GA_OPERATORS } from "@/constants";
import { Connection } from "@/db/models/Connection";
import { getGoogleOAuth2Client } from "@/thirdParty/googleAuth";
import { getTimeRange } from "@/utils/getTimeRange";

export const runReport = async ({
  selector,
  metricName,
  dimensionName,
  timespan,
  filters,
}) => {
  const { type, accessToken, refreshToken } = await Connection.findById(
    selector.connectionId
  );

  let rows = [];
  let error = null;
  try {
    switch (type) {
      case CONNECTION_TYPES.GOOGLE_ANALYTICS: {
        const googleOAuth2Client = getGoogleOAuth2Client();
        googleOAuth2Client.setCredentials({ refresh_token: refreshToken });

        const analyticsDataClient = new BetaAnalyticsDataClient({
          authClient: googleOAuth2Client,
        });

        const { since: startDate, until: endDate } = getTimeRange(timespan);
        const params = {
          property: selector._id,
          dateRanges: [{ startDate, endDate }],
          metrics: [{ name: metricName }],
          ...(dimensionName && { dimensions: [{ name: dimensionName }] }),
          ...(filters.length && {
            dimensionFilter: {
              andGroup: {
                expressions: filters.map(({ fieldName, operator, operand }) => {
                  const filter = {
                    fieldName,
                    stringFilter: {
                      matchType: GA_OPERATORS[operator.replace("NOT_", "")],
                      value: operand,
                      caseSensitive: false,
                    },
                  };

                  if (operator.includes("NOT_")) {
                    return { notExpression: { filter } };
                  }

                  return { filter };
                }),
              },
            },
          }),
        };

        rows = (await analyticsDataClient.runReport(params))[0].rows.map(
          ({ metricValues, dimensionValues }) => ({
            [metricName]: metricValues[0].value,
            [dimensionName]: dimensionValues[0].value,
          })
        );

        break;
      }
      case CONNECTION_TYPES.FACEBOOK_ADS: {
        FacebookAdsApi.init(accessToken);

        const fields = [metricName, dimensionName].filter(Boolean);
        const params = {
          level: dimensionName.split("_")[0] || "account",
          time_range: getTimeRange(timespan),
          filtering: filters.map(({ fieldName, operator, operand }) => ({
            field: fieldName.replace("_", "."),
            operator,
            value: operand,
          })),
        };

        rows = (
          await new AdAccount(selector._id).getInsights(fields, params)
        ).map((row) => ({
          [metricName]: Number(row[metricName]),
          ...(dimensionName && { [dimensionName]: row[dimensionName] }),
        }));

        break;
      }
      default: {
        throw new Error("Invalid connection type");
      }
    }
  } catch (e) {
    error = e.message;
  }

  return { type, rows, error };
};
