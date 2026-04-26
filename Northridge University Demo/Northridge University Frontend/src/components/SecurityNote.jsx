import { ShieldAlert } from "lucide-react";

export default function SecurityNote({ children }) {
  return (
    <div className="security-note">
      <ShieldAlert size={20} />
      <p>{children}</p>
    </div>
  );
}
