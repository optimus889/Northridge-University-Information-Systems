import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    user: String,
    role: String,
    action: String,
    result: String,
    time: String,
    sourceIp: String
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
