import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../auth/ProtectedRoute.jsx";
import StudentEmailPage from "../pages/email/StudentEmailPage.jsx";
import FacultyEmailPage from "../pages/email/FacultyEmailPage.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import LoginMethodPage from "../pages/LoginMethodPage.jsx";
import SsoLoginPage from "../pages/SsoLoginPage.jsx";
import PasswordLoginPage from "../pages/PasswordLoginPage.jsx";
import StudentDashboard from "../pages/student/StudentDashboard.jsx";
import StudentCoursesPage from "../pages/student/StudentCoursesPage.jsx";
import StudentSchedulePage from "../pages/student/StudentSchedulePage.jsx";
import StudentDocumentsPage from "../pages/student/StudentDocumentsPage.jsx";
import StudentProfilePage from "../pages/student/StudentProfilePage.jsx";
import StudentSecurityNoticesPage from "../pages/student/StudentSecurityNoticesPage.jsx";
import FacultyDashboard from "../pages/faculty/FacultyDashboard.jsx";
import FacultyCoursesPage from "../pages/faculty/FacultyCoursesPage.jsx";
import FacultyStudentSummaryPage from "../pages/faculty/FacultyStudentSummaryPage.jsx";
import FacultyFilesPage from "../pages/faculty/FacultyFilesPage.jsx";
import FacultyNoticesPage from "../pages/faculty/FacultyNoticesPage.jsx";
import FacultyProfilePage from "../pages/faculty/FacultyProfilePage.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage.jsx";
import AdminSecurityAlertsPage from "../pages/admin/AdminSecurityAlertsPage.jsx";
import AdminAuditLogsPage from "../pages/admin/AdminAuditLogsPage.jsx";
import AdminCompliancePage from "../pages/admin/AdminCompliancePage.jsx";
import AdminProfilePage from "../pages/admin/AdminProfilePage.jsx";
import AdminEmailPage from "../pages/email/AdminEmailPage.jsx";
import AccessDeniedPage from "../pages/AccessDeniedPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Navigate to="/login/method" replace />} />
      <Route path="/login/method" element={<LoginMethodPage />} />
      <Route path="/login/sso" element={<SsoLoginPage />} />
      <Route path="/login/password" element={<PasswordLoginPage />} />

      <Route
        path="/student/email"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentEmailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/email"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyEmailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/courses"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentCoursesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/schedule"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentSchedulePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/documents"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDocumentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/security-notices"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentSecurityNoticesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/courses"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyCoursesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/student-summary"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyStudentSummaryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/files"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyFilesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/notices"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyNoticesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/profile"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/security-alerts"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminSecurityAlertsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/audit-logs"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminAuditLogsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/compliance"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminCompliancePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/email"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminEmailPage />
          </ProtectedRoute>
        }
      />

      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}