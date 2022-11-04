import consola from "consola";
import express from "express";

import { ENV } from "@/constants";
import { connectDb } from "@/db";

const app = express();

app.use(express.json());

app.listen(ENV.PORT, async () => {
  consola.info(`Server started at port ${ENV.PORT}`);

  await connectDb();
});
