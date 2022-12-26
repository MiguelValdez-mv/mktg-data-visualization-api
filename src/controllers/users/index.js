import { Users } from "@/db/models/Users";

export const checkUserExistenceByEmail = async (req, res) => {
  const { email } = req.params;

  const user = await Users.findOne({ email });

  res.status(200).send(!!user);
};
