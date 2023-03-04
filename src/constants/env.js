import * as dotenv from "dotenv";

dotenv.config();

export const ENV = {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  PORT: Number(process.env.PORT || "8080"),
  SUPERTOKENS_CONNECTION_URI: process.env.SUPERTOKENS_CONNECTION_URI,
  SUPERTOKENS_API_KEY: process.env.SUPERTOKENS_API_KEY,
  REACT_APP_WEBSITE_URL:
    process.env.REACT_APP_WEBSITE_URL || "http://localhost:3000",
  get REACT_APP_API_URL() {
    return process.env.REACT_APP_API_URL || `http://localhost:${this.PORT}`;
  },
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
  GOOGLE_APP_CLIENT_ID: process.env.GOOGLE_APP_CLIENT_ID,
  GOOGLE_APP_CLIENT_SECRET_KEY: process.env.GOOGLE_APP_CLIENT_SECRET_KEY,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET_KEY: process.env.FACEBOOK_APP_SECRET_KEY,
};
