import { configureStore } from "@reduxjs/toolkit"; // Mengimpor fungsi configureStore dari Redux Toolkit untuk membuat store Redux
import countryReducer from "./countrySlice"; // Mengimpor reducer negara yang telah didefinisikan dalam countrySlice

// Membuat store Redux dengan menggunakan configureStore
const store = configureStore({
  reducer: {
    // Menambahkan reducer 'countries' yang menangani state terkait negara
    countries: countryReducer,
  },
});

// Mengekspor store sehingga dapat digunakan di komponen lain
export default store;
