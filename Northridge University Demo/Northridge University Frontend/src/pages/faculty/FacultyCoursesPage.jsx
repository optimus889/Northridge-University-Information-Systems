import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { facultyApi } from "../../api/facultyApi.js";

export default function FacultyCoursesPage() {
  const location = useLocation();
  const selectedCourseName = location.state?.selectedCourse || "";

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    facultyApi.getCourses().then(setCourses);
  }, []);

  const selectedCourse = courses.find(
    (course) => course.name === selectedCourseName
  );

  const visibleCourses = selectedCourse ? [selectedCourse] : courses;

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Faculty Portal</span>
          <h1>Teaching Courses</h1>
          <p>
            View courses assigned to the authenticated faculty identity.
          </p>
        </div>

        <Link className="secondary-button" to="/faculty">
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
            <span>{selectedCourse.schedule}</span>
            <span>{selectedCourse.deliveryMode}</span>
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
                <th>Schedule</th>
                <th>Mode</th>
                <th>Students</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {visibleCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.code}</td>
                  <td>
                    <strong>{course.name}</strong>
                  </td>
                  <td>{course.schedule}</td>
                  <td>{course.deliveryMode}</td>
                  <td>{course.enrolledStudents}</td>
                  <td>
                    <span className="allowed">{course.status}</span>
                  </td>
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