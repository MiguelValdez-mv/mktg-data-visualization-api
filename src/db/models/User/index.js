/* eslint-disable */
import mongoose from "mongoose";

import { USER_ROLES } from "@/constants";

import { Business } from "../Business";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: Object.values(USER_ROLES) },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("findOneAndUpdate", async function () {
  const user = await this.model.findOne(this.getFilter());
  const update = this.getUpdate();

  if (user.role === update.role) {
    return;
  }

  if (user.role === USER_ROLES.OWNER) {
    await Business.deleteMany({ ownerId: user._id });
    return;
  }

  if (user.role === USER_ROLES.EMPLOYEE) {
    await Business.updateMany({}, { $pull: { employeeIds: user._id } });
  }
});

userSchema.pre("deleteMany", async function () {
  const users = await this.model.find(this.getFilter());
  const ids = users.map(({ _id }) => _id);

  await Business.deleteMany({ ownerId: { $in: ids } });
  await Business.updateMany({}, { $pullAll: { employeeIds: ids } });
});

export const User = mongoose.model("User", userSchema);
