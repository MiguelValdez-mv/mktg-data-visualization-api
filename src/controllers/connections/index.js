import { FacebookAdsApi } from "facebook-nodejs-business-sdk";

import { CONNECTION_TYPES, ENV, GA_METRICS, GA_DIMENSIONS } from "@/constants";
import { Connection } from "@/db/models/Connection";
import { googleOAuth2Client } from "@/thirdParty/googleAuth";

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
  res.status(200).send({
    [CONNECTION_TYPES.GOOGLE_ANALYTICS]: {
      metrics: GA_METRICS,
      dimensions: GA_DIMENSIONS,
    },
  });
};
