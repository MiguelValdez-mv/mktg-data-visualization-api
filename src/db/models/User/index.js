import mongoose from "mongoose";

import { USER_ROLES } from "@/constants";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: Object.values(USER_ROLES), required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
