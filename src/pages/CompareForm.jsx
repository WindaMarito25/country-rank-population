import React, { useState, useEffect } from "react"; // Mengimpor React dan hooks useState, useEffect untuk mengelola state dan efek samping
import Select from "react-select"; // Mengimpor komponen Select dari react-select untuk dropdown negara
import { useNavigate, Outlet } from "react-router-dom"; // Mengimpor hook useNavigate untuk navigasi antar halaman
import axios from "axios"; // Mengimpor axios untuk melakukan permintaan HTTP
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"; // Mengimpor komponen UI dari react-bootstrap
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Mengimpor FontAwesomeIcon untuk ikon
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"; // Mengimpor ikon globe
import "../styles/CompareForm.css"; // Mengimpor stylesheet custom untuk komponen

// Membuat komponen fungsional CompareForm
const CompareForm = () => {
  // State untuk menyimpan daftar negara, negara yang dipilih di dropdown 1 dan dropdown 2
  const [countries, setCountries] = useState([]); // Menyimpan daftar negara
  const [selectedCountry1, setSelectedCountry1] = useState(null); // Menyimpan negara pertama yang dipilih
  const [selectedCountry2, setSelectedCountry2] = useState(null); // Menyimpan negara kedua yang dipilih
  const navigate = useNavigate(); // Hook untuk navigasi halaman

  // Menggunakan useEffect untuk mengambil data negara dari API saat komponen di-mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Melakukan permintaan ke API untuk mendapatkan daftar negara
        const response = await axios.get("https://restcountries.com/v3.1/all");
        // Mengubah data menjadi format yang sesuai untuk dropdown (label dan value)
        const countryOptions = response.data.map((country) => ({
          value: country.cca2, // Kode negara
          label: `${country.name.common} (${country.cca2})`, // Nama negara dan kode negara
        }));
        setCountries(countryOptions); // Menyimpan daftar negara di state
      } catch (error) {
        console.error("Error fetching countries:", error); // Menangani error jika gagal mengambil data
      }
    };

    fetchCountries(); // Memanggil fungsi fetchCountries
  }, []); // Efek ini hanya berjalan sekali saat komponen di-mount

  // Menggunakan metode filter untuk membuat daftar negara yang ditampilkan di dropdown Country 1
  const filteredCountriesForCountry1 = countries.filter(
    (country) =>
      // Memastikan bahwa jika tidak ada negara yang dipilih di dropdown Country 2,
      // maka semua negara dapat ditampilkan di dropdown Country 1
      !selectedCountry2 ||
      // Jika ada negara yang dipilih di dropdown Country 2,
      // maka filter negara yang sama dari dropdown Country 1
      country.value !== selectedCountry2.value
  );

  // Menggunakan metode filter untuk membuat daftar negara yang ditampilkan di dropdown Country 2
  const filteredCountriesForCountry2 = countries.filter(
    (country) =>
      // Memastikan bahwa jika tidak ada negara yang dipilih di dropdown Country 1,
      // maka semua negara dapat ditampilkan di dropdown Country 2
      !selectedCountry1 ||
      // Jika ada negara yang dipilih di dropdown Country 1,
      // maka filter negara yang sama dari dropdown Country 2
      country.value !== selectedCountry1.value
  );

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    if (selectedCountry1 && selectedCountry2) {
      // Jika kedua negara sudah dipilih
      navigate(
        `./${selectedCountry1.value}/n/${selectedCountry2.value}` // Navigasi ke halaman perbandingan dengan rute dinamis
      );
    }
  };

  // Mengembalikan elemen Compare Form yang akan dirender
  return (
    //Header Content
    <Container className="mt-5">
      <div className="text-center mb-4">
        <h1 className="text-black fw-bold">Compare Two Countries</h1>
        <p className="fs-5 fw-medium">
          Select two countries below to see a comparison.
        </p>
        <hr className="border-light-subtle border-2 m-4" />
        <blockquote className="blockquote my-4 fst-italic text-dark-emphasis border-start border-4 border-primary">
          <p className="mb-0">"In diversity, there is beauty and strength."</p>
          <footer className="blockquote-footer pt-4">Maya Angelou</footer>
        </blockquote>
      </div>

      {/* Form untuk memilih negara */}
      <Form onSubmit={handleSubmit}>
        <Col className=" text-center mt-5 mb-5">
          <FontAwesomeIcon
            icon={faGlobeAmericas}
            size="10x"
            className="text-primary mb-3"
          />
        </Col>
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="mb-3">
            <Card className="card-compare">
              <Card.Body>
                <Card.Title className="fw-semibold text-primary">
                  SELECT COUNTRY 1
                </Card.Title>
                <Select
                  options={filteredCountriesForCountry1} // Opsi untuk filter dropdown Country1
                  value={selectedCountry1} // Negara yang dipilih
                  onChange={setSelectedCountry1} // Fungsi untuk mengubah negara yang dipilih
                  placeholder="Select a country"
                  className="react-select"
                  classNamePrefix="select"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={2} className="text-center align-self-center my-3">
            <h1 className=" text-primary fw-bolder"> VS </h1>{" "}
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <Card className="card-compare">
              <Card.Body>
                <Card.Title className="fw-semibold text-primary">
                  SELECT COUNTRY 2
                </Card.Title>
                <Select
                  options={filteredCountriesForCountry2} // Opsi untuk filter dropdown Country1
                  value={selectedCountry2} // Negara yang dipilih
                  onChange={setSelectedCountry2} // Fungsi untuk mengubah negara yang dipilih
                  placeholder="Select a country"
                  className="react-select"
                  classNamePrefix="select"
                />
              </Card.Body>
            </Card>
          </Col>
          <Row className=" text-center mb-4">
            <Col className="mt-4">
              <Button
                type="submit"
                className="btn btn-primary w-50 w-sm-50 w-md-100"
              >
                COMPARE
              </Button>
            </Col>
          </Row>
        </Row>
      </Form>
      <Container className="border border-1 border-light-subtle rounded-4 mt-5">
        <div className="comparison-result m-2 ">
          <Outlet />
        </div>
      </Container>
    </Container>
  );
};

export default CompareForm; // Mengekspor komponen CompareForm agar bisa digunakan di bagian lain aplikasi
