import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function RoleCard({
  icon,
  title,
  description,
  features,
  portalPath,
  requestedRole
}) {
  return (
    <article className="role-card">
      <div className="role-icon">{icon}</div>

      <h3>{title}</h3>
      <p>{description}</p>

      <ul>
        {features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Link
        className="card-link"
        to="/login/method"
        state={{
          from: portalPath,
          requestedRole
        }}
      >
        Identity verification required <ArrowRight size={16} />
      </Link>
    </article>
  );
}