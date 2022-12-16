import consola from "consola";
import cors from "cors";
import express from "express";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";
import Dashboard from "supertokens-node/recipe/dashboard";
import Passwordless from "supertokens-node/recipe/passwordless";
import Session from "supertokens-node/recipe/session";

import { ENV } from "@/constants";
import { connectDb } from "@/db";

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: ENV.SUPERTOKENS_CONNECTION_URI,
    apiKey: ENV.SUPERTOKENS_API_KEY,
  },
  appInfo: {
    appName: "Marketing data visualization",
    apiDomain: ENV.REACT_APP_API_URL,
    websiteDomain: ENV.REACT_APP_WEBSITE_URL,
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
});

const app = express();

app.use(
  cors({
    origin: ENV.REACT_APP_WEBSITE_URL,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(middleware());
app.use(express.json());

app.listen(ENV.PORT, async () => {
  consola.info(`Server started at port ${ENV.PORT}`);

  await connectDb();
});
