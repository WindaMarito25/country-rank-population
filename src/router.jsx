import { createBrowserRouter } from "react-router-dom"; // Mengimpor fungsi untuk membuat router berbasis browser
import MainLayout from "./layouts/MainLayout"; // Mengimpor komponen layout utama untuk aplikasi
import HomePage from "./pages/HomePage"; // Mengimpor halaman utama
import CompareForm from "./pages/CompareForm"; // Mengimpor halaman untuk formulir perbandingan
import CompareResult from "./pages/CompareResult"; // Mengimpor halaman untuk menampilkan hasil perbandingan
import News from "./pages/News"; // Mengimpor halaman berita
import NotFound from "./pages/NotFound"; // Mengimpor halaman untuk menangani rute yang tidak ditemukan

// Membuat router menggunakan createBrowserRouter
const AppRouter = createBrowserRouter([
  {
    path: "/", // Path dasar untuk layout utama
    element: <MainLayout />, // Menetapkan komponen MainLayout sebagai elemen untuk path ini
    children: [
      // Mendefinisikan rute anak di bawah MainLayout
      {
        path: "/", // Rute untuk halaman utama (root)
        element: <HomePage />, // Menetapkan komponen HomePage sebagai elemen untuk rute ini
      },
      {
        path: "compare", // Rute untuk halaman perbandingan
        element: <CompareForm />, // Menetapkan komponen CompareForm sebagai elemen untuk rute ini
        children: [
          {
            path: ":code1/n/:code2", // Rute untuk hasil perbandingan dengan parameter dinamis
            element: <CompareResult />, // Menetapkan komponen CompareResult sebagai elemen untuk rute ini
          },
        ],
      },
      {
        path: "news", // Rute untuk halaman berita
        element: <News />, // Menetapkan komponen News sebagai elemen untuk rute ini
      },
      {
        path: "*", // Rute wildcard untuk menangani semua rute yang tidak ditemukan
        element: <NotFound />, // Menetapkan komponen NotFound sebagai elemen untuk rute ini
      },
    ],
  },
]);

export default AppRouter; // Mengekspor AppRouter untuk digunakan di tempat lain dalam aplikasi
