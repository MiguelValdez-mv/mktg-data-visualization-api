import mongoose from "mongoose";

const PanelsSchema = new mongoose.Schema({});

export const Panels = mongoose.model("Panels", PanelsSchema);
