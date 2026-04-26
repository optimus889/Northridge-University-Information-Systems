import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";
import { emailApi } from "../../api/emailApi.js";

export default function AdminEmailPage() {
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [message, setMessage] = useState("");

  const [compose, setCompose] = useState({
    to: "",
    subject: "",
    body: ""
  });

  useEffect(() => {
    emailApi.getAdminEmails().then((data) => {
      setEmails(data);
      setSelectedEmail(data[0]);
    });
  }, []);

  function updateCompose(event) {
    setCompose((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSend(event) {
    event.preventDefault();

    const result = await emailApi.sendAdminEmail({
      from: user?.email || "j.miller@northridge.edu",
      ...compose
    });

    setMessage(result.message || "Email prepared.");
    setCompose({ to: "", subject: "", body: "" });
  }

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Administrator Portal</span>
          <h1>Administrator Email</h1>
          <p>
            View security operations messages and prepare administrator email
            communications.
          </p>
        </div>

        <Link className="secondary-button" to="/admin">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      {message && <div className="success-box">{message}</div>}

      <section className="email-layout">
        <aside className="email-list-panel">
          <div className="email-panel-header">
            <Mail size={20} />
            <h2>Inbox</h2>
          </div>

          <div className="email-list">
            {emails.map((email) => (
              <button
                key={email.id}
                className={`email-list-item ${
                  selectedEmail?.id === email.id ? "active" : ""
                }`}
                onClick={() => setSelectedEmail(email)}
              >
                <strong>{email.subject}</strong>
                <span>{email.from}</span>
                <small>{email.time}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="email-reading-panel">
          {selectedEmail ? (
            <>
              <div className="email-reading-header">
                <span className="email-category">{selectedEmail.category}</span>
                <h2>{selectedEmail.subject}</h2>
                <p>
                  From: <strong>{selectedEmail.from}</strong>
                </p>
                <p>
                  To: <strong>{selectedEmail.to}</strong>
                </p>
                <small>{selectedEmail.time}</small>
              </div>

              <div className="email-body">
                <p>{selectedEmail.body}</p>
              </div>
            </>
          ) : (
            <p>No email selected.</p>
          )}
        </section>
      </section>

      <section className="panel email-compose-panel">
        <div className="email-panel-header">
          <Send size={20} />
          <h2>Compose Message</h2>
        </div>

        <form className="email-compose-form" onSubmit={handleSend}>
          <label>
            From
            <input value={user?.email || "j.miller@northridge.edu"} disabled />
          </label>

          <label>
            To
            <input
              name="to"
              value={compose.to}
              onChange={updateCompose}
              placeholder="recipient@northridge.edu"
              required
            />
          </label>

          <label>
            Subject
            <input
              name="subject"
              value={compose.subject}
              onChange={updateCompose}
              placeholder="Enter email subject"
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="body"
              value={compose.body}
              onChange={updateCompose}
              placeholder="Enter email message"
              required
            />
          </label>

          <button className="primary-button" type="submit">
            Prepare Secure Email
          </button>
        </form>
      </section>

    </PortalLayout>
  );
}