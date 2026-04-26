import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, UserCog, Users, Building2 } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import RoleCard from "../components/RoleCard.jsx";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="landing">
        <section className="hero university-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <ShieldCheck size={18} />
              Zero Trust University Access
            </div>
            <h1>Northridge University Secure Portal</h1>
            <p>
              A role-based university access system for students, faculty, and administrators.
              The portal demonstrates identity verification, least-privilege access, and
              dashboard isolation under a Zero Trust security model.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="primary-button">
                Sign In to Portal
              </Link>
              <a href="#roles" className="secondary-button">
                View Access Roles
              </a>
            </div>
          </div>

          <div className="campus-card">
            <Building2 size={38} />
            <h2>Campus IT Security</h2>
            <p>Protected access for academic services, university records, and security operations.</p>
            <div className="campus-stats">
              <div>
                <strong>3</strong>
                <span>Isolated Roles</span>
              </div>
              <div>
                <strong>MFA</strong>
                <span>Verification</span>
              </div>
              <div>
                <strong>RBAC</strong>
                <span>Access Control</span>
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="role-grid">
          <RoleCard
            icon={<GraduationCap size={30} />}
            title="Student Portal"
            description="Students can access personal academic resources, schedules, documents, and security notices."
            features={["Course Records", "Class Schedule", "Student Documents"]}
            portalPath="/student"
            requestedRole="student"
          />

          <RoleCard
            icon={<Users size={30} />}
            title="Faculty Portal"
            description="Faculty members can access teaching schedules, course resources, and student performance summaries."
            features={["Course Management", "Student Summary", "Faculty Files"]}
            portalPath="/faculty"
            requestedRole="faculty"
          />

          <RoleCard
            icon={<UserCog size={30} />}
            title="Administrator Portal"
            description="Administrators can access security operations, user access management, audit logs, and compliance status."
            features={["Access Management", "Security Alerts", "Audit Logs"]}
            portalPath="/admin"
            requestedRole="admin"
          />
        </section>
      </main>
    </>
  );
}
