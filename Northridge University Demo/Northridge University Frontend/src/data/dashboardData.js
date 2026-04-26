export const studentDashboardData = {
  summary: {
    activeCourses: 5,
    upcomingClasses: 4,
    documents: 4,
    securityStatus: "MFA Enabled"
  },
  courses: [
    "Cloud Security",
    "Network Security",
    "Database Systems",
    "Software Engineering",
    "Risk Management"
  ],
  notices: [
    "Complete your account security review by Friday.",
    "New course materials are available in the student portal.",
    "University VPN access requires MFA verification."
  ],
  allowedResources: ["My Courses", "Class Schedule", "Student Documents", "Security Notices"]
};

export const facultyDashboardData = {
  summary: {
    teachingCourses: 1,
    enrolledStudents: 32,
    securityStatus: "Role Verified"
  },
  classes: [
    "ITC 6520 - Cloud Security"
  ],
  announcements: [
    "Do not send student grade records through personal email.",
    "Faculty file access has been moved to encrypted storage.",
    "Access auditing is enabled for the learning management system."
  ],
  allowedResources: ["Teaching Courses", "Student Performance Summary", "Faculty Files", "Department Notices"]
};

export const adminDashboardData = {
  summary: {
    activeUsers: 3,
    securityAlerts: 4,
    blockedRequests: 17,
    complianceScore: "92%"
  },
  securityAlerts: [
    {
      id: "alert-001",
      severity: "High",
      title: "Multiple failed login attempts",
      source: "Identity Layer"
    },
    {
      id: "alert-002",
      severity: "Medium",
      title: "Unusual S3 file access pattern",
      source: "Data Layer"
    },
    {
      id: "alert-003",
      severity: "Low",
      title: "Outdated browser detected",
      source: "Endpoint Layer"
    }
  ],
  auditLogs: [
    {
      id: "log-001",
      user: "student",
      role: "student",
      action: "Attempted /admin",
      result: "Denied",
      time: "2026-04-24 09:15"
    },
    {
      id: "log-002",
      user: "faculty",
      role: "faculty",
      action: "Viewed course records",
      result: "Allowed",
      time: "2026-04-24 09:22"
    },
    {
      id: "log-003",
      user: "admin",
      role: "admin",
      action: "Viewed security dashboard",
      result: "Allowed",
      time: "2026-04-24 09:30"
    }
  ],
  allowedResources: ["User Access Management", "Security Alerts", "Audit Logs", "Compliance Status"]
};
