import mongoose from "mongoose";

import { TIME_UNITS, CHART_TYPES, OPERATORS } from "@/constants";

const selectorSchema = new mongoose.Schema({
  // property id (ga4) or id of the ad account (facebook ads)
  _id: { type: String, required: true },
  name: { type: String, required: true },
  connectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Connection",
    required: true,
  },
});

const timeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: Object.values(TIME_UNITS),
      required: true,
    },
  },
  { _id: false }
);

const filterSchema = new mongoose.Schema(
  {
    fieldName: { type: String, required: true },
    operator: {
      type: String,
      enum: Object.values(OPERATORS),
      required: true,
    },
    operand: { type: String, required: true },
  },
  { _id: false }
);

const layoutSchema = new mongoose.Schema(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    w: { type: Number, required: true },
    h: { type: Number, required: true },
  },
  { _id: false }
);

const widgetSchema = new mongoose.Schema(
  {
    panelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Panel",
      required: true,
    },
    selector: { type: selectorSchema, required: true },
    metricName: { type: String, required: true },
    chartType: {
      type: String,
      enum: Object.values(CHART_TYPES),
      required: true,
    },
    dimensionName: { type: String },
    timespan: {
      type: timeSchema,
      required: true,
    },
    title: { type: String },
    filters: [{ type: filterSchema }],
    layout: {
      type: layoutSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Widget = mongoose.model("Widget", widgetSchema);
