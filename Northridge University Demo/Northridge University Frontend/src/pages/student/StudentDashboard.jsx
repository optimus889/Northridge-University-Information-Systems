import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, CalendarDays, FileText, Mail } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";
import ResourceList from "../../components/ResourceList.jsx";
import SecurityNote from "../../components/SecurityNote.jsx";
import { portalApi } from "../../api/portalApi.js";
import { useAuth } from "../../auth/AuthContext.jsx";


export default function StudentDashboard() {
  const [data, setData] = useState(null);
  
  const { user } = useAuth();

  useEffect(() => {
    portalApi.getStudentDashboard().then(setData);
  }, []);

  if (!data) return <PortalLayout>Loading student portal...</PortalLayout>;

  return (
    <PortalLayout>
      <section className="dashboard-header student-theme">
        <div>
          <span className="eyebrow">Student Portal</span>
          <h1>Student Dashboard</h1>
        </div>
      </section>

      <section className="dashboard-grid">
        <Link className="dashboard-link-card" to="/student/courses">
          <DashboardCard
            title="My Courses"
            value={data.summary.activeCourses}
            description="View enrolled courses"
            icon={<BookOpen size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/student/schedule">
          <DashboardCard
            title="Class Schedule"
            value={data.summary.upcomingClasses}
            description="View weekly schedule"
            icon={<CalendarDays size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/student/email">
          <DashboardCard
            title="Student Email"
            value="Email"
            description={user?.email || "e.carter@northridge.edu"}
            icon={<Mail size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/student/documents">
          <DashboardCard
            title="Student Documents"
            value={data.summary.documents}
            description="Access protected files"
            icon={<FileText size={24} />}
          />
        </Link>
      </section>

      <section className="two-column">
        <ResourceList
          title="Authorized Student Resources"
          items={data.allowedResources}
        />

        <section className="panel">
          <h2>My Courses</h2>
          <div className="stack-list">
            {data.courses.map((course) => (
              <Link
                key={course}
                className="stack-item course-link-item"
                to="/student/courses"
                state={{ selectedCourse: course }}
              >
                {course}
              </Link>
            ))}
          </div>
        </section>
        
      </section>

      <section className="panel">
        <h2>Security Notices</h2>
        <div className="stack-list">
          {data.notices.map((notice, index) => (
            <Link
              key={notice}
              className="stack-item notice-link-item"
              to="/student/security-notices"
              state={{ selectedNoticeId: `notice-00${index + 1}` }}
            >
              {notice}
            </Link>
          ))}
        </div>
      </section>

    </PortalLayout>
  );
}