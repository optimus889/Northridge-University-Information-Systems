import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    ownerRole: { type: String, enum: ["student", "faculty"], required: true, index: true },
    title: String,
    summary: String,
    category: String,
    severity: String,
    date: String,
    description: String
  },
  { timestamps: true }
);

export const Notice = mongoose.model("Notice", noticeSchema);
