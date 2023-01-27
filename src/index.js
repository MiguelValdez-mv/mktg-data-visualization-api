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
import businessesRoutes from "@/routes/businesses";
import usersRoutes from "@/routes/users";
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
app.use("/users", usersRoutes);
app.use("/businesses", businessesRoutes);

// Error handling
app.use(errorHandler);

// Server startup
app.listen(ENV.PORT, async () => {
  consola.info(`Server started at port ${ENV.PORT}`);

  await connectDb();
});
