import mongoose from "mongoose";

import { ENV } from "@/constants";

const uri = `mongodb://${ENV.DB_HOST}/${ENV.DB_NAME}`;
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(uri, config);

export { Businesses, Connections, Panels, Users, Widgets } from "./schemas";
