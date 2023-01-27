import Passwordless from "supertokens-node/recipe/passwordless";

import { User } from "@/db/models/User";
import { getAvatarFromRequest } from "@/utils/getAvatarFromRequest";
import { sendMail } from "@/utils/sendMail";

export const checkUserExistenceByEmail = async (req, res) => {
  const { email } = req.query;

  const user = await User.findOne({ email });

  res.status(200).send(!!user);
};

export const getUsers = async (req, res) => {
  const users = await User.find(req.query ?? {});

  res.status(200).send(users);
};

export const deleteUsers = async (req, res) => {
  const ids = req.query.ids.split(",");

  const result = await User.deleteMany({ _id: { $in: ids } });

  res.status(200).send(result);
};

export const createUser = async (req, res) => {
  const { name, email, role, notifyRegistration } = req.body;

  const sendNotificationMail = notifyRegistration === "true";

  const [user] = await Promise.all([
    User.create({
      name,
      email,
      role,
      avatar: getAvatarFromRequest(req),
    }),
    sendNotificationMail &&
      sendMail({
        to: email,
        subject: "¡Bienvenid@!",
        text: `Hola ${name}, \n\nSu cuenta fue registrada exitosamente. Su email de acceso es: ${email}`,
      }),
  ]);

  res.status(200).send(user);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  res.status(200).send(user);
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;

  const { name, email, role, avatar: avatarInput } = req.body;
  const avatar = getAvatarFromRequest(req) ?? avatarInput;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      role,
      ...(avatar ? { avatar } : { $unset: { avatar: 1 } }),
    },
    { new: true }
  );

  res.status(200).send(updatedUser);
};

export const getUserBySession = async (req, res) => {
  const userId = req.session.getUserId();
  const { email } = await Passwordless.getUserById({ userId });

  const user = await User.findOne({ email });

  res.status(200).send(user);
};
