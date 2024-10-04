import React, { useEffect } from "react"; // Mengimpor React dan hook useEffect dari library React
import { useDispatch, useSelector } from "react-redux"; // Mengimpor useDispatch dan useSelector dari library React Redux
import { fetchCountries } from "../redux/countrySlice"; // Mengimpor action untuk mengambil data negara dari slice Redux
import { Container, Table, Spinner, Alert } from "react-bootstrap"; // Mengimpor komponen dari React-Bootstrap untuk styling
import "../styles/Home.css"; // Mengimpor stylesheet untuk styling tambahan

// Mendefinisikan komponen fungsional HomePage
const HomePage = () => {
  // Mendapatkan dispatch function dari Redux
  const dispatch = useDispatch();

  // Mengambil state countries, loading, dan error dari Redux store
  const { countries, loading, error } = useSelector((state) => state.countries);

  // Menggunakan useEffect untuk memanggil fetchCountries saat komponen pertama kali dirender
  useEffect(() => {
    dispatch(fetchCountries()); // Memicu action untuk mengambil data negara
  }, [dispatch]); // Menggunakan dispatch sebagai dependency agar efek hanya dijalankan saat dispatch berubah

  // Fungsi pembantu untuk memformat populasi
  const formatPopulation = (population) => {
    if (population >= 1e9) return (population / 1e9).toFixed(1) + " B"; // Mengonversi populasi ke miliar
    if (population >= 1e6) return (population / 1e6).toFixed(1) + " M"; // Mengonversi populasi ke juta
    if (population >= 1e3) return (population / 1e3).toFixed(1) + " K"; // Mengonversi populasi ke ribuan
    return population; // Mengembalikan populasi jika kurang dari 1000
  };

  // Mengurutkan daftar negara berdasarkan populasi dalam urutan menurun
  const sortedCountries = [...countries].sort(
    (a, b) => b.population - a.population // Mengurutkan berdasarkan populasi
  );

  // Mengembalikan elemen HomePage yang akan dirender
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-center text-white py-5">
        <Container>
          <h1 className="display-3">Explore the World's Populations</h1>
          <p className="lead">
            Dive into the rankings and discover the most populous countries
            across the globe.
          </p>
        </Container>
      </div>

      {/* Main Content Section */}
      <Container className="mt-5">
        <div className="text-center">
          <h1 className="text-black fw-bold">Top Countries by Population</h1>
          <p className="fs-5 fw-medium">
            Explore the countries with the highest population.
          </p>
        </div>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className="country-table mt-4"
          >
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-center">Rank</th>
                <th className="text-center">Flag</th>
                <th>Country</th>
                <th className="text-center">Population</th>
                <th className="text-center">Code</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {sortedCountries.map((country, index) => (
                <tr key={country.code}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img
                      src={country.flag}
                      alt={`Flag of ${country.name}`}
                      className="flag-img"
                    />
                  </td>
                  <td>{country.name}</td>
                  <td className="text-center">
                    {formatPopulation(country.population)}
                  </td>
                  <td className="text-center">{country.code}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default HomePage;
