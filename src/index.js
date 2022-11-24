import consola from "consola";
import cors from "cors";
import express from "express";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";

import { ENV, SUPERTOKENS_CONFIG } from "@/constants";
import { connectDb } from "@/db";

supertokens.init(SUPERTOKENS_CONFIG);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
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
