import mongoose from "mongoose";

const panelSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const Panel = mongoose.model("Panel", panelSchema);
