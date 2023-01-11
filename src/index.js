import consola from "consola";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";

import { ENV } from "@/constants";
import { connectDb } from "@/db";
import usersRoutes from "@/routes/users";
import { startSupertokens } from "@/thirdParty/supertokens";

startSupertokens();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ENV.REACT_APP_WEBSITE_URL,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(middleware());
app.use(morgan("dev"));

// Static files
app.use("/uploads", express.static("./uploads"));

// Routes
app.use("/users", usersRoutes);

// Server startup
app.listen(ENV.PORT, async () => {
  consola.info(`Server started at port ${ENV.PORT}`);

  await connectDb();
});
