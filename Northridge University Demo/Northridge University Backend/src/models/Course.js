import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    ownerRole: { type: String, enum: ["student", "faculty"], required: true, index: true },
    code: String,
    name: String,
    instructor: String,
    status: String,
    location: String,
    schedule: String,
    deliveryMode: String,
    enrolledStudents: Number,
    description: String
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
