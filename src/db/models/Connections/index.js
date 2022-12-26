import mongoose from "mongoose";

const connectionsSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const Connections = mongoose.model("Connections", connectionsSchema);
