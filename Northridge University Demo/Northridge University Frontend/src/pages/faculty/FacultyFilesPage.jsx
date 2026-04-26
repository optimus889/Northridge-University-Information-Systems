import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, LockKeyhole } from "lucide-react";
import PortalLayout from "../../layouts/PortalLayout.jsx";
import { facultyApi } from "../../api/facultyApi.js";

export default function FacultyFilesPage() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    facultyApi.getFiles().then(setFiles);
  }, []);

  async function handleAccessFile(fileId) {
    const result = await facultyApi.getFileAccessUrl(fileId);
    setMessage(result.message || "Secure faculty file access URL generated.");
  }

  return (
    <PortalLayout>
      <section className="subpage-header">
        <div>
          <span className="eyebrow">Faculty Portal</span>
          <h1>Faculty Files</h1>
          <p>
            Request secure access to faculty-only course files and teaching
            documents.
          </p>
        </div>

        <Link className="secondary-button" to="/faculty">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </section>

      {message && <div className="success-box">{message}</div>}

      <section className="documents-grid">
        {files.map((file) => (
          <article className="document-card" key={file.id}>
            <div className="document-icon">
              <FileText size={24} />
            </div>

            <h3>{file.name}</h3>
            <p>{file.type}</p>

            <div className="document-security">
              <LockKeyhole size={16} />
              <span>{file.protectedBy}</span>
            </div>

            <button
              className="primary-button full"
              onClick={() => handleAccessFile(file.id)}
            >
              Request Secure Access
            </button>
          </article>
        ))}
      </section>
    </PortalLayout>
  );
}