import mongoose from "mongoose";

const panelsSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const Panels = mongoose.model("Panels", panelsSchema);
