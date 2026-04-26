import mongoose from "mongoose";

const documentItemSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    ownerRole: { type: String, enum: ["student", "faculty"], required: true, index: true },
    name: String,
    type: String,
    storageKey: String,
    protectedBy: String
  },
  { timestamps: true }
);

export const DocumentItem = mongoose.model("DocumentItem", documentItemSchema);
