import mongoose from "mongoose";

import { BUSINESS_TYPES } from "@/constants";
import { Panel } from "@/db/models/Panel";

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

businessSchema.pre("deleteMany", async function () {
  const businessIds = (await this.model.find(this.getFilter())).map(
    (business) => business._id
  );

  await Panel.deleteMany({ businessId: { $in: businessIds } });
});

export const Business = mongoose.model("Business", businessSchema);
