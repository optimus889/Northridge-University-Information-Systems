import { verifyToken } from "../utils/token.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.js";
import { writeAuditLog } from "../services/auditService.js";

export async function authenticate(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      throw new ApiError(401, "Authentication token is required.");
    }

    const payload = verifyToken(token);
    const user = await User.findOne({ publicId: payload.sub }).lean();

    if (!user) {
      throw new ApiError(401, "Authenticated user no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, "Invalid or expired token."));
  }
}

export function requireRole(role) {
  return async (req, _res, next) => {
    if (!req.user) {
      next(new ApiError(401, "Authentication is required."));
      return;
    }

    if (req.user.role !== role) {
      await writeAuditLog({
        user: req.user.username,
        role: req.user.role,
        action: `Attempted ${req.originalUrl}`,
        result: "Denied",
        sourceIp: req.ip
      });

      next(new ApiError(403, `Access denied. Required role: ${role}.`));
      return;
    }

    next();
  };
}

export function auditAllowedAccess(scope) {
  return (req, res, next) => {
    res.on("finish", async () => {
      if (res.statusCode >= 200 && res.statusCode < 400 && req.user) {
        try {
          await writeAuditLog({
            user: req.user.username,
            role: req.user.role,
            action: `Accessed ${scope}: ${req.method} ${req.originalUrl}`,
            result: "Allowed",
            sourceIp: req.ip
          });
        } catch (error) {
          console.error("Failed to write audit log:", error.message);
        }
      }
    });

    next();
  };
}