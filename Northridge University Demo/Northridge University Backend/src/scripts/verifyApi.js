const BASE_URL = process.env.TEST_API_BASE_URL || "http://localhost:3000/api";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  return {
    status: response.status,
    ok: response.ok,
    data
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }

  console.log(`PASS: ${message}`);
}

async function loginWithPassword({ username, password, selectedRole }) {
  const result = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      selectedRole,
      mfaCode: "ABC123"
    })
  });

  assert(result.ok, `${selectedRole} password login should succeed`);
  assert(result.data.token, `${selectedRole} login should return token`);
  assert(result.data.user.role === selectedRole, `${selectedRole} role should match`);

  return result.data.token;
}

async function loginWithSso({ email, expectedRole }) {
  const result = await request("/auth/sso-login", {
    method: "POST",
    body: JSON.stringify({
      email
    })
  });

  assert(result.ok, `${expectedRole} SSO login should succeed`);
  assert(result.data.token, `${expectedRole} SSO should return token`);
  assert(result.data.user.role === expectedRole, `${expectedRole} SSO role should match`);

  return result.data.token;
}

async function main() {
  console.log(`Testing API at ${BASE_URL}`);

  const health = await request("/health");
  assert(health.ok, "Health endpoint should work");

  const studentToken = await loginWithPassword({
    username: "e.carter@northridge.edu",
    password: "123456",
    selectedRole: "student"
  });

  const facultyToken = await loginWithPassword({
    username: "m.chen@northridge.edu",
    password: "123456",
    selectedRole: "faculty"
  });

  const adminToken = await loginWithPassword({
    username: "admin",
    password: "123456",
    selectedRole: "admin"
  });

  await loginWithSso({
    email: "j.miller@northridge.edu",
    expectedRole: "admin"
  });

  const studentDashboard = await request("/student/dashboard", {
    token: studentToken
  });
  assert(studentDashboard.ok, "Student dashboard should load");
  assert(studentDashboard.data.summary.documents === 4, "Student documents count should be 4");

  const studentCourses = await request("/student/courses", {
    token: studentToken
  });
  assert(studentCourses.ok, "Student courses should load");
  assert(Array.isArray(studentCourses.data), "Student courses should return an array");

  const studentDocs = await request("/student/documents", {
    token: studentToken
  });
  assert(studentDocs.ok, "Student documents should load");
  assert(studentDocs.data.length === 4, "Student documents endpoint should return 4 documents");

  const documentAccess = await request("/student/documents/access-url", {
    method: "POST",
    token: studentToken,
    body: JSON.stringify({
      documentId: "doc-001"
    })
  });
  assert(documentAccess.ok, "Student document secure access should work");

  const studentEmail = await request("/student/email", {
    token: studentToken
  });
  assert(studentEmail.ok, "Student email inbox should load");

  const facultyDashboard = await request("/faculty/dashboard", {
    token: facultyToken
  });
  assert(facultyDashboard.ok, "Faculty dashboard should load");
  assert(facultyDashboard.data.summary.enrolledStudents === 32, "Faculty enrolled students should be 32");

  const facultyStudents = await request("/faculty/student-summaries", {
    token: facultyToken
  });
  assert(facultyStudents.ok, "Faculty student summaries should load");
  assert(facultyStudents.data.length === 32, "Faculty student summaries should return 32 students");

  const facultyProfile = await request("/faculty/profile", {
    token: facultyToken
  });
  assert(facultyProfile.ok, "Faculty profile should load");

  const adminDashboard = await request("/admin/dashboard", {
    token: adminToken
  });
  assert(adminDashboard.ok, "Admin dashboard should load");
  assert(adminDashboard.data.summary.activeUsers === 3, "Admin active users should be 3");

  const adminUsers = await request("/admin/users", {
    token: adminToken
  });
  assert(adminUsers.ok, "Admin users should load");
  assert(adminUsers.data.length === 3, "Admin users endpoint should return 3 users");

  const adminAlerts = await request("/admin/security-alerts", {
    token: adminToken
  });
  assert(adminAlerts.ok, "Admin security alerts should load");
  assert(adminAlerts.data.length === 4, "Admin security alerts should return 4 alerts");

  const selectedAlert = await request("/admin/security-alerts/alert-001", {
    token: adminToken
  });
  assert(selectedAlert.ok, "Admin selected security alert should load");
  assert(selectedAlert.data.id === "alert-001", "Selected alert id should match");

  const adminEmail = await request("/admin/email", {
    token: adminToken
  });
  assert(adminEmail.ok, "Admin email inbox should load");

  const deniedAccess = await request("/admin/users", {
    token: studentToken
  });
  assert(deniedAccess.status === 403, "Student should be denied from admin users endpoint");

  const auditLogs = await request("/admin/audit-logs", {
    token: adminToken
  });
  assert(auditLogs.ok, "Admin audit logs should load");
  assert(Array.isArray(auditLogs.data), "Audit logs should return an array");

  console.log("All API verification checks passed.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});