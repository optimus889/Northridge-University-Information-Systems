import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, UsersRound } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { facultyApi } from "../../api/facultyApi.js";

export default function FacultyStudentSummaryPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    facultyApi.getStudentSummaries().then(setStudents);
  }, []);

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Faculty Portal</span>
          <h1>Student Performance Summary</h1>
          <p>
            Review student performance summaries for faculty-authorized courses.
          </p>
        </div>

        <Link className="secondary-button" to="/faculty">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      <section className="panel">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Attendance</th>
                <th>Grade Status</th>
                <th>Risk Level</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <strong>{student.studentName}</strong>
                  </td>
                  <td>{student.studentEmail}</td>
                  <td>{student.course}</td>
                  <td>{student.attendance}</td>
                  <td>{student.gradeStatus}</td>
                  <td>
                    <span
                      className={
                        student.riskLevel === "Low"
                          ? "allowed"
                          : "notice-severity medium"
                      }
                    >
                      {student.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </PortalLayout>
  );
}