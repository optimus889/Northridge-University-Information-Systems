import mongoose from "mongoose";

const complianceStatusSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    overallScore: String,
    framework: String,
    lastAssessment: String,
    controls: [
      {
        id: String,
        name: String,
        category: String,
        status: String,
        awsService: String
      }
    ]
  },
  { timestamps: true }
);

export const ComplianceStatus = mongoose.model("ComplianceStatus", complianceStatusSchema);
