import mongoose from "mongoose";

import { USER_ROLES } from "@/constants";
import { Business } from "@/db/models/Business";
import { isOwnerUser, isEmployeeUser } from "@/utils/checkUserRole";

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

  if (isOwnerUser(user)) {
    await Business.deleteMany({ ownerId: user._id });
    return;
  }

  if (isEmployeeUser(user)) {
    await Business.updateMany({}, { $pull: { employeeIds: user._id } });
  }
});

userSchema.pre("deleteMany", async function () {
  const users = await this.model.find(this.getFilter());

  const { ownerIds, employeeIds } = users.reduce(
    (acum, curr) => {
      if (isOwnerUser(curr)) {
        return {
          ...acum,
          ownerIds: [...acum.ownerIds, curr._id],
        };
      }

      if (isEmployeeUser(curr)) {
        return {
          ...acum,
          employeeIds: [...acum.employeeIds, curr._id],
        };
      }

      return acum;
    },
    { ownerIds: [], employeeIds: [] }
  );

  await Business.deleteMany({ ownerId: { $in: ownerIds } });
  await Business.updateMany({}, { $pullAll: { employeeIds } });
});

export const User = mongoose.model("User", userSchema);
