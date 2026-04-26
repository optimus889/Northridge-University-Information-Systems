import { Link } from "react-router-dom";
import {
  ArrowLeft,
  IdCard,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound
} from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function StudentProfilePage() {
  const { user } = useAuth();

  const profile = {
    name: user?.name || "Emily Carter",
    email: user?.email || "e.carter@northridge.edu",
    role: "Student",
    department: user?.department || "School of Computer Science",
    studentId: "STU-1001",
    program: "Information Technology",
    accessScope: "Student Portal Only",
    securityStatus: "MFA Enabled"
  };

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Student Portal</span>
          <h1>Student Profile</h1>
          <p>
            View student identity, academic profile, and security access scope.
          </p>
        </div>

        <Link className="secondary-button" to="/student">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      <section className="profile-card">
        <div className="profile-avatar">
          {profile.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>

        <div className="profile-main">
          <span className="eyebrow">Student Identity</span>
          <h2>{profile.name}</h2>
          <p>{profile.program}</p>
        </div>
      </section>

      <section className="profile-grid">
        <article className="profile-info-card">
          <IdCard size={20} />
          <span>Student ID</span>
          <strong>{profile.studentId}</strong>
        </article>

        <article className="profile-info-card">
          <Mail size={20} />
          <span>Email</span>
          <strong>{profile.email}</strong>
        </article>

        <article className="profile-info-card">
          <UserRound size={20} />
          <span>Role</span>
          <strong>{profile.role}</strong>
        </article>

        <article className="profile-info-card">
          <MapPin size={20} />
          <span>Department</span>
          <strong>{profile.department}</strong>
        </article>

        <article className="profile-info-card">
          <ShieldCheck size={20} />
          <span>Access Scope</span>
          <strong>{profile.accessScope}</strong>
        </article>

        <article className="profile-info-card">
          <ShieldCheck size={20} />
          <span>Security Status</span>
          <strong>{profile.securityStatus}</strong>
        </article>
      </section>

      <section className="security-note">
        <ShieldCheck size={20} />
        <p>
          Future AWS integration: student profile data can be retrieved from a
          protected profile API using API Gateway and Lambda. Identity attributes
          can later be mapped to Amazon Cognito user attributes.
        </p>
      </section>
    </PortalLayout>
  );
}