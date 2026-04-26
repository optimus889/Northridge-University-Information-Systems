export const adminUsers = [
  {
    id: "user-001",
    name: "Emily Carter",
    username: "student",
    email: "e.carter@northridge.edu",
    role: "Student",
    status: "Active",
    mfaStatus: "Enabled",
    lastLogin: "2026-04-24 09:15"
  },
  {
    id: "user-002",
    name: "Michael Chen",
    username: "faculty",
    email: "m.chen@northridge.edu",
    role: "Faculty",
    status: "Active",
    mfaStatus: "Enabled",
    lastLogin: "2026-04-24 09:22"
  },
  {
    id: "user-003",
    name: "Jordan Miller",
    username: "admin",
    email: "j.miller@northridge.edu",
    role: "Administrator",
    status: "Active",
    mfaStatus: "Enabled",
    lastLogin: "2026-04-24 09:30"
  }
];

export const adminSecurityAlerts = [
  {
    id: "alert-001",
    severity: "High",
    title: "Multiple failed login attempts",
    source: "Identity Layer",
    status: "Open",
    time: "2026-04-24 09:10",
    description:
      "Several failed login attempts were detected against the university access portal. The event should be reviewed by the security administrator."
  },
  {
    id: "alert-002",
    severity: "Medium",
    title: "Unusual S3 file access pattern",
    source: "Data Layer",
    status: "Investigating",
    time: "2026-04-24 09:18",
    description:
      "A user requested multiple protected document access URLs within a short time period. This may indicate suspicious document access behavior."
  },
  {
    id: "alert-003",
    severity: "Low",
    title: "Outdated browser detected",
    source: "Endpoint Layer",
    status: "Open",
    time: "2026-04-24 09:25",
    description:
      "A user accessed the portal from an outdated browser. The user should be reminded to update the browser for security compliance."
  },
  {
    id: "alert-004",
    severity: "Medium",
    title: "Role mismatch access attempt",
    source: "Authorization Layer",
    status: "Resolved",
    time: "2026-04-24 09:35",
    description:
      "A user attempted to access a dashboard outside the assigned role scope. The request was blocked by role-based access control."
  }
];

export const adminAuditLogs = [
  {
    id: "log-001",
    user: "student",
    role: "student",
    action: "Attempted /admin",
    result: "Denied",
    time: "2026-04-24 09:15",
    sourceIp: "192.168.1.25"
  },
  {
    id: "log-002",
    user: "faculty",
    role: "faculty",
    action: "Viewed course records",
    result: "Allowed",
    time: "2026-04-24 09:22",
    sourceIp: "192.168.1.31"
  },
  {
    id: "log-003",
    user: "admin",
    role: "admin",
    action: "Viewed security dashboard",
    result: "Allowed",
    time: "2026-04-24 09:30",
    sourceIp: "192.168.1.10"
  },
  {
    id: "log-004",
    user: "student",
    role: "student",
    action: "Requested secure document access",
    result: "Allowed",
    time: "2026-04-24 09:42",
    sourceIp: "192.168.1.25"
  },
  {
    id: "log-005",
    user: "faculty",
    role: "faculty",
    action: "Viewed student performance summary",
    result: "Allowed",
    time: "2026-04-24 09:50",
    sourceIp: "192.168.1.31"
  }
];

export const adminComplianceStatus = {
  overallScore: "92%",
  framework: "NIST Cybersecurity Framework",
  lastAssessment: "2026-04-24",
  controls: [
    {
      id: "control-001",
      name: "Identity Verification",
      category: "Protect",
      status: "Implemented",
      awsService: "Amazon Cognito"
    },
    {
      id: "control-002",
      name: "Role-Based Access Control",
      category: "Protect",
      status: "Implemented",
      awsService: "API Gateway Authorizer / Lambda"
    },
    {
      id: "control-003",
      name: "Audit Logging",
      category: "Detect",
      status: "Implemented",
      awsService: "CloudWatch / CloudTrail"
    },
    {
      id: "control-004",
      name: "Secure Document Storage",
      category: "Protect",
      status: "Planned",
      awsService: "Amazon S3 + KMS"
    },
    {
      id: "control-005",
      name: "Security Alerting",
      category: "Respond",
      status: "Planned",
      awsService: "GuardDuty / SNS"
    }
  ]
};

export const adminProfile = {
  id: "adm-3001",
  name: "Jordan Miller",
  title: "Security Administrator",
  department: "Information Security Office",
  email: "j.miller@northridge.edu",
  office: "Administration Building, Room 210",
  phone: "(617) 555-0199",
  specialization: "Identity Management, Audit Logging, Security Monitoring",
  accessRole: "Administrator",
  securityStatus: "MFA Enabled",
  responsibility:
    "Responsible for user access management, security alerts, audit logs, and compliance monitoring across the Northridge University secure portal."
};