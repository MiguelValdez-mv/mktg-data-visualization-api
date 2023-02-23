import { AnalyticsAdminServiceClient } from "@google-analytics/admin";
import { FacebookAdsApi, User, AdAccount } from "facebook-nodejs-business-sdk";

import {
  CONNECTION_TYPES,
  ENV,
  GA_METRICS,
  GA_DIMENSIONS,
  FB_ADS_METRICS,
  FB_ADS_DIMENSIONS,
} from "@/constants";
import { Connection } from "@/db/models/Connection";
import { getGoogleOAuth2Client } from "@/thirdParty/googleAuth";

export const getConnections = async (req, res) => {
  const connections = await Connection.find();

  res.status(200).send(connections);
};

export const deleteConnections = async (req, res) => {
  const ids = req.query.ids.split(",");

  const result = await Connection.deleteMany({ _id: { $in: ids } });

  res.status(200).send(result);
};

export const createConnection = async (req, res) => {
  const { type, code, accessToken } = req.body;

  let connectionParams;
  switch (type) {
    case CONNECTION_TYPES.GOOGLE_ANALYTICS: {
      const googleOAuth2Client = getGoogleOAuth2Client();
      const { tokens } = await googleOAuth2Client.getToken(code);
      const { refresh_token: refreshToken } = tokens;

      googleOAuth2Client.setCredentials(tokens);

      const {
        data: {
          metadata: {
            sources: [{ id: userId }],
          },
          emailAddresses: [{ value: email }],
        },
      } = await googleOAuth2Client.request({
        url: "https://people.googleapis.com/v1/people/me?personFields=metadata,emailAddresses",
      });

      connectionParams = {
        type,
        refreshToken,
        userId,
        email,
      };

      break;
    }
    case CONNECTION_TYPES.FACEBOOK_ADS: {
      const facebookAdsApi = FacebookAdsApi.init(accessToken);

      const { access_token: longLivedAccessToken } = await facebookAdsApi.call(
        "GET",
        ["oauth", "access_token"],
        {
          grant_type: "fb_exchange_token",
          client_id: ENV.FACEBOOK_APP_ID,
          client_secret: ENV.FACEBOOK_APP_SECRET_KEY,
          fb_exchange_token: accessToken,
        }
      );
      const { id: userId, email } = await facebookAdsApi.call("GET", ["me"], {
        fields: "id,email",
      });

      connectionParams = {
        type,
        accessToken: longLivedAccessToken,
        userId,
        email,
      };

      break;
    }
    default: {
      res.status(422).send({ message: "Invalid connection type" });
      return;
    }
  }

  const connection = await Connection.create(connectionParams);

  res.status(200).send(connection);
};

export const getConnectionsMetadata = async (req, res) => {
  const connections = await Connection.find();

  let { properties, adAccounts } = connections.reduce(
    (acum, curr) => {
      const { type, accessToken, refreshToken, userId } = curr;

      switch (type) {
        case CONNECTION_TYPES.GOOGLE_ANALYTICS: {
          const getProperties = async () => {
            const googleOAuth2Client = getGoogleOAuth2Client();

            googleOAuth2Client.setCredentials({ refresh_token: refreshToken });

            const analyticsAdminClient = new AnalyticsAdminServiceClient({
              authClient: googleOAuth2Client,
            });

            const [accounts] =
              await analyticsAdminClient.listAccountSummaries();

            return Promise.resolve(
              accounts
                .flatMap((acc) => acc.propertySummaries)
                .map((prop) => ({
                  id: prop.property.replace("properties/", ""),
                  name: prop.displayName,
                }))
            );
          };

          return {
            ...acum,
            properties: [...acum.properties, getProperties()],
          };
        }
        case CONNECTION_TYPES.FACEBOOK_ADS: {
          FacebookAdsApi.init(accessToken);

          const user = new User(userId);

          return {
            ...acum,
            adAccounts: [
              ...acum.adAccounts,
              user.getAdAccounts([AdAccount.Fields.id, AdAccount.Fields.name]),
            ],
          };
        }
        default: {
          return acum;
        }
      }
    },
    {
      properties: [],
      adAccounts: [],
    }
  );

  properties = (await Promise.all(properties)).flat();

  adAccounts = (await Promise.all(adAccounts))
    .flat()
    .map(({ _data: { id, name } }) => ({ id: id.replace("act_", ""), name }));

  const connectionsMetadata = {
    [CONNECTION_TYPES.GOOGLE_ANALYTICS]: {
      selectors: properties,
      metrics: GA_METRICS,
      dimensions: GA_DIMENSIONS,
    },
    [CONNECTION_TYPES.FACEBOOK_ADS]: {
      selectors: adAccounts,
      metrics: FB_ADS_METRICS,
      dimensions: FB_ADS_DIMENSIONS,
    },
  };

  res.status(200).send(connectionsMetadata);
};
