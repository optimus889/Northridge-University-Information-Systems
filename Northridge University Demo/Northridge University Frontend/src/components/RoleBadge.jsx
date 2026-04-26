const roleText = {
  student: "Student",
  faculty: "Faculty",
  admin: "Administrator"
};

export default function RoleBadge({ role }) {
  return <span className={`role-badge ${role}`}>{roleText[role] || role}</span>;
}
