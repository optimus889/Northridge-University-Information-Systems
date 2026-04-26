import mongoose from "mongoose";

const securityAlertSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    severity: String,
    title: String,
    source: String,
    status: String,
    time: String,
    description: String
  },
  { timestamps: true }
);

export const SecurityAlert = mongoose.model("SecurityAlert", securityAlertSchema);
