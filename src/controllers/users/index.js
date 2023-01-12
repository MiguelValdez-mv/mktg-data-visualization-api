import Passwordless from "supertokens-node/recipe/passwordless";

import { User } from "@/db/models/User";
import { getFileUrlFromRequest } from "@/utils/getFileUrlFromRequest";

export const checkUserExistenceByEmail = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });

  res.status(200).send(!!user);
};

export const getUserFromSession = async (req, res) => {
  const userId = req.session.getUserId();
  const { email } = await Passwordless.getUserById({ userId });
  const user = await User.findOne({ email });

  res.status(200).send(user);
};

export const createUser = async (req, res) => {
  const { name, email, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    role,
    avatar: getFileUrlFromRequest(req),
  });

  res.status(200).send(newUser);
};
