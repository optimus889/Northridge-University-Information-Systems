import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, UsersRound } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { adminApi } from "../../api/adminApi.js";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminApi.getUsers().then(setUsers);
  }, []);

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Administrator Portal</span>
          <h1>User Access Management</h1>
          <p>
            Review user identities, assigned roles, account status, and MFA
            status across the university portal.
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
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>MFA</th>
                <th>Last Login</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className="allowed">{user.status}</span>
                  </td>
                  <td>{user.mfaStatus}</td>
                  <td>{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </PortalLayout>
  );
}