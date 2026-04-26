export async function uploadSecureFile(file) {
  console.log("Reserved S3 upload:", file?.name);
  throw new Error("S3 upload is not connected yet.");
}

export async function getSecureFileUrl(fileKey) {
  console.log("Reserved S3 file URL:", fileKey);
  throw new Error("S3 file access is not connected yet.");
}
