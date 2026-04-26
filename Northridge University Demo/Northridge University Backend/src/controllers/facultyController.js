import { Course } from "../models/Course.js";
import { DocumentItem } from "../models/DocumentItem.js";
import { Notice } from "../models/Notice.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { stripMany, stripMongoFields } from "../utils/responseMapper.js";
import { getSecureObjectUrl } from "../services/aws/s3Service.js";
import { writeAuditLog } from "../services/auditService.js";
import { ApiError } from "../utils/apiError.js";

function buildStudentSummaries() {
  return [
    {
      id: "student-summary-001",
      studentName: "Emily Carter",
      studentEmail: "e.carter@northridge.edu",
      course: "ITC 6520 - Cloud Security",
      attendance: "96%",
      gradeStatus: "In Good Standing",
      riskLevel: "Low"
    },
    ...Array.from({ length: 31 }, (_, index) => {
      const number = index + 2;
      return {
        id: `student-summary-${String(number).padStart(3, "0")}`,
        studentName: `Student ${number}`,
        studentEmail: `student${number}@northridge.edu`,
        course: "ITC 6520 - Cloud Security",
        attendance: `${88 + (index % 10)}%`,
        gradeStatus: index % 5 === 0 ? "Needs Review" : "In Good Standing",
        riskLevel: index % 5 === 0 ? "Medium" : "Low"
      };
    })
  ];
}

export const getDashboard = asyncHandler(async (_req, res) => {
  const [courses, notices] = await Promise.all([
    Course.find({ ownerRole: "faculty" }).lean(),
    Notice.find({ ownerRole: "faculty" }).lean()
  ]);

  const students = buildStudentSummaries();

  res.json({
    summary: {
      teachingCourses: courses.length,
      enrolledStudents: students.length,
      securityStatus: "Role Verified"
    },
    classes: courses.map((course) => `${course.code} - ${course.name}`),
    announcements: notices.map((notice) => notice.summary),
    allowedResources: ["Teaching Courses", "Student Performance Summary", "Faculty Files", "Department Notices"]
  });
});

export const getCourses = asyncHandler(async (_req, res) => {
  res.json(stripMany(await Course.find({ ownerRole: "faculty" }).lean()));
});

export const getStudentSummaries = asyncHandler(async (_req, res) => {
  res.json(buildStudentSummaries());
});

export const getFiles = asyncHandler(async (_req, res) => {
  res.json(stripMany(await DocumentItem.find({ ownerRole: "faculty" }).lean()));
});

export const getFileAccessUrl = asyncHandler(async (req, res) => {
  const file = await DocumentItem.findOne({ publicId: req.body.fileId, ownerRole: "faculty" }).lean();
  if (!file) throw new ApiError(404, "Faculty file not found.");

  await writeAuditLog({
    user: req.user.username,
    role: req.user.role,
    action: `Requested faculty file access: ${file.name}`,
    result: "Allowed",
    sourceIp: req.ip
  });

  res.json(await getSecureObjectUrl(file.storageKey));
});

export const getNotices = asyncHandler(async (_req, res) => {
  res.json(stripMany(await Notice.find({ ownerRole: "faculty" }).lean()));
});

export const getNoticeById = asyncHandler(async (req, res) => {
  const notice = await Notice.findOne({ publicId: req.params.noticeId, ownerRole: "faculty" }).lean();
  if (!notice) throw new ApiError(404, "Faculty notice not found.");
  res.json(stripMongoFields(notice));
});

export const getSecurityStatus = asyncHandler(async (req, res) => {
  res.json({
    identity: req.user.name.replace("Dr. ", ""),
    role: "Faculty",
    mfaStatus: req.user.mfaStatus || "Enabled",
    lastLogin: req.user.lastLogin || "Today",
    deviceStatus: "Verified",
    accessScope: "Faculty Portal Only",
    accountRisk: "Low"
  });
});
