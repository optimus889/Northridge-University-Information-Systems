import { Router } from "express";
import { authenticate, requireRole, auditAllowedAccess } from "../middleware/authMiddleware.js";
import * as facultyController from "../controllers/facultyController.js";
import { getProfile } from "../controllers/profileController.js";
import { getEmailsForRole, sendEmailForRole } from "../controllers/emailController.js";

const router = Router();

router.use(authenticate, requireRole("faculty"), auditAllowedAccess("faculty"));

router.get("/dashboard", facultyController.getDashboard);
router.get("/courses", facultyController.getCourses);
router.get("/student-summaries", facultyController.getStudentSummaries);
router.get("/files", facultyController.getFiles);
router.post("/files/access-url", facultyController.getFileAccessUrl);
router.get("/notices", facultyController.getNotices);
router.get("/notices/:noticeId", facultyController.getNoticeById);
router.get("/security", facultyController.getSecurityStatus);
router.get("/profile", getProfile);
router.get("/email", getEmailsForRole("faculty"));
router.post("/email/send", sendEmailForRole("faculty"));

export default router;
