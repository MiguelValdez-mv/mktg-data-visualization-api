import consola from "consola";
import mongoose from "mongoose";

import { ENV } from "@/constants";

export const connectDb = async () => {
  const uri = `mongodb://${ENV.DB_HOST}/${ENV.DB_NAME}`;
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(uri, config);

    consola.info("Database Connected");
  } catch (err) {
    consola.error(err);
  }
};
