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
