import mongoose from "mongoose";

const BusinessesSchema = new mongoose.Schema({});

export const Businesses = mongoose.model("Businesses", BusinessesSchema);
