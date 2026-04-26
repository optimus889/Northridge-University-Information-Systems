import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/db.js";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { ScheduleItem } from "../models/ScheduleItem.js";
import { DocumentItem } from "../models/DocumentItem.js";
import { Notice } from "../models/Notice.js";
import { EmailMessage } from "../models/EmailMessage.js";
import { SecurityAlert } from "../models/SecurityAlert.js";
import { AuditLog } from "../models/AuditLog.js";
import { ComplianceStatus } from "../models/ComplianceStatus.js";
import {
  alerts,
  auditLogs,
  compliance,
  documents,
  emails,
  facultyCourses,
  notices,
  schedules,
  studentCourses,
  users
} from "../seed/seedData.js";

async function seed() {
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    ScheduleItem.deleteMany({}),
    DocumentItem.deleteMany({}),
    Notice.deleteMany({}),
    EmailMessage.deleteMany({}),
    SecurityAlert.deleteMany({}),
    AuditLog.deleteMany({}),
    ComplianceStatus.deleteMany({})
  ]);

  const userDocs = await Promise.all(
    users.map(async (user) => {
      const { password, ...rest } = user;
      return {
        ...rest,
        passwordHash: await bcrypt.hash(password, 10)
      };
    })
  );

  await User.insertMany(userDocs);
  await Course.insertMany([...studentCourses, ...facultyCourses]);
  await ScheduleItem.insertMany(schedules);
  await DocumentItem.insertMany(documents);
  await Notice.insertMany(notices);
  await EmailMessage.insertMany(emails);
  await SecurityAlert.insertMany(alerts);
  await AuditLog.insertMany(auditLogs);
  await ComplianceStatus.create(compliance);

  console.log("Database seeded successfully.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
