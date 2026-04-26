import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowLeft } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { adminApi } from "../../api/adminApi.js";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    adminApi.getAuditLogs().then(setLogs);
  }, []);

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Administrator Portal</span>
          <h1>Access Audit Logs</h1>
          <p>
            Review user access actions, authorization results, timestamps, and
            source IP addresses.
          </p>
        </div>

        <Link className="secondary-button" to="/admin">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      <section className="panel">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Result</th>
                <th>Time</th>
                <th>Source IP</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.user}</td>
                  <td>{log.role}</td>
                  <td>{log.action}</td>
                  <td>
                    <span className={log.result === "Denied" ? "denied" : "allowed"}>
                      {log.result}
                    </span>
                  </td>
                  <td>{log.time}</td>
                  <td>{log.sourceIp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </PortalLayout>
  );
}