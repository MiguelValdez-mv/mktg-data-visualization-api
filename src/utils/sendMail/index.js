import nodemailer from "nodemailer";

import { ENV } from "@/constants";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: ENV.NODEMAILER_USER,
    pass: ENV.NODEMAILER_PASSWORD,
  },
});

export const sendMail = (opts, cb) =>
  transporter.sendMail({ ...opts, from: opts.from || ENV.NODEMAILER_USER }, cb);
