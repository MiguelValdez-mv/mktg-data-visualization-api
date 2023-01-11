import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const Connection = mongoose.model("Connection", connectionSchema);
