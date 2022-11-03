import mongoose from "mongoose";

const WidgetsSchema = new mongoose.Schema({});

export const Widgets = mongoose.model("Widgets", WidgetsSchema);
