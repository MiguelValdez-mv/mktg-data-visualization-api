import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const Widget = mongoose.model("Widget", widgetSchema);
