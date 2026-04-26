import { Link, useLocation } from "react-router-dom";
import { KeyRound, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar.jsx";

const roleLabels = {
  student: "Student",
  faculty: "Faculty",
  admin: "Administrator"
};

export default function LoginMethodPage() {
  const location = useLocation();
  const requestedRole = location.state?.requestedRole;
  const from = location.state?.from;

  const nextState = {
    from,
    requestedRole
  };

  return (
    <>
      <Navbar />
      <main className="login-method-page">
        <section className="login-method-card">
          <div className="login-icon">
            <ShieldCheck size={30} />
          </div>

          <h1>Northridge University Sign-in</h1>
          <p>
            Choose a sign-in method to continue to the secure university portal.
          </p>

          {requestedRole && (
            <div className="selected-role-banner">
              Selected Access Role: <strong>{roleLabels[requestedRole]}</strong>
            </div>
          )}

          <div className="login-method-actions">
            <Link
              to="/login/sso"
              state={nextState}
              className="method-card-button"
            >
              <ShieldCheck size={24} />
              <div>
                <strong>Continue with University SSO</strong>
                <span>Use your Northridge email identity</span>
              </div>
            </Link>

            <Link
              to="/login/password"
              state={nextState}
              className="method-card-button"
            >
              <KeyRound size={24} />
              <div>
                <strong>Use Password Login</strong>
                <span>Use demo role, password, and verification code</span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}