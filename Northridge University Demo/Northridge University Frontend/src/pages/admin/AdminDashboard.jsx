import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity, BellRing, ClipboardCheck, Mail, UsersRound } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import DashboardCard from "../../components/DashboardCard.jsx";
import ResourceList from "../../components/ResourceList.jsx";
import SecurityNote from "../../components/SecurityNote.jsx";
import { portalApi } from "../../api/portalApi.js";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    portalApi.getAdminDashboard().then(setData);
  }, []);

  if (!data) return <PortalLayout>Loading administrator portal...</PortalLayout>;

  return (
    <PortalLayout>
      <section className="dashboard-header admin-theme">
        <div>
          <span className="eyebrow">Administrator Portal</span>
          <h1>Security Administration Console</h1>
        </div>
      </section>

      <section className="dashboard-grid">
        <Link className="dashboard-link-card" to="/admin/users">
          <DashboardCard
            title="Active Users"
            value={data.summary.activeUsers}
            description="Currently active identities"
            icon={<UsersRound size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/admin/security-alerts">
          <DashboardCard
            title="Security Alerts"
            value={data.summary.securityAlerts}
            description="Open security alerts"
            icon={<BellRing size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/admin/email">
          <DashboardCard
            title="Admin Email"
            value="Email"
            description="Security operations inbox"
            icon={<Mail size={24} />}
          />
        </Link>

        <Link className="dashboard-link-card" to="/admin/compliance">
          <DashboardCard
            title="Compliance"
            value={data.summary.complianceScore}
            description="Security compliance score"
            icon={<ClipboardCheck size={24} />}
          />
        </Link>
      </section>

      <section className="two-column">
        <ResourceList title="Authorized Administrator Resources" items={data.allowedResources} />
        <section className="panel">
          <h2>Security Alerts</h2>
          <div className="stack-list">
            {data.securityAlerts.map((alert) => (
              <Link
                key={alert.id}
                className="alert-item admin-alert-link"
                to="/admin/security-alerts"
                state={{ selectedAlertId: alert.id }}
              >
                <span className={`severity ${alert.severity.toLowerCase()}`}>
                  {alert.severity}
                </span>

                <div>
                  <strong>{alert.title}</strong>
                  <p>{alert.source}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>

      <section className="panel">
        <div className="panel-title-row">
          <h2>Access Audit Logs</h2>
          <Link className="card-link" to="/admin/audit-logs">
            View all logs
          </Link>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Result</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {data.auditLogs.map((log) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </PortalLayout>
  );
}
