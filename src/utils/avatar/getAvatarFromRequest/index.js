export const getAvatarFromRequest = (req) => {
  if (!req.file) return;

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // eslint-disable-next-line consistent-return
  return `${baseUrl}/uploads/${req.file.filename}`;
};
