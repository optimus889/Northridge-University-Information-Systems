import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { studentApi } from "../../api/studentApi.js";

export default function StudentCoursesPage() {
  const location = useLocation();
  const selectedCourseName = location.state?.selectedCourse || "";

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    studentApi.getCourses().then(setCourses);
  }, []);

  const selectedCourse = courses.find(
    (course) => course.name === selectedCourseName
  );

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Student Portal</span>
          <h1>My Courses</h1>
          <p>
            View academic courses assigned to the authenticated student identity.
          </p>
        </div>

        <Link className="secondary-button" to="/student">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      {selectedCourse && (
        <section className="panel selected-course-panel">
          <div className="selected-course-header">
            <BookOpen size={22} />
            <div>
              <span className="eyebrow">Selected Course</span>
              <h2>{selectedCourse.name}</h2>
            </div>
          </div>

          <p>{selectedCourse.description}</p>

          <div className="selected-course-meta">
            <span>{selectedCourse.code}</span>
            <span>{selectedCourse.instructor}</span>
            <span>{selectedCourse.location}</span>
          </div>
        </section>
      )}

      <section className="panel">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Status</th>
                <th>Location</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {(selectedCourse ? [selectedCourse] : courses).map((course) => (
                <tr
                  key={course.id}
                  className={
                    course.name === selectedCourseName ? "highlight-row" : ""
                  }
                >
                  <td>{course.code}</td>
                  <td>
                    <strong>{course.name}</strong>
                  </td>
                  <td>{course.instructor}</td>
                  <td>
                    <span className="allowed">{course.status}</span>
                  </td>
                  <td>{course.location}</td>
                  <td>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </PortalLayout>
  );
}