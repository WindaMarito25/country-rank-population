import React, { useState, useEffect } from "react"; // Mengimpor React dan hook useState dan useEffect
import axios from "axios"; // Mengimpor axios untuk melakukan permintaan HTTP
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap"; // Mengimpor komponen dari React Bootstrap
import "../styles/News.css"; // Mengimpor stylesheet khusus untuk komponen ini

// Membuat komponen fungsional News
const News = () => {
  const [articles, setArticles] = useState([]); // State untuk menyimpan daftar artikel
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menangani error
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // Mengambil API key dari environment variables

  useEffect(() => {
    // Menggunakan useEffect untuk melakukan fetch data saat komponen dimuat
    const fetchArticles = async () => {
      try {
        // Melakukan permintaan GET untuk mengambil artikel
        const response = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Peace&api-key=${API_KEY}`
        );
        const newsData = response.data.response.docs.slice(0, 12); // Mengambil 12 artikel pertama
        setArticles(newsData); // Menyimpan data artikel ke state
      } catch (error) {
        console.error("Error fetching news:", error); // Mencetak error ke konsol
        setError("Failed to fetch news. Please try again later."); // Menyimpan pesan error ke state
      } finally {
        setLoading(false); // Mengubah status loading menjadi false
      }
    };

    fetchArticles(); // Memanggil fungsi fetchArticles
  }, [API_KEY]); // Dependensi: efek ini akan dipanggil ulang jika API_KEY berubah

  return (
    <Container className="mt-5">
      <div className="text-center">
        <h1 className="text-black fw-bold">Latest News on "Peace"</h1>{" "}
        {/* Judul berita */}
        <p className="fs-5 fw-medium">Explore the Power of Knowledge</p>{" "}
        {/* Deskripsi */}
        <hr className="border-light-subtle border-2 m-4" />{" "}
        {/* Garis pemisah */}
        <blockquote className="blockquote my-4 fst-italic text-dark-emphasis border-start border-4 border-primary">
          <p className="mb-0">
            "Peace cannot be kept by force; it can only be achieved by
            understanding." {/* Kutipan dari Albert Einstein */}
          </p>
          <footer className="blockquote-footer pt-4">Albert Einstein</footer>{" "}
          {/* Sumber kutipan */}
        </blockquote>
      </div>

      {loading ? ( // Memeriksa status loading
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? ( // Memeriksa jika terjadi error
        <Alert variant="danger">{error}</Alert> //Menampilkan pesan error
      ) : (
        <Row>
          {articles.map(
            (
              article,
              index // Mengiterasi melalui daftar artikel
            ) => (
              <Col key={index} md={4} className="mb-4 pt-4">
                <Card className="h-100 shadow-sm news-card">
                  <Card.Img
                    variant="top"
                    src={
                      article.multimedia.length
                        ? `https://www.nytimes.com/${article.multimedia[0].url}` // Menggunakan gambar dari artikel
                        : "https://via.placeholder.com/300x200?text=No+Image" // Placeholder jika tidak ada gambar
                    }
                    alt={article.headline.main} // Alt text untuk gambar
                    className="news-card-img-top" // Kelas CSS untuk styling gambar
                  />
                  <Card.Body>
                    <Card.Title className="news-card-title">
                      {article.headline.main}
                    </Card.Title>
                    <Card.Text className="card-text news-card-text">
                      {article.abstract || "No description available"}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-light">
                    <a
                      href={article.web_url} // URL artikel lengkap
                      target="_blank" // Membuka di tab baru
                      rel="noopener noreferrer" // Mencegah akses ke jendela pembuka
                      className="btn btn-primary btn-sm" // Kelas CSS untuk tombol
                    >
                      Read More
                    </a>
                  </Card.Footer>
                </Card>
              </Col>
            )
          )}
        </Row>
      )}
    </Container>
  );
};

export default News; // Mengekspor komponen untuk digunakan di bagian lain aplikasi
