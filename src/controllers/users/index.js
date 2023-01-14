import Passwordless from "supertokens-node/recipe/passwordless";

import { User } from "@/db/models/User";
import { getFileUrlFromRequest } from "@/utils/getFileUrlFromRequest";
import { sendMail } from "@/utils/sendMail";

export const checkUserExistenceByEmail = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });

  res.status(200).send(!!user);
};

export const getUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).send(users);
};

export const createUser = async (req, res) => {
  const { name, email, role, notifyRegistration } = req.body;

  const newUser = await User.create({
    name,
    email,
    role,
    avatar: getFileUrlFromRequest(req),
  });

  if (notifyRegistration) {
    await sendMail({
      to: email,
      subject: "¡Bienvenid@!",
      text: `Hola ${name}, \n\nSu cuenta fue registrada exitosamente. Su email de acceso es: ${email}`,
    });
  }

  res.status(200).send(newUser);
};

export const getUserFromSession = async (req, res) => {
  const userId = req.session.getUserId();
  const { email } = await Passwordless.getUserById({ userId });
  const user = await User.findOne({ email });

  res.status(200).send(user);
};
