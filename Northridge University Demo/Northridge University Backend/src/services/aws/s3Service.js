import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../../config/env.js";

const s3Client = new S3Client({ region: env.aws.region });

export async function getSecureObjectUrl(storageKey) {
  if (!env.aws.enabled) {
    return {
      url: "#",
      message: "Mock mode: AWS S3 is not enabled. This endpoint is ready to return an S3 pre-signed URL when AWS is configured."
    };
  }

  const command = new GetObjectCommand({
    Bucket: env.aws.s3Bucket,
    Key: storageKey
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return {
    url,
    message: "Secure S3 pre-signed URL generated. This link expires in 5 minutes."
  };
}
