import mongoose from "mongoose";

import { Widget } from "@/db/models/Widget";

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

panelSchema.pre("deleteMany", async function () {
  const panelIds = (await this.model.find(this.getFilter())).map(
    (panel) => panel._id
  );

  await Widget.deleteMany({ panelId: { $in: panelIds } });
});

panelSchema.pre("deleteOne", async function () {
  const panel = await this.model.findOne(this.getFilter());

  await Widget.deleteMany({ panelId: panel._id });
});

export const Panel = mongoose.model("Panel", panelSchema);
