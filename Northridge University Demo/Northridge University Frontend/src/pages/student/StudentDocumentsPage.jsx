import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, LockKeyhole } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { studentApi } from "../../api/studentApi.js";

export default function StudentDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    studentApi.getDocuments().then(setDocuments);
  }, []);

  async function handleViewDocument(documentId) {
    const result = await studentApi.getDocumentAccessUrl(documentId);
    setMessage(result.message || "Secure document access URL generated.");
  }

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Student Portal</span>
          <h1>Student Documents</h1>
          <p>
            Access student documents through a secure, role-protected document
            workflow.
          </p>
        </div>

        <Link className="secondary-button" to="/student">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      {message && <div className="success-box">{message}</div>}

      <section className="documents-grid">
        {documents.map((document) => (
          <article className="document-card" key={document.id}>
            <div className="document-icon">
              <FileText size={24} />
            </div>

            <h3>{document.name}</h3>
            <p>{document.type}</p>

            <div className="document-security">
              <LockKeyhole size={16} />
              <span>{document.protectedBy}</span>
            </div>

            <button
              className="primary-button full"
              onClick={() => handleViewDocument(document.id)}
            >
              Request Secure Access
            </button>
          </article>
        ))}
      </section>

    </PortalLayout>
  );
}