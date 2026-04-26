import { Router } from "express";
import { login, ssoLogin } from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/sso-login", ssoLogin);

export default router;
