import { httpClient } from "./httpClient.js";
import {
  adminDashboardData,
  facultyDashboardData,
  studentDashboardData
} from "../data/dashboardData.js";

const useMocks = import.meta.env.VITE_USE_MOCKS !== "false";

async function mockResponse(data) {
  await new Promise((resolve) => setTimeout(resolve, 180));
  return data;
}

export const portalApi = {
  getStudentDashboard: () =>
    useMocks ? mockResponse(studentDashboardData) : httpClient.get("/student/dashboard"),

  getFacultyDashboard: () =>
    useMocks ? mockResponse(facultyDashboardData) : httpClient.get("/faculty/dashboard"),

  getAdminDashboard: () =>
    useMocks ? mockResponse(adminDashboardData) : httpClient.get("/admin/dashboard"),

  getAuditLogs: () =>
    useMocks ? mockResponse(adminDashboardData.auditLogs) : httpClient.get("/admin/audit-logs"),

  getSecurityAlerts: () =>
    useMocks ? mockResponse(adminDashboardData.securityAlerts) : httpClient.get("/admin/security-alerts")
};
