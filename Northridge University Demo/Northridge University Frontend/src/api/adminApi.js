import { httpClient } from "./httpClient.js";
import {
  adminAuditLogs,
  adminComplianceStatus,
  adminSecurityAlerts,
  adminUsers,
  adminProfile
} from "../data/adminPortalData.js";

const useMocks = import.meta.env.VITE_USE_MOCKS !== "false";

async function mockResponse(data) {
  await new Promise((resolve) => setTimeout(resolve, 180));
  return data;
}

export const adminApi = {
  getUsers: () =>
    useMocks ? mockResponse(adminUsers) : httpClient.get("/admin/users"),

  getSecurityAlerts: () =>
    useMocks
      ? mockResponse(adminSecurityAlerts)
      : httpClient.get("/admin/security-alerts"),

  getSecurityAlertById: (alertId) =>
    useMocks
      ? mockResponse(adminSecurityAlerts.find((alert) => alert.id === alertId))
      : httpClient.get(`/admin/security-alerts/${alertId}`),

  getAuditLogs: () =>
    useMocks
      ? mockResponse(adminAuditLogs)
      : httpClient.get("/admin/audit-logs"),

  getComplianceStatus: () =>
    useMocks
      ? mockResponse(adminComplianceStatus)
      : httpClient.get("/admin/compliance"),
  
  getProfile: () =>
  useMocks
    ? mockResponse(adminProfile)
    : httpClient.get("/admin/profile")
};