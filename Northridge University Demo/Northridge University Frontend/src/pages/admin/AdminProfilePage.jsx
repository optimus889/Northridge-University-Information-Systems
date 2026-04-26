import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  IdCard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCog
} from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { adminApi } from "../../api/adminApi.js";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    adminApi.getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return <PortalLayout>Loading administrator profile...</PortalLayout>;
  }

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Administrator Portal</span>
          <h1>Administrator Profile</h1>
          <p>
            View administrator identity, security role, contact information, and
            access responsibility.
          </p>
        </div>

        <Link className="secondary-button" to="/admin">
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
          <span className="eyebrow">Administrator Identity</span>
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
          <UserCog size={20} />
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
        <h2>Administrator Responsibility</h2>
        <div className="stack-list">
          <div className="stack-item">
            <strong>Specialization:</strong> {profile.specialization}
          </div>
          <div className="stack-item">
            <strong>Responsibility:</strong> {profile.responsibility}
          </div>
        </div>
      </section>

    </PortalLayout>
  );
}