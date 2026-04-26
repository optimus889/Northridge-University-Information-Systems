import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowLeft } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { studentApi } from "../../api/studentApi.js";

export default function StudentSchedulePage() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    studentApi.getSchedule().then(setSchedule);
  }, []);

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Student Portal</span>
          <h1>Class Schedule</h1>
          <p>
            View the weekly schedule assigned to the current student account.
          </p>
        </div>

        <Link className="secondary-button" to="/student">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      <section className="panel">
        <div className="schedule-list">
          {schedule.map((item) => (
            <article className="schedule-item" key={item.id}>
              <div className="schedule-day">
                <CalendarDays size={20} />
                <strong>{item.day}</strong>
              </div>

              <div>
                <h3>{item.course}</h3>
                <p>{item.time}</p>
                <span>{item.location}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </PortalLayout>
  );
}