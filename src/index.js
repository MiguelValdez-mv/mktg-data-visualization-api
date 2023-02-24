import consola from "consola";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";

import { ENV } from "@/constants";
import { connectDb } from "@/db";
import { errorHandler } from "@/middlewares/error";
import businessRouter from "@/routes/businesses";
import connectionRouter from "@/routes/connections";
import panelRouter from "@/routes/panels";
import userRouter from "@/routes/users";
import widgetRouter from "@/routes/widgets";
import { startSupertokens } from "@/thirdParty/supertokens";

startSupertokens();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ENV.REACT_APP_WEBSITE_URL,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(middleware());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use("/users", userRouter);
app.use("/businesses", businessRouter);
app.use("/connections", connectionRouter);
app.use("/panels", panelRouter);
app.use("/widgets", widgetRouter);

// Error handling
app.use(errorHandler);

// Server startup
app.listen(ENV.PORT, async () => {
  consola.info(`Server started at port ${ENV.PORT}`);

  await connectDb();
});
