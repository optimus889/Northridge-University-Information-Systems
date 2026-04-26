import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

const roleRoute = {
  student: "/student",
  faculty: "/faculty",
  admin: "/admin"
};

const roleLabels = {
  student: "Student",
  faculty: "Faculty",
  admin: "Administrator"
};

export default function SsoLoginPage() {
  const { ssoLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const requestedRole = location.state?.requestedRole || "";
  const from = location.state?.from || "";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const user = await ssoLogin({
        email,
        requestedRole
      });

      if (requestedRole && user.role !== requestedRole) {
        navigate("/access-denied", {
          replace: true,
          state: {
            attemptedRole: requestedRole,
            currentRole: user.role
          }
        });
        return;
      }

      const destination = from || roleRoute[user.role] || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "SSO sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="login-page refined-login-page centered-login-page">
        <section className="login-card refined-login-card">
          <div className="login-header">
            <div className="login-icon">
              <ShieldCheck size={30} />
            </div>
            <h1>University SSO Sign-in</h1>
            <p>
              Enter your university email address to continue with SSO.
            </p>
          </div>

          {requestedRole && (
            <div className="selected-role-banner">
              Selected Access Role: <strong>{roleLabels[requestedRole]}</strong>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Enter your university email
              <input
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your Northridge email"
                autoComplete="email"
                required
              />
            </label>

            {error && <div className="error-box">{error}</div>}

            <button className="primary-button full" disabled={submitting}>
              {submitting ? "Verifying SSO..." : "Continue with SSO"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}