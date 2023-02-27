import mongoose from "mongoose";

import { CONNECTION_TYPES } from "@/constants";
import { Widget } from "@/db/models/Widget";

const connectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(CONNECTION_TYPES),
    },
    accessToken: { type: String },
    refreshToken: { type: String },
    userId: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

connectionSchema.pre("deleteMany", async function () {
  const connectionIds = (await this.model.find(this.getFilter())).map(
    (connection) => connection._id
  );

  await Widget.deleteMany({ "selector.connectionId": { $in: connectionIds } });
});

export const Connection = mongoose.model("Connection", connectionSchema);
