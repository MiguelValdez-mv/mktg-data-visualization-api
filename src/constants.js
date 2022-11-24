import * as dotenv from "dotenv";
import Dashboard from "supertokens-node/recipe/dashboard";
import Passwordless from "supertokens-node/recipe/passwordless";
import Session from "supertokens-node/recipe/session";

dotenv.config();

export const ENV = {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  PORT: Number(process.env.PORT || "8080"),
  SUPERTOKENS_CONNECTION_URI: process.env.SUPERTOKENS_CONNECTION_URI,
  SUPERTOKENS_API_KEY: process.env.SUPERTOKENS_API_KEY,
};

export const SUPERTOKENS_CONFIG = {
  framework: "express",
  supertokens: {
    connectionURI: ENV.SUPERTOKENS_CONNECTION_URI,
    apiKey: ENV.SUPERTOKENS_API_KEY,
  },
  appInfo: {
    appName: "Marketing data visualization",
    apiDomain: "http://localhost:8080",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    Passwordless.init({
      flowType: "USER_INPUT_CODE",
      contactMethod: "EMAIL",
    }),
    Session.init(),
    Dashboard.init({ apiKey: ENV.SUPERTOKENS_API_KEY }),
  ],
};
