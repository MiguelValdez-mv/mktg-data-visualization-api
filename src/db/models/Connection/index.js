import mongoose from "mongoose";

import { CONNECTION_TYPES } from "@/constants";

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

export const Connection = mongoose.model("Connection", connectionSchema);
