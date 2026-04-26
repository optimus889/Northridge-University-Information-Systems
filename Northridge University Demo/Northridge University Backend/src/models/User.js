import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty", "admin"], required: true, index: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    title: String,
    office: String,
    phone: String,
    specialization: String,
    program: String,
    accessScope: String,
    securityStatus: { type: String, default: "MFA Enabled" },
    status: { type: String, default: "Active" },
    mfaStatus: { type: String, default: "Enabled" },
    lastLogin: { type: String, default: "Today" },
    responsibility: String,
    assignedCourse: String
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
