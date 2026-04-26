import Navbar from "../components/Navbar.jsx";

export default function PortalLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="page-shell">{children}</main>
    </>
  );
}
