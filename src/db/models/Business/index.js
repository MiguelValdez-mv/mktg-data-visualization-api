import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const Business = mongoose.model("Business", businessSchema);
