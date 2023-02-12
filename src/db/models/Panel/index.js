import mongoose from "mongoose";

const panelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Panel = mongoose.model("Panel", panelSchema);
