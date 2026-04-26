import { Router } from "express";
import { authenticate, requireRole, auditAllowedAccess } from "../middleware/authMiddleware.js";
import * as studentController from "../controllers/studentController.js";
import { getProfile } from "../controllers/profileController.js";
import { getEmailsForRole, sendEmailForRole } from "../controllers/emailController.js";


const router = Router();

router.use(authenticate, requireRole("student"), auditAllowedAccess("student"));

router.get("/dashboard", studentController.getDashboard);
router.get("/courses", studentController.getCourses);
router.get("/schedule", studentController.getSchedule);
router.get("/documents", studentController.getDocuments);
router.post("/documents/access-url", studentController.getDocumentAccessUrl);
router.get("/security", studentController.getSecurityStatus);
router.get("/security-notices", studentController.getSecurityNotices);
router.get("/security-notices/:noticeId", studentController.getSecurityNoticeById);
router.get("/profile", getProfile);
router.get("/email", getEmailsForRole("student"));
router.post("/email/send", sendEmailForRole("student"));

export default router;
