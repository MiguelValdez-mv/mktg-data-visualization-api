import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({});

export const Users = mongoose.model("Users", UsersSchema);
