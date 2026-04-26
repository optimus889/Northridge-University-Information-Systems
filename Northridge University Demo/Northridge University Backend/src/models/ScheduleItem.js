import mongoose from "mongoose";

const scheduleItemSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    ownerRole: { type: String, enum: ["student", "faculty"], required: true, index: true },
    day: String,
    time: String,
    course: String,
    location: String
  },
  { timestamps: true }
);

export const ScheduleItem = mongoose.model("ScheduleItem", scheduleItemSchema);
