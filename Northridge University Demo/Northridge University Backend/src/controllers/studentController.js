import { Course } from "../models/Course.js";
import { DocumentItem } from "../models/DocumentItem.js";
import { Notice } from "../models/Notice.js";
import { ScheduleItem } from "../models/ScheduleItem.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { stripMany, stripMongoFields } from "../utils/responseMapper.js";
import { getSecureObjectUrl } from "../services/aws/s3Service.js";
import { writeAuditLog } from "../services/auditService.js";
import { ApiError } from "../utils/apiError.js";

export const getDashboard = asyncHandler(async (_req, res) => {
  const [courses, schedule, documents, notices] = await Promise.all([
    Course.find({ ownerRole: "student" }).lean(),
    ScheduleItem.find({ ownerRole: "student" }).lean(),
    DocumentItem.find({ ownerRole: "student" }).lean(),
    Notice.find({ ownerRole: "student" }).lean()
  ]);

  res.json({
    summary: {
      activeCourses: courses.length,
      upcomingClasses: schedule.length,
      documents: documents.length,
      securityStatus: "MFA Enabled"
    },
    courses: courses.map((course) => course.name),
    notices: notices.map((notice) => notice.summary),
    allowedResources: ["My Courses", "Class Schedule", "Student Documents", "Security Notices"]
  });
});

export const getCourses = asyncHandler(async (_req, res) => {
  res.json(stripMany(await Course.find({ ownerRole: "student" }).lean()));
});

export const getSchedule = asyncHandler(async (_req, res) => {
  res.json(stripMany(await ScheduleItem.find({ ownerRole: "student" }).lean()));
});

export const getDocuments = asyncHandler(async (_req, res) => {
  res.json(stripMany(await DocumentItem.find({ ownerRole: "student" }).lean()));
});

export const getDocumentAccessUrl = asyncHandler(async (req, res) => {
  const document = await DocumentItem.findOne({ publicId: req.body.documentId, ownerRole: "student" }).lean();
  if (!document) throw new ApiError(404, "Document not found.");

  await writeAuditLog({
    user: req.user.username,
    role: req.user.role,
    action: `Requested secure document access: ${document.name}`,
    result: "Allowed",
    sourceIp: req.ip
  });

  res.json(await getSecureObjectUrl(document.storageKey));
});

export const getSecurityStatus = asyncHandler(async (req, res) => {
  res.json({
    identity: req.user.name,
    role: "Student",
    mfaStatus: req.user.mfaStatus || "Enabled",
    lastLogin: req.user.lastLogin || "Today",
    deviceStatus: "Verified",
    accessScope: "Student Portal Only",
    accountRisk: "Low",
    zeroTrustPolicy: [
      "Identity must be verified before access.",
      "Student role can only access student-scoped resources.",
      "Document access should be logged and monitored.",
      "Sensitive files should be retrieved through secure S3 links."
    ]
  });
});

export const getSecurityNotices = asyncHandler(async (_req, res) => {
  res.json(stripMany(await Notice.find({ ownerRole: "student" }).lean()));
});

export const getSecurityNoticeById = asyncHandler(async (req, res) => {
  const notice = await Notice.findOne({ publicId: req.params.noticeId, ownerRole: "student" }).lean();
  if (!notice) throw new ApiError(404, "Security notice not found.");
  res.json(stripMongoFields(notice));
});
