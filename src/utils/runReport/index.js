import { FacebookAdsApi, AdAccount } from "facebook-nodejs-business-sdk";

import { CONNECTION_TYPES } from "@/constants";
import { Connection } from "@/db/models/Connection";
import { getTimeRange } from "@/utils/getTimeRange";

export const runReport = async ({
  selector,
  metricName,
  dimensionName,
  timespan,
  filters,
}) => {
  const { type, accessToken } = await Connection.findById(
    selector.connectionId
  );

  let rows = [];
  let error = null;
  try {
    switch (type) {
      case CONNECTION_TYPES.GOOGLE_ANALYTICS: {
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
