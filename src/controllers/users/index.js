import Passwordless from "supertokens-node/recipe/passwordless";

import { User } from "@/db/models/User";

export const checkUserExistenceByEmail = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });

  res.status(200).send(!!user);
};

export const getUserDetailsFromSupertokensId = async (req, res) => {
  const userId = req.session.getUserId();
  const { email } = await Passwordless.getUserById({ userId });
  const userDetails = await User.findOne({ email });

  res.status(200).send(userDetails);
};

export const createUser = async (req, res) => {
  const { name, email, role } = req.body;

  let avatar;
  if (req.file) {
    avatar = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
  }

  const newUser = await User.create({
    name,
    email,
    role,
    avatar,
  });

  res.status(200).send(newUser);
};
