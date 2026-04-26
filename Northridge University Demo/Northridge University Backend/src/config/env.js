import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/northridge_zero_trust",
  jwtSecret: process.env.JWT_SECRET || "dev-only-change-this-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  aws: {
    enabled: process.env.AWS_ENABLE_REAL_SERVICES === "true",
    region: process.env.AWS_REGION || "us-east-1",
    s3Bucket: process.env.AWS_S3_BUCKET || "northridge-secure-documents",
    sesFromEmail: process.env.AWS_SES_FROM_EMAIL || "no-reply@northridge.edu"
  }
};
