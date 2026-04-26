import { asyncHandler } from "../utils/asyncHandler.js";
import { loginWithPassword, loginWithSso } from "../services/authService.js";
import { writeAuditLog } from "../services/auditService.js";

export const login = asyncHandler(async (req, res) => {
  const result = await loginWithPassword(req.body);
  await writeAuditLog({
    user: result.user.username,
    role: result.user.role,
    action: "Password login",
    result: "Allowed",
    sourceIp: req.ip
  });
  res.json(result);
});

export const ssoLogin = asyncHandler(async (req, res) => {
  const result = await loginWithSso(req.body);
  await writeAuditLog({
    user: result.user.username,
    role: result.user.role,
    action: "SSO login",
    result: "Allowed",
    sourceIp: req.ip
  });
  res.json(result);
});
