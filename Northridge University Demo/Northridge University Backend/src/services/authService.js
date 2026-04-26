import bcrypt from "bcryptjs";
import { ApiError } from "../utils/apiError.js";
import { signToken } from "../utils/token.js";
import { userToFrontend } from "../utils/responseMapper.js";
import { User } from "../models/User.js";

export async function loginWithPassword({ username, password, mfaCode, selectedRole }) {
  if (!selectedRole) throw new ApiError(400, "Selected role is required.");
  if (!username || !password) throw new ApiError(400, "Login account and password are required.");
  if (!mfaCode || !String(mfaCode).trim()) throw new ApiError(400, "Verification code is required.");

  const loginInput = username.trim().toLowerCase();
  const role = selectedRole.toLowerCase();

  const query = role === "admin"
    ? { role: "admin", username: loginInput }
    : { role, email: loginInput };

  const user = await User.findOne(query);
  if (!user) throw new ApiError(401, "Invalid login account or password.");

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) throw new ApiError(401, "Invalid login account or password.");

  return { token: signToken(user), user: userToFrontend(user) };
}

export async function loginWithSso({ email, requestedRole }) {
  if (!email) throw new ApiError(400, "University email is required.");

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) throw new ApiError(401, "No university identity was found for this email.");

  if (requestedRole && user.role !== requestedRole) {
    throw new ApiError(403, "This SSO identity does not match the selected access role.");
  }

  return { token: signToken(user), user: userToFrontend(user) };
}
