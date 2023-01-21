import fs from "fs-extra";
import path from "path";

export const deleteAvatar = async (avatar) => {
  if (!avatar) return;

  const filename = avatar.slice(avatar.lastIndexOf("/") + 1);

  await fs.unlink(path.join(__dirname, `../../../uploads/${filename}`));
};
