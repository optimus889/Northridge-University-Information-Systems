import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ClipboardCheck } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { adminApi } from "../../api/adminApi.js";

export default function AdminCompliancePage() {
  const [compliance, setCompliance] = useState(null);

  useEffect(() => {
    adminApi.getComplianceStatus().then(setCompliance);
  }, []);

  if (!compliance) {
    return <PortalLayout>Loading compliance status...</PortalLayout>;
  }

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Administrator Portal</span>
          <h1>Compliance Status</h1>
          <p>
            Review NIST-aligned cybersecurity controls and AWS service
            alignment.
          </p>
        </div>

        <Link className="secondary-button" to="/admin">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      <section className="security-status-grid">
        <article className="security-status-card">
          <span>Overall Score</span>
          <strong>{compliance.overallScore}</strong>
        </article>

        <article className="security-status-card">
          <span>Framework</span>
          <strong>{compliance.framework}</strong>
        </article>

        <article className="security-status-card">
          <span>Last Assessment</span>
          <strong>{compliance.lastAssessment}</strong>
        </article>
      </section>

      <section className="panel">
        <h2>Control Mapping</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Control</th>
                <th>NIST Category</th>
                <th>Status</th>
                <th>AWS Service Alignment</th>
              </tr>
            </thead>

            <tbody>
              {compliance.controls.map((control) => (
                <tr key={control.id}>
                  <td>
                    <strong>{control.name}</strong>
                  </td>
                  <td>{control.category}</td>
                  <td>
                    <span
                      className={
                        control.status === "Implemented" ? "allowed" : "notice-severity medium"
                      }
                    >
                      {control.status}
                    </span>
                  </td>
                  <td>{control.awsService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </PortalLayout>
  );
}