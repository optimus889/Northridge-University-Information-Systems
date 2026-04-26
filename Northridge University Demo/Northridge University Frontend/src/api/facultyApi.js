import { httpClient } from "./httpClient.js";
import {
  facultyCourses,
  facultyFiles,
  facultyNotices,
  facultySecurityStatus,
  facultyStudentSummaries,
  facultyProfile
} from "../data/facultyPortalData.js";

const useMocks = import.meta.env.VITE_USE_MOCKS !== "false";

async function mockResponse(data) {
  await new Promise((resolve) => setTimeout(resolve, 180));
  return data;
}

export const facultyApi = {
  getCourses: () =>
    useMocks
      ? mockResponse(facultyCourses)
      : httpClient.get("/faculty/courses"),

  getStudentSummaries: () =>
    useMocks
      ? mockResponse(facultyStudentSummaries)
      : httpClient.get("/faculty/student-summaries"),

  getFiles: () =>
    useMocks
      ? mockResponse(facultyFiles)
      : httpClient.get("/faculty/files"),

  getFileAccessUrl: (fileId) =>
    useMocks
      ? mockResponse({
          url: "#",
          message:
            "Mock mode: in AWS, this should return a secure S3 pre-signed URL for a faculty file."
        })
      : httpClient.post("/faculty/files/access-url", {
          fileId
        }),

  getNotices: () =>
    useMocks
      ? mockResponse(facultyNotices)
      : httpClient.get("/faculty/notices"),

  getNoticeById: (noticeId) =>
    useMocks
      ? mockResponse(facultyNotices.find((notice) => notice.id === noticeId))
      : httpClient.get(`/faculty/notices/${noticeId}`),

  getSecurityStatus: () =>
    useMocks
      ? mockResponse(facultySecurityStatus)
      : httpClient.get("/faculty/security"),

  getProfile: () =>
  useMocks
    ? mockResponse(facultyProfile)
    : httpClient.get("/faculty/profile"),
};