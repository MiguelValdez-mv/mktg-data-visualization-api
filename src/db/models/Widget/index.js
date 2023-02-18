import mongoose from "mongoose";

import { TIME_UNITS } from "@/constants";

const timeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: Object.values(TIME_UNITS),
    required: true,
  },
});

const widgetSchema = new mongoose.Schema(
  {
    title: { type: String },
    timespan: {
      type: timeSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Widget = mongoose.model("Widget", widgetSchema);
