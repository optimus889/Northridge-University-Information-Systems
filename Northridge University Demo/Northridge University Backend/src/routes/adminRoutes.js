import { Router } from "express";
import { authenticate, requireRole, auditAllowedAccess } from "../middleware/authMiddleware.js";
import * as adminController from "../controllers/adminController.js";
import { getProfile } from "../controllers/profileController.js";
import { getEmailsForRole, sendEmailForRole } from "../controllers/emailController.js";

const router = Router();

router.use(authenticate, requireRole("admin"), auditAllowedAccess("admin"));

router.get("/dashboard", adminController.getDashboard);
router.get("/users", adminController.getUsers);
router.get("/security-alerts", adminController.getSecurityAlerts);
router.get("/security-alerts/:alertId", adminController.getSecurityAlertById);
router.get("/audit-logs", adminController.getAuditLogs);
router.get("/compliance", adminController.getComplianceStatus);
router.get("/profile", getProfile);
router.get("/email", getEmailsForRole("admin"));
router.post("/email/send", sendEmailForRole("admin"));

export default router;
