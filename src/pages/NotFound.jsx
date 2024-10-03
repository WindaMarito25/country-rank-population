import React from "react"; // Mengimpor React
import { Link } from "react-router-dom"; // Mengimpor komponen Link untuk navigasi
import { Container, Button } from "react-bootstrap"; // Mengimpor komponen dari React Bootstrap
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Mengimpor ikon Font Awesome
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"; // Mengimpor ikon segitiga peringatan

// Membuat komponen fungsional NotFound
const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <h1 className="display-1 text-danger">
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </h1>
      <h2>404 - Page Not Found</h2>
      <p className="lead">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Go to Home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound; // Mengekspor komponen untuk digunakan di bagian lain aplikasi
