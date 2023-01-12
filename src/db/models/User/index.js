import mongoose from "mongoose";

import { USER_ROLES } from "@/constants";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(USER_ROLES) },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
