import { AuditLog } from "../models/AuditLog.js";
import { ComplianceStatus } from "../models/ComplianceStatus.js";
import { SecurityAlert } from "../models/SecurityAlert.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { stripMany, stripMongoFields } from "../utils/responseMapper.js";
import { ApiError } from "../utils/apiError.js";

export const getDashboard = asyncHandler(async (_req, res) => {
  const [users, alerts, auditLogs, compliance] = await Promise.all([
    User.find({}).lean(),
    SecurityAlert.find({}).lean(),
    AuditLog.find({}).lean(),
    ComplianceStatus.findOne({ publicId: "nist-csf-status" }).lean()
  ]);

  res.json({
    summary: {
      activeUsers: users.length,
      securityAlerts: alerts.length,
      blockedRequests: auditLogs.filter((log) => log.result === "Denied").length,
      complianceScore: compliance?.overallScore || "92%"
    },
    securityAlerts: alerts.slice(0, 3).map((alert) => ({
      id: alert.publicId,
      severity: alert.severity,
      title: alert.title,
      source: alert.source
    })),
    auditLogs: auditLogs.slice(0, 3).map((log) => ({
      id: log.publicId,
      user: log.user,
      role: log.role,
      action: log.action,
      result: log.result,
      time: log.time
    })),
    allowedResources: ["User Access Management", "Security Alerts", "Audit Logs", "Compliance Status"]
  });
});

export const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users.map((user) => ({
    id: user.publicId,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role === "admin" ? "Administrator" : user.role[0].toUpperCase() + user.role.slice(1),
    status: user.status,
    mfaStatus: user.mfaStatus,
    lastLogin: user.lastLogin
  })));
});

export const getSecurityAlerts = asyncHandler(async (_req, res) => {
  res.json(stripMany(await SecurityAlert.find({}).lean()));
});

export const getSecurityAlertById = asyncHandler(async (req, res) => {
  const alert = await SecurityAlert.findOne({ publicId: req.params.alertId }).lean();
  if (!alert) throw new ApiError(404, "Security alert not found.");
  res.json(stripMongoFields(alert));
});

export const getAuditLogs = asyncHandler(async (_req, res) => {
  res.json(stripMany(await AuditLog.find({}).lean()));
});

export const getComplianceStatus = asyncHandler(async (_req, res) => {
  const compliance = await ComplianceStatus.findOne({ publicId: "nist-csf-status" }).lean();
  if (!compliance) throw new ApiError(404, "Compliance status not found.");
  res.json(stripMongoFields(compliance));
});
