export const users = [
  {
    publicId: "stu-1001",
    username: "student",
    email: "e.carter@northridge.edu",
    password: "123456",
    role: "student",
    name: "Emily Carter",
    department: "School of Computer Science",
    program: "Information Technology",
    accessScope: "Student Portal Only",
    securityStatus: "MFA Enabled",
    title: "Graduate Student",
    lastLogin: "2026-04-24 09:15"
  },
  {
    publicId: "fac-2001",
    username: "faculty",
    email: "m.chen@northridge.edu",
    password: "123456",
    role: "faculty",
    name: "Dr. Michael Chen",
    department: "School of Information Technology",
    title: "Associate Professor",
    office: "Technology Building, Room 418",
    phone: "(617) 555-0188",
    specialization: "Cloud Security, Zero Trust Architecture, Network Security",
    assignedCourse: "ITC 6520 - Cloud Security",
    accessScope: "Faculty Portal Only",
    securityStatus: "MFA Enabled",
    lastLogin: "2026-04-24 09:22"
  },
  {
    publicId: "adm-3001",
    username: "admin",
    email: "j.miller@northridge.edu",
    password: "123456",
    role: "admin",
    name: "Jordan Miller",
    department: "Information Security Office",
    title: "Security Administrator",
    office: "Administration Building, Room 210",
    phone: "(617) 555-0199",
    specialization: "Identity Management, Audit Logging, Security Monitoring",
    accessScope: "Administrator Portal Only",
    securityStatus: "MFA Enabled",
    responsibility: "Responsible for user access management, security alerts, audit logs, and compliance monitoring across the Northridge University secure portal.",
    lastLogin: "2026-04-24 09:30"
  }
];

export const studentCourses = [
  { publicId: "course-001", ownerRole: "student", code: "ITC 6520", name: "Cloud Security", instructor: "Dr. Michael Chen", status: "Active", location: "Online / Hybrid", description: "This course introduces cloud computing concepts, cloud service models, virtualization, and secure cloud deployment practices." },
  { publicId: "course-002", ownerRole: "student", code: "ITC 6315", name: "Network Security", instructor: "Dr. Sarah Brown", status: "Active", location: "Room 204", description: "This course covers network security principles, secure communication, firewall design, intrusion detection, and access control." },
  { publicId: "course-003", ownerRole: "student", code: "CPT 304", name: "Software Engineering", instructor: "Prof. David Miller", status: "Active", location: "Room 118", description: "This course focuses on software development lifecycle, design patterns, testing, documentation, and project management practices." },
  { publicId: "course-004", ownerRole: "student", code: "ITC 6400", name: "Risk Management", instructor: "Dr. Laura Adams", status: "Active", location: "Online", description: "This course introduces risk identification, assessment, mitigation planning, and cybersecurity risk management frameworks." },
  { publicId: "course-005", ownerRole: "student", code: "ITC 6200", name: "Database Systems", instructor: "Dr. Robert Wilson", status: "Active", location: "Room 312", description: "This course covers relational database design, SQL, data modeling, access control, backup strategies, and secure data management." }
];

export const facultyCourses = [
  { publicId: "faculty-course-001", ownerRole: "faculty", code: "ITC 6520", name: "Cloud Security", instructor: "Michael Chen", schedule: "Tuesday, 2:00 PM - 3:30 PM", deliveryMode: "Online / Hybrid", enrolledStudents: 32, status: "Active", description: "This course covers cloud security principles, identity management, encryption, monitoring, and secure AWS architecture design." }
];

export const schedules = [
  { publicId: "schedule-001", ownerRole: "student", day: "Monday", time: "10:00 AM - 11:30 AM", course: "Network Architecture", location: "Room 204" },
  { publicId: "schedule-002", ownerRole: "student", day: "Tuesday", time: "2:00 PM - 3:30 PM", course: "Cloud Security", location: "Online" },
  { publicId: "schedule-003", ownerRole: "student", day: "Wednesday", time: "1:00 PM - 2:30 PM", course: "Software Design", location: "Room 118" },
  { publicId: "schedule-004", ownerRole: "student", day: "Friday", time: "11:00 AM - 12:30 PM", course: "Risk Management", location: "Online" }
];

export const documents = [
  { publicId: "doc-001", ownerRole: "student", name: "Transcript.pdf", type: "Academic Record", storageKey: "students/stu-1001/documents/transcript.pdf", protectedBy: "S3 Encryption" },
  { publicId: "doc-002", ownerRole: "student", name: "Enrollment_Verification.pdf", type: "Student Record", storageKey: "students/stu-1001/documents/enrollment-verification.pdf", protectedBy: "S3 Pre-Signed URL" },
  { publicId: "doc-003", ownerRole: "student", name: "Tuition_Statement.pdf", type: "Financial Record", storageKey: "students/stu-1001/documents/tuition-statement.pdf", protectedBy: "KMS Encryption" },
  { publicId: "doc-004", ownerRole: "student", name: "Student_Handbook.pdf", type: "Policy Document", storageKey: "students/shared/student-handbook.pdf", protectedBy: "Role-Based Access" },
  { publicId: "faculty-file-001", ownerRole: "faculty", name: "Cloud_Security_Syllabus.pdf", type: "Course Material", storageKey: "faculty/michael-chen/itc6520/syllabus.pdf", protectedBy: "S3 Encryption" },
  { publicId: "faculty-file-002", ownerRole: "faculty", name: "Lecture_Notes_Week_1.pdf", type: "Teaching Material", storageKey: "faculty/michael-chen/itc6520/week1-notes.pdf", protectedBy: "S3 Pre-Signed URL" },
  { publicId: "faculty-file-003", ownerRole: "faculty", name: "Grade_Template.xlsx", type: "Restricted Faculty File", storageKey: "faculty/michael-chen/itc6520/grade-template.xlsx", protectedBy: "Role-Based Access" }
];

export const notices = [
  { publicId: "notice-001", ownerRole: "student", title: "Account Security Review Required", summary: "Complete your account security review by Friday.", category: "Account Security", severity: "Medium", date: "2026-04-24", description: "Students are required to review their account security settings, confirm recovery email information, and verify that MFA is enabled before the end of the week." },
  { publicId: "notice-002", ownerRole: "student", title: "New Course Materials Available", summary: "New course materials are available in the student portal.", category: "Academic System", severity: "Low", date: "2026-04-24", description: "New course documents have been uploaded to the secure student portal. Access is limited to authenticated student accounts with valid course enrollment." },
  { publicId: "notice-003", ownerRole: "student", title: "VPN Access Requires MFA", summary: "University VPN access requires MFA verification.", category: "Network Access", severity: "High", date: "2026-04-24", description: "All university VPN sessions must use multi-factor authentication. This helps prevent unauthorized access to internal university systems and student resources." },
  { publicId: "faculty-notice-001", ownerRole: "faculty", title: "Student Grade Data Protection", summary: "Do not send student grade records through personal email.", category: "Data Protection", severity: "High", date: "2026-04-24", description: "Faculty members must use approved university systems to store and share grade-related data. Personal email accounts are not approved for transmitting student records." },
  { publicId: "faculty-notice-002", ownerRole: "faculty", title: "Encrypted Faculty File Storage", summary: "Faculty file access has been moved to encrypted storage.", category: "Secure Storage", severity: "Medium", date: "2026-04-24", description: "Faculty teaching materials and sensitive files should be accessed through secure storage protected by encryption and role-based access controls." },
  { publicId: "faculty-notice-003", ownerRole: "faculty", title: "Learning Management System Auditing", summary: "Access auditing is enabled for the learning management system.", category: "Audit Logging", severity: "Low", date: "2026-04-24", description: "Access to course resources and student performance records is logged for security monitoring and compliance review." }
];

export const emails = [
  { publicId: "student-email-001", ownerRole: "student", from: "security@northridge.edu", to: "e.carter@northridge.edu", subject: "MFA Verification Required", time: "Today, 9:15 AM", category: "Security", body: "Your student account requires MFA verification for university VPN and portal access. Please keep MFA enabled to protect your academic records.", direction: "inbox" },
  { publicId: "student-email-002", ownerRole: "student", from: "registrar@northridge.edu", to: "e.carter@northridge.edu", subject: "Course Enrollment Confirmation", time: "Yesterday, 3:40 PM", category: "Academic", body: "You are currently enrolled in ITC 6520 - Cloud Security. Course materials are available through the secure student portal.", direction: "inbox" },
  { publicId: "student-email-003", ownerRole: "student", from: "it-support@northridge.edu", to: "e.carter@northridge.edu", subject: "Secure Document Access Notice", time: "Apr 24, 2026", category: "IT Support", body: "Student documents should only be accessed through the protected portal. Download links are monitored and may expire for security reasons.", direction: "inbox" },
  { publicId: "faculty-email-001", ownerRole: "faculty", from: "security@northridge.edu", to: "m.chen@northridge.edu", subject: "Faculty Data Protection Reminder", time: "Today, 10:05 AM", category: "Security", body: "Faculty members must not share student grade records through personal email. Use approved university systems for all academic records.", direction: "inbox" },
  { publicId: "faculty-email-002", ownerRole: "faculty", from: "department@northridge.edu", to: "m.chen@northridge.edu", subject: "ITC 6520 Teaching Schedule Update", time: "Yesterday, 1:20 PM", category: "Department", body: "The ITC 6520 - Cloud Security course will continue in Online / Hybrid format. Please review the updated teaching schedule.", direction: "inbox" },
  { publicId: "faculty-email-003", ownerRole: "faculty", from: "it-support@northridge.edu", to: "m.chen@northridge.edu", subject: "Encrypted Faculty File Storage", time: "Apr 24, 2026", category: "IT Support", body: "Faculty teaching files are now stored in encrypted cloud storage. Secure access links are generated only after role verification.", direction: "inbox" },
  { publicId: "admin-email-001", ownerRole: "admin", from: "security@northridge.edu", to: "j.miller@northridge.edu", subject: "Security Alert Review Required", time: "Today, 9:45 AM", category: "Security Operations", body: "A high-severity alert was generated for multiple failed login attempts. Please review the alert details in the Security Administration Console.", direction: "inbox" },
  { publicId: "admin-email-002", ownerRole: "admin", from: "compliance@northridge.edu", to: "j.miller@northridge.edu", subject: "Compliance Status Updated", time: "Today, 10:15 AM", category: "Compliance", body: "The latest NIST-aligned compliance assessment has been updated. Current portal compliance score is 92%.", direction: "inbox" },
  { publicId: "admin-email-003", ownerRole: "admin", from: "it-support@northridge.edu", to: "j.miller@northridge.edu", subject: "Audit Log Export Available", time: "Apr 24, 2026", category: "Audit Logging", body: "The latest access audit log export is available for administrator review. Please verify denied access attempts and suspicious activity.", direction: "inbox" }
];

export const alerts = [
  { publicId: "alert-001", severity: "High", title: "Multiple failed login attempts", source: "Identity Layer", status: "Open", time: "2026-04-24 09:10", description: "Several failed login attempts were detected against the university access portal. The event should be reviewed by the security administrator." },
  { publicId: "alert-002", severity: "Medium", title: "Unusual S3 file access pattern", source: "Data Layer", status: "Investigating", time: "2026-04-24 09:18", description: "A user requested multiple protected document access URLs within a short time period. This may indicate suspicious document access behavior." },
  { publicId: "alert-003", severity: "Low", title: "Outdated browser detected", source: "Endpoint Layer", status: "Open", time: "2026-04-24 09:25", description: "A user accessed the portal from an outdated browser. The user should be reminded to update the browser for security compliance." },
  { publicId: "alert-004", severity: "Medium", title: "Role mismatch access attempt", source: "Authorization Layer", status: "Resolved", time: "2026-04-24 09:35", description: "A user attempted to access a dashboard outside the assigned role scope. The request was blocked by role-based access control." }
];

export const auditLogs = [
  { publicId: "log-001", user: "student", role: "student", action: "Attempted /admin", result: "Denied", time: "2026-04-24 09:15", sourceIp: "192.168.1.25" },
  { publicId: "log-002", user: "faculty", role: "faculty", action: "Viewed course records", result: "Allowed", time: "2026-04-24 09:22", sourceIp: "192.168.1.31" },
  { publicId: "log-003", user: "admin", role: "admin", action: "Viewed security dashboard", result: "Allowed", time: "2026-04-24 09:30", sourceIp: "192.168.1.10" },
  { publicId: "log-004", user: "student", role: "student", action: "Requested secure document access", result: "Allowed", time: "2026-04-24 09:42", sourceIp: "192.168.1.25" },
  { publicId: "log-005", user: "faculty", role: "faculty", action: "Viewed student performance summary", result: "Allowed", time: "2026-04-24 09:50", sourceIp: "192.168.1.31" }
];

export const compliance = {
  publicId: "nist-csf-status",
  overallScore: "92%",
  framework: "NIST Cybersecurity Framework",
  lastAssessment: "2026-04-24",
  controls: [
    { id: "control-001", name: "Identity Verification", category: "Protect", status: "Implemented", awsService: "Amazon Cognito" },
    { id: "control-002", name: "Role-Based Access Control", category: "Protect", status: "Implemented", awsService: "API Gateway Authorizer / Lambda" },
    { id: "control-003", name: "Audit Logging", category: "Detect", status: "Implemented", awsService: "CloudWatch / CloudTrail" },
    { id: "control-004", name: "Secure Document Storage", category: "Protect", status: "Planned", awsService: "Amazon S3 + KMS" },
    { id: "control-005", name: "Security Alerting", category: "Respond", status: "Planned", awsService: "GuardDuty / SNS" }
  ]
};
