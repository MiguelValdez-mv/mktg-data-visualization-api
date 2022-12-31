import Passwordless from "supertokens-node/recipe/passwordless";

import { Users } from "@/db/models/Users";

export const checkUserExistenceByEmail = async (req, res) => {
  const { email } = req.query;
  const user = await Users.findOne({ email });

  res.status(200).send(!!user);
};

export const getUserDetailsFromSupertokensId = async (req, res) => {
  const userId = req.session.getUserId();
  const { email } = await Passwordless.getUserById({ userId });
  const userDetails = await Users.findOne({ email });

  res.status(200).send(userDetails);
};
