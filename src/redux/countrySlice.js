import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Mengimpor fungsi createSlice dan createAsyncThunk dari Redux Toolkit
import axios from "axios"; // Mengimpor axios untuk melakukan HTTP requests

// Menggunakan createAsyncThunk untuk membuat asynchronous action fetchCountries
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries", // Tipe action yang digunakan untuk pengidentifikasi
  async () => {
    // Melakukan request ke API untuk mendapatkan data semua negara
    const response = await axios.get("https://restcountries.com/v3.1/all");
    // Memetakan data yang diterima untuk hanya mengambil informasi yang diperlukan
    return response.data.map((country) => ({
      name: country.name.common, // Mengambil nama negara
      population: country.population, // Mengambil populasi negara
      flag: country.flags.png, // Mengambil URL gambar bendera negara
      code: country.cca3, // Mengambil kode negara (3 huruf)
    }));
  }
);

// Membuat slice untuk negara menggunakan createSlice
const countrySlice = createSlice({
  name: "countries", // Nama slice ini
  initialState: {
    countries: [], // State untuk menyimpan daftar negara
    loading: false, // State untuk menandakan status loading
    error: null, // State untuk menyimpan pesan error jika ada
  },
  reducers: {}, // Tidak ada reducers yang didefinisikan saat ini
  extraReducers: (builder) => {
    builder
      // Menangani action pending dari fetchCountries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true; // Mengubah status loading menjadi true
        state.error = null; // Mengatur error menjadi null saat loading dimulai
      })
      // Menangani action fulfilled dari fetchCountries
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false; // Mengubah status loading menjadi false
        state.countries = action.payload; // Mengatur daftar negara dengan data yang diterima
      })
      // Menangani action rejected dari fetchCountries
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false; // Mengubah status loading menjadi false
        state.error = action.error.message; // Menyimpan pesan error
      });
  },
});

// Mengekspor reducer dari countrySlice
export default countrySlice.reducer;
