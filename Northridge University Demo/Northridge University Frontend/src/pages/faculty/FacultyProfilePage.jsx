import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, IdCard, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { facultyApi } from "../../api/facultyApi.js";

export default function FacultyProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    facultyApi.getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return <PortalLayout>Loading faculty profile...</PortalLayout>;
  }

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Faculty Portal</span>
          <h1>Faculty Profile</h1>
          <p>
            View identity, department, contact, and security information for the authenticated faculty account.
          </p>
        </div>

        <Link className="secondary-button" to="/faculty">
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
          <span className="eyebrow">Faculty Identity</span>
          <h2>{profile.name}</h2>
          <p>{profile.title}</p>
        </div>
      </section>

      <section className="profile-grid">
        <article className="profile-info-card">
          <IdCard size={20} />
          <span>Department</span>
          <strong>{profile.department}</strong>
        </article>

        <article className="profile-info-card">
          <Mail size={20} />
          <span>Email</span>
          <strong>{profile.email}</strong>
        </article>

        <article className="profile-info-card">
          <MapPin size={20} />
          <span>Office</span>
          <strong>{profile.office}</strong>
        </article>

        <article className="profile-info-card">
          <Phone size={20} />
          <span>Phone</span>
          <strong>{profile.phone}</strong>
        </article>

        <article className="profile-info-card">
          <ShieldCheck size={20} />
          <span>Access Role</span>
          <strong>{profile.accessRole}</strong>
        </article>

        <article className="profile-info-card">
          <ShieldCheck size={20} />
          <span>Security Status</span>
          <strong>{profile.securityStatus}</strong>
        </article>
      </section>

      <section className="panel">
        <h2>Academic Assignment</h2>
        <div className="stack-list">
          <div className="stack-item">
            <strong>Assigned Course:</strong> {profile.assignedCourse}
          </div>
          <div className="stack-item">
            <strong>Specialization:</strong> {profile.specialization}
          </div>
        </div>
      </section>
      
    </PortalLayout>
  );
}