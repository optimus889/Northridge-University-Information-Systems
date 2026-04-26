import { mockUsers } from "../data/mockUsers.js";
import { httpClient } from "../api/httpClient.js";
import { cognitoSignIn } from "../aws/cognitoAuthAdapter.js";

const useMocks = import.meta.env.VITE_USE_MOCKS !== "false";

export async function loginUser({ username, password, mfaCode, selectedRole }) {
  if (useMocks) {
    return loginWithMockData({ username, password, mfaCode, selectedRole });
  }

  // Option A: connect to Express backend or API Gateway + Lambda.
  return httpClient.post("/auth/login", {
    username,
    password,
    mfaCode,
    selectedRole
  });

  // Option B: connect to Amazon Cognito directly.
  // return cognitoSignIn({ username, password, mfaCode, selectedRole });
}

async function loginWithMockData({ username, password, mfaCode, selectedRole }) {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const loginInput = username.trim().toLowerCase();

  const user = mockUsers.find((item) => {
    if (selectedRole === "student" || selectedRole === "faculty") {
      return item.role === selectedRole && item.email.toLowerCase() === loginInput;
    }

    if (selectedRole === "admin") {
      return item.role === "admin" && item.username.toLowerCase() === loginInput;
    }

    return false;
  });

  if (!user || user.password !== password) {
    throw new Error("Invalid login account or password.");
  }

  if (!mfaCode || !mfaCode.trim() ) {
    throw new Error("Invalid MFA code. ");
  }

  return {
    token: `mock-token-${user.role}-${Date.now()}`,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      department: user.department,
      email: user.email
    }
  };
}

export async function ssoLoginUser({ email, requestedRole }) {
  if (useMocks) {
    return ssoLoginWithMockData({ email, requestedRole });
  }

  return httpClient.post("/auth/sso-login", {
    email,
    requestedRole
  });

  // Future AWS Cognito SSO:
  // return cognitoFederatedSignIn({ email, requestedRole });
}

async function ssoLoginWithMockData({ email, requestedRole }) {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const emailInput = email.trim().toLowerCase();

  const user = mockUsers.find((item) => {
    return item.email.toLowerCase() === emailInput;
  });

  if (!user) {
    throw new Error("No university identity was found for this email.");
  }

  if (requestedRole && user.role !== requestedRole) {
    throw new Error("This SSO identity does not match the selected access role.");
  }

  return {
    token: `mock-sso-token-${user.role}-${Date.now()}`,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      department: user.department,
      email: user.email
    }
  };
}