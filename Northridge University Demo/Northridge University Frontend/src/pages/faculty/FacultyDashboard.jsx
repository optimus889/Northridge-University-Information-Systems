import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookMarked, FileLock2, Mail, UsersRound } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";
import ResourceList from "../../components/ResourceList.jsx";
import { portalApi } from "../../api/portalApi.js";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function FacultyDashboard() {
  const [data, setData] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    portalApi.getFacultyDashboard().then(setData);
  }, []);

  if (!data) return <PortalLayout>Loading faculty portal...</PortalLayout>;

  return (
    <PortalLayout>
      <section className="dashboard-header faculty-theme">
        <div>
          <span className="eyebrow">Faculty Portal</span>
          <h1>Faculty Dashboard</h1>
        </div>
      </section>

      <section className="dashboard-grid">
        <Link className="dashboard-link-card" to="/faculty/courses">
          <DashboardCard
            title="Teaching Courses"
            value={data.summary.teachingCourses}
            description="Assigned courses"
            icon={<BookMarked size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/faculty/student-summary">
          <DashboardCard
            title="Enrolled Students"
            value={data.summary.enrolledStudents}
            description="Students across courses"
            icon={<UsersRound size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/faculty/email">
          <DashboardCard
            title="Faculty Email"
            value="Email"
            description={user?.email || "m.chen@northridge.edu"}
            icon={<Mail size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/faculty/files">
          <DashboardCard
            title="Security"
            value={data.summary.securityStatus}
            description="Faculty role verified"
            icon={<FileLock2 size={24} />}
          />
        </Link>
      </section>

      <section className="two-column">
        <ResourceList
          title="Authorized Faculty Resources"
          items={data.allowedResources}
        />

        <section className="panel">
          <h2>Teaching Schedule</h2>
          <div className="stack-list">
            {data.classes.map((className) => (
              <Link
                key={className}
                className="stack-item course-link-item"
                to="/faculty/courses"
                state={{ selectedCourse: "Cloud Security" }}
              >
                {className}
              </Link>
            ))}
          </div>
        </section>
      </section>

      <section className="panel">
        <h2>Department Security Announcements</h2>
        <div className="stack-list">
          {data.announcements.map((item, index) => (
            <Link
              key={item}
              className="stack-item notice-link-item"
              to="/faculty/notices"
              state={{ selectedNoticeId: `faculty-notice-00${index + 1}` }}
            >
              {item}
            </Link>
          ))}
        </div>
      </section>


    </PortalLayout>
  );
}