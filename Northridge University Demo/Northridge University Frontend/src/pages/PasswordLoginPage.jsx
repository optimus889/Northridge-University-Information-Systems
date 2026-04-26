import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

const roleLabels = {
  student: "Student",
  faculty: "Faculty",
  admin: "Admin"
};

const roleRoute = {
  student: "/student",
  faculty: "/faculty",
  admin: "/admin"
};

function getRoleFromPath(path) {
  if (path === "/student") return "student";
  if (path === "/faculty") return "faculty";
  if (path === "/admin") return "admin";
  return "";
}

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCaptchaCode() {
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += CAPTCHA_CHARS.charAt(
      Math.floor(Math.random() * CAPTCHA_CHARS.length)
    );
  }

  return code;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const lockedRole =
    location.state?.requestedRole || getRoleFromPath(location.state?.from);

  const isRoleLocked = Boolean(lockedRole);

  const [selectedRole, setSelectedRole] = useState(lockedRole || "");

  const [captchaCode, setCaptchaCode] = useState(() => generateCaptchaCode());

  const [form, setForm] = useState({
    username: "",
    password: "",
    mfaCode: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loginFieldLabel =
    selectedRole === "admin"
      ? "Enter your Username"
      : selectedRole === "student" || selectedRole === "faculty"
        ? "Enter your Email"
        : "Select a role first";

  const loginFieldPlaceholder =
    selectedRole === "student" || selectedRole === "faculty"
        ? "Enter your email address"
        : selectedRole === "admin"
          ? "Enter your username"
          : "Select an access role first";

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  function refreshCaptchaCode() {
    setCaptchaCode(generateCaptchaCode());
    setForm((current) => ({
      ...current,
      mfaCode: ""
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role before signing in.");
      return;
    }

    if (form.mfaCode.trim().toUpperCase() !== captchaCode) {
      setError("Invalid verification code. Please try again.");
      refreshCaptchaCode();
      return;
    }

    setSubmitting(true);

    try {
      const user = await login({
        ...form,
        selectedRole
      });

      if (user.role !== selectedRole) {
        setError("The selected role does not match this account.");
        return;
      }

      const destination = location.state?.from || roleRoute[user.role] || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="login-page refined-login-page">
        <section className="login-card refined-login-card">
          <div className="login-header">
            <div className="login-icon">
              <LockKeyhole size={30} />
            </div>
            <h1>University Identity Verification</h1>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="role-selection">
              <span className="role-selection-title">
                {isRoleLocked ? "Selected Access Role" : "Select Access Role"}
              </span>

              <div className="role-selection-buttons">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <button
                    key={role}
                    type="button"
                    className={`role-option ${selectedRole === role ? "active" : ""}`}
                    onClick={() => {
                      if (!isRoleLocked) {
                        setSelectedRole(role);
                      }
                    }}
                    disabled={isRoleLocked && selectedRole !== role}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {isRoleLocked && (
                <p className="role-lock-note">
                  This role was selected from the main menu and cannot be changed here.
                </p>
              )}  
            </div>

            <label>
              {loginFieldLabel}
              <input
                name="username"
                value={form.username}
                onChange={updateField}
                placeholder={loginFieldPlaceholder}
                autoComplete="username"
                disabled={!selectedRole}
                required
              />
            </label>

            <label>
              Enter your Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={updateField}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            <label>
              Enter your verification code
              <div className="captcha-row">
                <input
                  name="mfaCode"
                  value={form.mfaCode}
                  onChange={updateField}
                  placeholder="Enter the code shown"
                  autoComplete="off"
                  required
                />

                <button
                  type="button"
                  className="captcha-image"
                  onClick={refreshCaptchaCode}
                  title="Click to generate a new code"
                  aria-label="Click to generate a new verification code"
                >
                  <span>{captchaCode}</span>
                </button>
              </div>
            </label>

            <p className="captcha-hint">
              Click the verification image to generate a new 6-character code.
            </p>

            {error && <div className="error-box">{error}</div>}

            <button className="primary-button full" disabled={submitting}>
              {submitting ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </section>

      </main>
    </>
  );
}
