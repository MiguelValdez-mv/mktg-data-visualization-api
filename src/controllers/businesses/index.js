import { Business } from "@/db/models/Business";

export const createBusiness = async (req, res) => {
  const { name, type, description, ownerId, avatar } = req.body;

  const business = await Business.create({
    name,
    type,
    description,
    ownerId,
    avatar,
  });

  res.status(200).send(business);
};
