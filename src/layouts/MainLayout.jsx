import { Outlet } from "react-router-dom"; // Mengimpor komponen Outlet dari react-router-dom untuk merender rute anak
import Navbar from "../components/Navbar"; // Mengimpor komponen Navbar dari file yang terletak di folder components
import Footer from "../components/Footer"; // Mengimpor komponen Footer dari file yang terletak di folder components

// Membuat komponen fungsional MainLayout
const MainLayout = () => {
  return (
    <>
      {/* Menampilkan komponen Navbar di bagian atas halaman */}
      <Navbar />
      {/* Bagian konten dinamis dari halaman yang akan diisi oleh rute anak */}
      <div className="content">
        <Outlet />{" "}
        {/* Outlet adalah placeholder untuk konten yang berubah tergantung rute */}
      </div>
      {/* Menampilkan komponen Footer di bagian bawah halaman */}
      <Footer />
    </>
  );
};

// Mengekspor komponen MainLayout agar bisa digunakan di bagian lain aplikasi
export default MainLayout;
