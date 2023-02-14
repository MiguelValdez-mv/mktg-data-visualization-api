import { Business } from "@/db/models/Business";
import { User } from "@/db/models/User";
import { isAdminUser, isOwnerUser } from "@/utils/checkUserRole";
import { getAvatarFromRequest } from "@/utils/getAvatarFromRequest";

export const deleteBusinesses = async (req, res) => {
  const ids = req.query.ids.split(",");

  const result = await Business.deleteMany({ _id: { $in: ids } });

  res.status(200).send(result);
};

export const createBusiness = async (req, res) => {
  const { name, type, description, ownerId } = req.body;

  const business = await Business.create({
    name,
    type,
    description,
    ownerId,
    avatar: getAvatarFromRequest(req),
  });

  res.status(200).send(business);
};

export const getBusinessById = async (req, res) => {
  const { id } = req.params;

  const business = await Business.findById(id);

  if (!business) {
    res.status(404).send({ message: "Business not found" });
    return;
  }

  res.status(200).send(business);
};

export const updateBusinessById = async (req, res) => {
  const { id } = req.params;

  const { name, type, description, ownerId, avatar: avatarInput } = req.body;
  const avatar = getAvatarFromRequest(req) ?? avatarInput;

  const updatedBusiness = await Business.findByIdAndUpdate(
    id,
    {
      name,
      type,
      description,
      ownerId,
      ...(avatar ? { avatar } : { $unset: { avatar: 1 } }),
    },
    { new: true }
  );

  res.status(200).send(updatedBusiness);
};

export const addEmployeesToBusiness = async (req, res) => {
  const { id } = req.params;
  const { employeeIds } = req.body;

  const updatedBusiness = await Business.findByIdAndUpdate(
    id,
    {
      $push: {
        employeeIds: { $each: employeeIds },
      },
    },
    { new: true }
  );

  res.status(200).send(updatedBusiness);
};

export const deleteBusinessEmployees = async (req, res) => {
  const { id } = req.params;

  const employeeIds = req.query.employeeIds.split(",");

  const updatedBusiness = await Business.findByIdAndUpdate(
    id,
    {
      $pullAll: { employeeIds },
    },
    { new: true }
  );

  res.status(200).send(updatedBusiness);
};

export const getBusinessesByUserId = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  const businesses = await Business.find({
    ...(isAdminUser(user)
      ? {}
      : { [isOwnerUser(user) ? "ownerId" : "employeeIds"]: id }),
  });

  res.status(200).send(businesses);
};
