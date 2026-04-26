import mongoose from "mongoose";

const emailMessageSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    ownerRole: { type: String, enum: ["student", "faculty", "admin"], required: true, index: true },
    from: String,
    to: String,
    subject: String,
    time: String,
    category: String,
    body: String,
    direction: { type: String, enum: ["inbox", "sent"], default: "inbox" }
  },
  { timestamps: true }
);

export const EmailMessage = mongoose.model("EmailMessage", emailMessageSchema);
