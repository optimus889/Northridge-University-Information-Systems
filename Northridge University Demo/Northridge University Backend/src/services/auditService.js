import { AuditLog } from "../models/AuditLog.js";

export async function writeAuditLog({ user, role, action, result, sourceIp }) {
  const count = await AuditLog.countDocuments();
  await AuditLog.create({
    publicId: `log-${String(count + 1).padStart(3, "0")}`,
    user,
    role,
    action,
    result,
    time: new Date().toISOString().slice(0, 16).replace("T", " "),
    sourceIp: sourceIp || "127.0.0.1"
  });
}
