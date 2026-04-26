import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="screen-center">
        <section className="access-card">
          <h1>404</h1>
          <p>Page not found.</p>
          <Link className="primary-button" to="/">
            Return Home
          </Link>
        </section>
      </main>
    </>
  );
}
