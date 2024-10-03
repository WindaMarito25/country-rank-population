import React from "react"; // Mengimpor library React untuk membuat komponen
import { Link } from "react-router-dom"; // Mengimpor komponen Link dari react-router-dom untuk navigasi antar halaman
import { Navbar, Nav, Container } from "react-bootstrap"; // Mengimpor komponen Navbar, Nav, dan Container dari react-bootstrap untuk membuat tampilan navigasi
import Logo from "../assets/logo.png"; // Mengimpor gambar logo untuk digunakan di Navbar

// Membuat komponen fungsional bernama NavigationBar
const NavigationBar = () => {
  // Mengembalikan elemen NavigatorBar yang akan dirender
  return (
    // Menggunakan komponen Navbar dari react-bootstrap dengan beberapa properti (props) seperti bg, expand, className, dan style
    <Navbar
      bg="light" // Warna latar belakang navbar
      expand="lg" // Navbar akan diperluas pada layar besar
      className="shadow-sm border-bottom border-light sticky-top" // Menambahkan beberapa kelas Bootstrap untuk memberi gaya pada navbar
      style={{ backgroundColor: "#f8f9fa" }} // Memberi gaya tambahan dengan properti inline CSS
    >
      <Container className="p-0 container-fluid">
        <Navbar.Brand
          as={Link} // Menggunakan Link dari react-router-dom untuk menghubungkan ke halaman home ('/')
          to="/" // Rute halaman home
          className="navbar-brand fw-bold d-flex align-items-center" // Kelas Bootstrap untuk menambahkan gaya pada brand
          style={{ color: "#343a40", fontSize: "1.5rem" }} // Gaya tambahan berupa warna teks dan ukuran font
        >
          <img
            src={Logo} // Menampilkan gambar logo
            alt="logo" // Alt text untuk aksesibilitas
            className="d-inline-block align-center me-2" // Kelas Bootstrap untuk menata logo di dalam navbar
            style={{ width: "40px", height: "40px" }} // Gaya tambahan untuk mengatur ukuran logo
          />
          <span>Population Rank</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav" // Memberikan kontrol ID untuk toggle
          className="border-0" // Menyembunyikan border dari tombol toggle
          style={{ outline: "none" }} // Menghilangkan outline pada tombol
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-semibold d-flex align-items-start">
            <Nav.Link
              as={Link} // Menggunakan Link untuk navigasi
              to="/" // Rute halaman home
              className="m-0" // Margin nol untuk styling
              style={{ color: "#343a40", fontSize: "1.1rem" }} // Gaya tambahan untuk warna teks dan ukuran font
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/compare" // Rute halaman Compare
              className="m-0"
              style={{ color: "#343a40", fontSize: "1.1rem" }}
            >
              Compare
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/news" // Rute halaman News
              className="m-0"
              style={{ color: "#343a40", fontSize: "1.1rem" }}
            >
              News
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Ekspor komponen NavigationBar agar dapat digunakan di file lain
export default NavigationBar;
