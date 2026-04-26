export const facultyCourses = [
  {
    id: "faculty-course-001",
    code: "ITC 6520",
    name: "Cloud Security",
    instructor: "Michael Chen",
    schedule: "Tuesday, 2:00 PM - 3:30 PM",
    deliveryMode: "Online / Hybrid",
    enrolledStudents: 32,
    status: "Active",
    description:
      "This course covers cloud security principles, identity management, encryption, monitoring, and secure AWS architecture design."
  }
];

export const facultyStudentSummaries = [
  {
    id: "student-summary-001",
    studentName: "Emily Carter",
    studentEmail: "e.carter@northridge.edu",
    course: "ITC 6520 - Cloud Security",
    attendance: "96%",
    gradeStatus: "In Good Standing",
    riskLevel: "Low"
  },
  ...Array.from({ length: 31 }, (_, index) => {
    const number = index + 2;

    return {
      id: `student-summary-${String(number).padStart(3, "0")}`,
      studentName: `Student ${number}`,
      studentEmail: `student${number}@northridge.edu`,
      course: "ITC 6520 - Cloud Security",
      attendance: `${88 + (index % 10)}%`,
      gradeStatus: index % 5 === 0 ? "Needs Review" : "In Good Standing",
      riskLevel: index % 5 === 0 ? "Medium" : "Low"
    };
  })
];

export const facultyFiles = [
  {
    id: "faculty-file-001",
    name: "Cloud_Security_Syllabus.pdf",
    type: "Course Material",
    storageKey: "faculty/michael-chen/itc6520/syllabus.pdf",
    protectedBy: "S3 Encryption"
  },
  {
    id: "faculty-file-002",
    name: "Lecture_Notes_Week_1.pdf",
    type: "Teaching Material",
    storageKey: "faculty/michael-chen/itc6520/week1-notes.pdf",
    protectedBy: "S3 Pre-Signed URL"
  },
  {
    id: "faculty-file-003",
    name: "Grade_Template.xlsx",
    type: "Restricted Faculty File",
    storageKey: "faculty/michael-chen/itc6520/grade-template.xlsx",
    protectedBy: "Role-Based Access"
  }
];

export const facultyNotices = [
  {
    id: "faculty-notice-001",
    title: "Student Grade Data Protection",
    summary: "Do not send student grade records through personal email.",
    category: "Data Protection",
    severity: "High",
    date: "2026-04-24",
    description:
      "Faculty members must use approved university systems to store and share grade-related data. Personal email accounts are not approved for transmitting student records."
  },
  {
    id: "faculty-notice-002",
    title: "Encrypted Faculty File Storage",
    summary: "Faculty file access has been moved to encrypted storage.",
    category: "Secure Storage",
    severity: "Medium",
    date: "2026-04-24",
    description:
      "Faculty teaching materials and sensitive files should be accessed through secure storage protected by encryption and role-based access controls."
  },
  {
    id: "faculty-notice-003",
    title: "Learning Management System Auditing",
    summary: "Access auditing is enabled for the learning management system.",
    category: "Audit Logging",
    severity: "Low",
    date: "2026-04-24",
    description:
      "Access to course resources and student performance records is logged for security monitoring and compliance review."
  }
];

export const facultySecurityStatus = {
  identity: "Michael Chen",
  role: "Faculty",
  mfaStatus: "Enabled",
  lastLogin: "Today",
  deviceStatus: "Verified",
  accessScope: "Faculty Portal Only",
  accountRisk: "Low"
};

export const facultyProfile = {
  id: "fac-2001",
  name: "Michael Chen",
  title: "Associate Professor",
  department: "School of Information Technology",
  email: "m.chen@northridge.edu",
  office: "Technology Building, Room 418",
  phone: "(617) 555-0188",
  specialization: "Cloud Security, Zero Trust Architecture, Network Security",
  assignedCourse: "ITC 6520 - Cloud Security",
  accessRole: "Faculty",
  securityStatus: "MFA Enabled"
};