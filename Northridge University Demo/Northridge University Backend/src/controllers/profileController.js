import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ publicId: req.user.publicId }).lean();
  if (!user) throw new ApiError(404, "Profile not found.");

  const base = {
    id: user.publicId,
    name: user.name,
    title: user.title,
    department: user.department,
    email: user.email,
    office: user.office,
    phone: user.phone,
    specialization: user.specialization,
    accessRole: user.role === "admin" ? "Administrator" : user.role === "faculty" ? "Faculty" : "Student",
    securityStatus: user.securityStatus
  };

  if (user.role === "student") {
    res.json({
      ...base,
      studentId: user.publicId.toUpperCase(),
      program: user.program,
      accessScope: user.accessScope
    });
    return;
  }

  if (user.role === "faculty") {
    res.json({
      ...base,
      assignedCourse: user.assignedCourse
    });
    return;
  }

  res.json({
    ...base,
    responsibility: user.responsibility
  });
});
