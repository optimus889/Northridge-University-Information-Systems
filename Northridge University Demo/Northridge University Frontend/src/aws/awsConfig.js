export const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  cognito: {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || "",
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID || ""
  },
  apiGateway: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || ""
  }
};
