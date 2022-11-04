import * as dotenv from "dotenv";

dotenv.config();

export const ENV = {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  PORT: Number(process.env.PORT || "8080"),
};
