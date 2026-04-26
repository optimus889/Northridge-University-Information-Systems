import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../auth/AuthContext.jsx";
import RoleBadge from "./RoleBadge.jsx";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.startsWith("/login");

  function handleLogout() {
    logout();
    navigate("/");
  }

  function getProfilePath(role) {
    if (role === "student") return "/student/profile";
    if (role === "faculty") return "/faculty/profile";
    if (role === "admin") return "/admin/profile";
    return "/";
  }

  const brandContent = (
    <>
      <div className="brand-mark">
        <ShieldCheck size={22} />
      </div>
      <div>
        <span className="brand-title">Northridge University</span>
        <span className="brand-subtitle">Secure Access Portal</span>
      </div>
    </>
  );

  return (
    <header className="navbar">
      {isLoginPage ? (
        <div className="brand brand-static" aria-label="Northridge University Secure Access Portal">
          {brandContent}
        </div>
      ) : (
        <Link to="/" className="brand" aria-label="Return to Northridge University main menu">
          {brandContent}
        </Link>
      )}

      <nav className="nav-actions">
        {isAuthenticated && user ? (
          <>
            <RoleBadge role={user.role} />
            <Link className="nav-user nav-user-link" to={getProfilePath(user.role)}>
              {user.name}
            </Link>
            <button className="ghost-button" onClick={handleLogout}>
              <LogOut size={16} />
              Sign Out
            </button>
          </>
        ) : isLoginPage ? (
          <Link to="/" className="primary-button small">
            Return to Main Menu
          </Link>
        ) : (
          <Link to="/login" className="primary-button small">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}
