import { httpClient } from "./httpClient.js";
import { adminEmails, facultyEmails, studentEmails } from "../data/emailData.js";

const useMocks = import.meta.env.VITE_USE_MOCKS !== "false";

async function mockResponse(data) {
  await new Promise((resolve) => setTimeout(resolve, 180));
  return data;
}

export const emailApi = {
  getStudentEmails: () =>
    useMocks
      ? mockResponse(studentEmails)
      : httpClient.get("/student/email"),

  getFacultyEmails: () =>
    useMocks
      ? mockResponse(facultyEmails)
      : httpClient.get("/faculty/email"),

  getAdminEmails: () =>
    useMocks
      ? mockResponse(adminEmails)
      : httpClient.get("/admin/email"),

  sendStudentEmail: (payload) =>
    useMocks
      ? mockResponse({
          success: true,
          message:
            "Mock mode: student email message was prepared. In AWS, this can be sent through Amazon SES or WorkMail."
        })
      : httpClient.post("/student/email/send", payload),

  sendFacultyEmail: (payload) =>
    useMocks
      ? mockResponse({
          success: true,
          message:
            "Mock mode: faculty email message was prepared. In AWS, this can be sent through Amazon SES or WorkMail."
        })
      : httpClient.post("/faculty/email/send", payload),

  sendAdminEmail: (payload) =>
    useMocks
      ? mockResponse({
          success: true,
          message:
            "Mock mode: administrator email message was prepared. In AWS, this can be sent through Amazon SES or WorkMail."
        })
      : httpClient.post("/admin/email/send", payload)
};