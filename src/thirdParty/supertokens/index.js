import supertokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import Passwordless from "supertokens-node/recipe/passwordless";
import Session from "supertokens-node/recipe/session";

import { ENV } from "@/constants";

export const startSupertokens = () => {
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
};
