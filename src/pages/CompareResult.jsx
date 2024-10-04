import React, { useEffect, useState } from "react"; // Mengimpor React dan hook yang diperlukan untuk state dan efek samping
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor hook untuk mengambil parameter dari URL dan navigasi antar halaman
import axios from "axios"; // Mengimpor axios untuk melakukan permintaan HTTP ke API
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap"; // Mengimpor komponen dari React Bootstrap untuk layout dan styling
import "../styles/CompareResult.css"; // Mengimpor stylesheet khusus untuk komponen ini

// Membuat komponen fungsional CompareResult
const CompareResult = () => {
  // Mengambil kode negara dari parameter URL
  const { code1, code2 } = useParams();

  // Mendefinisikan state untuk menyimpan data negara, error, dan loading
  const [countriesData, setCountriesData] = useState(null); // State untuk menyimpan data negara
  const [error, setError] = useState(null); // State untuk menyimpan pesan error jika terjadi kesalahan
  const [loading, setLoading] = useState(true); // State untuk menunjukkan status loading data
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain dalam aplikasi

  // Effect yang dijalankan saat komponen dimuat atau saat parameter URL berubah
  useEffect(() => {
    const fetchCountriesData = async () => {
      setLoading(true); // Mengatur status loading menjadi true sebelum memulai pengambilan data
      try {
        // Melakukan permintaan GET ke API untuk mengambil data negara berdasarkan kode
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha?codes=${code1},${code2}`
        );
        setCountriesData(response.data); // Menyimpan data negara ke state
        setError(null); // Mengatur error menjadi null jika pengambilan data berhasil
      } catch (error) {
        console.error("Error fetching countries data:", error); // Mencetak error ke konsol untuk debugging
        // Menyimpan pesan error ke state jika terjadi kesalahan saat pengambilan data
        setError("Failed to fetch country data. Please try again later.");
      } finally {
        setLoading(false); // Mengatur status loading menjadi false setelah pengambilan data selesai
      }
    };

    fetchCountriesData(); // Memanggil fungsi untuk mengambil data negara
  }, [code1, code2]); // Dependensi: fungsi ini akan dipanggil ulang jika code1 atau code2 berubah

  // Menampilkan pesan error jika ada
  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Menampilkan spinner saat data sedang dimuat
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Menampilkan data negara jika berhasil diambil
  if (countriesData) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h1 className="text-black fw-bold">Result of Country Comparison</h1>
          <p className="fs-5 fw-medium">
            Discover key insights between selected countries
          </p>
          <hr className="border-light-subtle border-2 m-4" />
        </div>
        <Row className="pt-4">
          {countriesData.map((country) => (
            <Col key={country.cca2} md={6} className="mb-4">
              <Card className="country-card">
                <Card.Img
                  variant="top"
                  src={country.flags.png} // Menggunakan URL bendera negara
                  alt={country.name.common} // Alt text untuk bendera
                  className="country-flag border-bottom border-2 border-dark-subtle" // Menambahkan kelas CSS untuk styling
                />
                <Card.Body className="h-auto">
                  <Card.Title className="text-center fw-semibold country-card-title">
                    {country.name.common} {country.cca2}
                  </Card.Title>
                  <Card.Text className="country-card-text">
                    <strong>Population:</strong>
                    {country.population.toLocaleString()}
                    <br />
                    <strong>Area:</strong>
                    {country.area
                      ? `${country.area.toLocaleString()} km²` // Menampilkan luas area jika tersedia
                      : "N/A"}
                    <br />
                    <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                    <br />
                    <strong>Languages:</strong>{" "}
                    {Object.values(country.languages || {}).join(", ")}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
};

export default CompareResult; // Mengekspor komponen untuk digunakan di bagian lain aplikasi
