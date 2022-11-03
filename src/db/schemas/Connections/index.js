import mongoose from "mongoose";

const ConnectionsSchema = new mongoose.Schema({});

export const Connections = mongoose.model("Connections", ConnectionsSchema);
