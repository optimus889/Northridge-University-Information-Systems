import { EmailMessage } from "../models/EmailMessage.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { stripMany } from "../utils/responseMapper.js";
import { sendEmailThroughAws } from "../services/aws/emailService.js";
import { writeAuditLog } from "../services/auditService.js";

export function getEmailsForRole(role) {
  return asyncHandler(async (_req, res) => {
    const emails = await EmailMessage.find({ ownerRole: role, direction: "inbox" }).lean();
    res.json(stripMany(emails));
  });
}

export function sendEmailForRole(role) {
  return asyncHandler(async (req, res) => {
    const { from, to, subject, body } = req.body;
    const result = await sendEmailThroughAws({ from, to, subject, body });

    const count = await EmailMessage.countDocuments({ ownerRole: role });
    await EmailMessage.create({
      publicId: `${role}-sent-email-${String(count + 1).padStart(3, "0")}`,
      ownerRole: role,
      from,
      to,
      subject,
      time: new Date().toLocaleString("en-US"),
      category: "Sent",
      body,
      direction: "sent"
    });

    await writeAuditLog({
      user: req.user.username,
      role: req.user.role,
      action: `Prepared ${role} email: ${subject}`,
      result: "Allowed",
      sourceIp: req.ip
    });

    res.json(result);
  });
}
