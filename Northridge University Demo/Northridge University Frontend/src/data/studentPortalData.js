export const studentCourses = [
  {
    id: "course-001",
    code: "ITC 6520",
    name: "Cloud Security",
    instructor: "Dr. Michael Chen",
    status: "Active",
    location: "Online / Hybrid",
    description:
      "This course introduces cloud computing concepts, cloud service models, virtualization, and secure cloud deployment practices."
  },
  {
    id: "course-002",
    code: "ITC 6315",
    name: "Network Security",
    instructor: "Dr. Sarah Brown",
    status: "Active",
    location: "Room 204",
    description:
      "This course covers network security principles, secure communication, firewall design, intrusion detection, and access control."
  },
  {
    id: "course-003",
    code: "CPT 304",
    name: "Software Engineering",
    instructor: "Prof. David Miller",
    status: "Active",
    location: "Room 118",
    description:
      "This course focuses on software development lifecycle, design patterns, testing, documentation, and project management practices."
  },
  {
    id: "course-004",
    code: "ITC 6400",
    name: "Risk Management",
    instructor: "Dr. Laura Adams",
    status: "Active",
    location: "Online",
    description:
      "This course introduces risk identification, assessment, mitigation planning, and cybersecurity risk management frameworks."
  },
  {
    id: "course-005",
    code: "ITC 6200",
    name: "Database Systems",
    instructor: "Dr. Robert Wilson",
    status: "Active",
    location: "Room 312",
    description:
      "This course covers relational database design, SQL, data modeling, access control, backup strategies, and secure data management."
  }
];
export const studentSchedule = [
  {
    id: "schedule-001",
    day: "Monday",
    time: "10:00 AM - 11:30 AM",
    course: "Network Architecture",
    location: "Room 204"
  },
  {
    id: "schedule-002",
    day: "Tuesday",
    time: "2:00 PM - 3:30 PM",
    course: "Cloud Security",
    location: "Online"
  },
  {
    id: "schedule-003",
    day: "Wednesday",
    time: "1:00 PM - 2:30 PM",
    course: "Software Design",
    location: "Room 118"
  },
  {
    id: "schedule-004",
    day: "Friday",
    time: "11:00 AM - 12:30 PM",
    course: "Risk Management",
    location: "Online"
  }
];

export const studentDocuments = [
  {
    id: "doc-001",
    name: "Transcript.pdf",
    type: "Academic Record",
    storageKey: "students/stu-1001/documents/transcript.pdf",
    protectedBy: "S3 Encryption"
  },
  {
    id: "doc-002",
    name: "Enrollment_Verification.pdf",
    type: "Student Record",
    storageKey: "students/stu-1001/documents/enrollment-verification.pdf",
    protectedBy: "S3 Pre-Signed URL"
  },
  {
    id: "doc-003",
    name: "Tuition_Statement.pdf",
    type: "Financial Record",
    storageKey: "students/stu-1001/documents/tuition-statement.pdf",
    protectedBy: "KMS Encryption"
  },
  {
    id: "doc-004",
    name: "Student_Handbook.pdf",
    type: "Policy Document",
    storageKey: "students/shared/student-handbook.pdf",
    protectedBy: "Role-Based Access"
  }
];

export const studentSecurityStatus = {
  identity: "Emily Carter",
  role: "Student",
  mfaStatus: "Enabled",
  lastLogin: "Today",
  deviceStatus: "Verified",
  accessScope: "Student Portal Only",
  accountRisk: "Low",
  zeroTrustPolicy: [
    "Identity must be verified before access.",
    "Student role can only access student-scoped resources.",
    "Document access should be logged and monitored.",
    "Sensitive files should be retrieved through secure S3 links."
  ]
};

export const studentSecurityNotices = [
  {
    id: "notice-001",
    title: "Account Security Review Required",
    summary: "Complete your account security review by Friday.",
    category: "Account Security",
    severity: "Medium",
    date: "2026-04-24",
    description:
      "Students are required to review their account security settings, confirm recovery email information, and verify that MFA is enabled before the end of the week."
  },
  {
    id: "notice-002",
    title: "New Course Materials Available",
    summary: "New course materials are available in the student portal.",
    category: "Academic System",
    severity: "Low",
    date: "2026-04-24",
    description:
      "New course documents have been uploaded to the secure student portal. Access is limited to authenticated student accounts with valid course enrollment."
  },
  {
    id: "notice-003",
    title: "VPN Access Requires MFA",
    summary: "University VPN access requires MFA verification.",
    category: "Network Access",
    severity: "High",
    date: "2026-04-24",
    description:
      "All university VPN sessions must use multi-factor authentication. This helps prevent unauthorized access to internal university systems and student resources."
  }
];