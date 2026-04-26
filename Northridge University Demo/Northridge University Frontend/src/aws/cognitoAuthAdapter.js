export async function cognitoSignIn({ username, password, mfaCode }) {
  console.log("Reserved Cognito sign-in:", { username, password, mfaCode });
  throw new Error("Cognito is not connected yet. Implement Cognito here.");
}

export async function cognitoSignOut() {
  console.log("Reserved Cognito sign-out.");
}
