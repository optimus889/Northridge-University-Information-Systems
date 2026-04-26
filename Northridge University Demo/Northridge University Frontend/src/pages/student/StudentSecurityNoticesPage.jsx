import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { studentApi } from "../../api/studentApi.js";

export default function StudentSecurityNoticesPage() {
  const location = useLocation();
  const selectedNoticeId = location.state?.selectedNoticeId || "";

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    studentApi.getSecurityNotices().then(setNotices);
  }, []);

  const selectedNotice = notices.find(
    (notice) => notice.id === selectedNoticeId
  );

  const visibleNotices = selectedNotice ? [selectedNotice] : notices;

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Student Portal</span>
          <h1>Security Notices</h1>
          <p>
            Review security notices assigned to the authenticated student account.
          </p>
        </div>

        <Link className="secondary-button" to="/student">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      {selectedNotice && (
        <section className="panel selected-notice-panel">
          <div className="selected-course-header">
            <ShieldAlert size={22} />
            <div>
              <span className="eyebrow">Selected Notice</span>
              <h2>{selectedNotice.title}</h2>
            </div>
          </div>

          <p>{selectedNotice.description}</p>

          <div className="selected-course-meta">
            <span>{selectedNotice.category}</span>
            <span>{selectedNotice.severity}</span>
            <span>{selectedNotice.date}</span>
          </div>
        </section>
      )}

      <section className="panel">
        <div className="notice-list">
          {visibleNotices.map((notice) => (
            <article className="notice-detail-card" key={notice.id}>
              <div className="notice-detail-icon">
                <ShieldAlert size={22} />
              </div>

              <div>
                <h3>{notice.title}</h3>
                <p>{notice.summary}</p>

                <div className="notice-meta">
                  <span>{notice.category}</span>
                  <span className={`notice-severity ${notice.severity.toLowerCase()}`}>
                    {notice.severity}
                  </span>
                  <span>{notice.date}</span>
                </div>

                {!selectedNotice && (
                  <Link
                    className="card-link notice-read-more"
                    to="/student/security-notices"
                    state={{ selectedNoticeId: notice.id }}
                  >
                    View notice details
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

    </PortalLayout>
  );
}