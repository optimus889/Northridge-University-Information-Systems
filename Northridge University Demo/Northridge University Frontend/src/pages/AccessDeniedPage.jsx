import { Link, useLocation } from "react-router-dom";
import { Ban, ShieldX } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

const roleHome = {
  student: "/student",
  faculty: "/faculty",
  admin: "/admin"
};

export default function AccessDeniedPage() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main className="screen-center">
        <section className="access-card">
          <div className="access-icon">
            <ShieldX size={44} />
          </div>
          <h1>Access Denied</h1>
          <p>
            Your current role is not authorized to access this dashboard. North Ridge University
            applies role isolation and least-privilege access, so students, faculty, and administrators
            cannot access one another's dashboard areas.
          </p>

          <div className="access-details">
            <div>
              <span>Current Role</span>
              <strong>{location.state?.currentRole || user?.role || "Unknown"}</strong>
            </div>
            <div>
              <span>Attempted Access</span>
              <strong>{location.state?.attemptedRole || "Restricted"}</strong>
            </div>
          </div>

          <div className="access-actions">
            {user?.role && <Link className="primary-button" to={roleHome[user.role]}>Return to My Portal</Link>}
            <Link className="secondary-button" to="/login">Switch Account</Link>
          </div>

          <div className="blocked-note">
            <Ban size={18} />
            <span>This access attempt should be recorded by the backend audit logging layer.</span>
          </div>
        </section>
      </main>
    </>
  );
}
