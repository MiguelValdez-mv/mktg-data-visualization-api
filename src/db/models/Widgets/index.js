import mongoose from "mongoose";

const widgetsSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const Widgets = mongoose.model("Widgets", widgetsSchema);
