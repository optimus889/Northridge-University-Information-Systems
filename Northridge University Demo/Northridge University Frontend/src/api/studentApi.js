import { httpClient } from "./httpClient.js";
import {
  studentCourses,
  studentDocuments,
  studentSchedule,
  studentSecurityStatus,
  studentSecurityNotices
} from "../data/studentPortalData.js";

const useMocks = import.meta.env.VITE_USE_MOCKS !== "false";

async function mockResponse(data) {
  await new Promise((resolve) => setTimeout(resolve, 180));
  return data;
}

export const studentApi = {
  getCourses: () =>
    useMocks
      ? mockResponse(studentCourses)
      : httpClient.get("/student/courses"),

  getSchedule: () =>
    useMocks
      ? mockResponse(studentSchedule)
      : httpClient.get("/student/schedule"),

  getDocuments: () =>
    useMocks
      ? mockResponse(studentDocuments)
      : httpClient.get("/student/documents"),

  getSecurityStatus: () =>
    useMocks
      ? mockResponse(studentSecurityStatus)
      : httpClient.get("/student/security"),
  
  getSecurityNotices: () =>
    useMocks
      ? mockResponse(studentSecurityNotices)
      : httpClient.get("/student/security-notices"),

  getSecurityNoticeById: (noticeId) =>
    useMocks
      ? mockResponse(
          studentSecurityNotices.find((notice) => notice.id === noticeId)
        )
      : httpClient.get(`/student/security-notices/${noticeId}`),

  getDocumentAccessUrl: (documentId) =>
    useMocks
      ? mockResponse({
          url: "#",
          message:
            "Mock mode: in AWS, this should return an S3 pre-signed URL."
        })
      : httpClient.post("/student/documents/access-url", {
          documentId
        })
};