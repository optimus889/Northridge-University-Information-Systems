import { CheckCircle2 } from "lucide-react";

export default function ResourceList({ title, items }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="resource-list">
        {items.map((item) => (
          <div className="resource-item" key={item}>
            <CheckCircle2 size={18} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
