import mongoose from "mongoose";

import { BUSINESS_TYPES } from "@/constants";

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(BUSINESS_TYPES) },
    description: { type: String },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Business = mongoose.model("Business", businessSchema);
