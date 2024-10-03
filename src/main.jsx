import React from "react"; // Mengimpor React untuk membangun komponen
import ReactDOM from "react-dom/client"; // Mengimpor ReactDOM untuk merender aplikasi di DOM
import { Provider } from "react-redux"; // Mengimpor Provider dari react-redux untuk menghubungkan Redux store ke aplikasi
import { RouterProvider } from "react-router-dom"; // Mengimpor RouterProvider untuk menyediakan rute menggunakan React Router
import store from "./redux/store"; // Mengimpor store Redux yang telah Anda siapkan sebelumnya
import AppRouter from "./router"; // Mengimpor AppRouter yang mengatur semua rute dalam aplikasi
import "bootstrap/dist/css/bootstrap.min.css"; // Mengimpor CSS Bootstrap untuk styling

// Membuat root aplikasi dan merender komponen di dalamnya
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Membungkus aplikasi dengan Provider untuk mengakses Redux store */}
      <RouterProvider router={AppRouter} />{" "}
      {/* Menyediakan router untuk mengatur navigasi */}
    </Provider>
  </React.StrictMode>
);
