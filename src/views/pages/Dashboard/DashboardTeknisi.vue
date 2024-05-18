<template>
  <div class="container-fluid p-0 text-center">
    <h1 class="h3 mb-3">Selamat Datang <strong>{{ userNama }}</strong></h1>
  </div>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Dashboard Teknisi</strong></h1>
    <div class="row">
      <div class="col-6">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Jumlah Data Pesanan</h5>
          </div>
          <div class="card-body py-3">
            <h2>{{ jumlahDataPesanan }}</h2>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Jumlah Data Riwayat</h5>
          </div>
          <div class="card-body py-3">
            <h2>{{ jumlahDataRiwayat }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import feather from "feather-icons";

export default {
  name: "DashboardTeknisi",
  data() {
    return {
      jumlahDataPesanan: 0,
      jumlahDataRiwayat: 0,
      userNama: '',
    };
  },
  mounted() {
    feather.replace();
    this.getData();
    this.getRiwayat();
  },
  methods: {
    async getData() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userID = userData.data.id;
        const response = await axios.get(`http://localhost:8000/api/data-layanan-teknisi/${userID}`);
        this.jumlahDataPesanan = response.data.length;
        console.log('cek', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getRiwayat() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userID = userData.data.id;
        const response = await axios.get(`http://localhost:8000/api/riwayat-pesanan-Teknisi/${userID}`);
        this.jumlahDataRiwayat = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>

<style></style>
