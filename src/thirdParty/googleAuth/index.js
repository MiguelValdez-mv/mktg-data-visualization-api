import { OAuth2Client } from "google-auth-library";

import { ENV } from "@/constants";

export const getGoogleOAuth2Client = () =>
  new OAuth2Client(
    ENV.GOOGLE_APP_CLIENT_ID,
    ENV.GOOGLE_APP_CLIENT_SECRET_KEY,
    "postmessage"
  );
