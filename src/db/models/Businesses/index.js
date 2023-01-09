import mongoose from "mongoose";

const businessesSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const Businesses = mongoose.model("Businesses", businessesSchema);
