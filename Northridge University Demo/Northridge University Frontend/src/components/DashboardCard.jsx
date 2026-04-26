export default function DashboardCard({ title, value, description, icon }) {
  return (
    <article className="dashboard-card">
      <div className="card-top">
        <div>
          <p className="card-title">{title}</p>
          <h3>{value}</h3>
        </div>
        <div className="card-icon">{icon}</div>
      </div>
      {description && <p className="card-description">{description}</p>}
    </article>
  );
}
