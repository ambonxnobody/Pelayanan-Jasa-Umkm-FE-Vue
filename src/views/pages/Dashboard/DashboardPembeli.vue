<template>
  <div class="container-fluid p-0 text-center">
    <h1 class="h3 mb-3">Selamat Datang <strong>{{ userNama }}</strong></h1>
  </div>

  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Dashboard Pelanggan</strong></h1>
    <div class="row">
      <div class="col-6">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Daftar Layanan</h5>
          </div>
          <div class="card-body py-3">
            <h2>{{ jumlahDataListLayanan }}</h2>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Riwayat Pesanan</h5>
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
import feather from "feather-icons";
import axios from 'axios';

export default {
  name: "DashboardPembeli",
  data() {
    return {
      jumlahDataRiwayat: 0,
      jumlahDataListLayanan: 0,
      userNama: '',

    };
  },
  mounted() {
    feather.replace();
    this.getRiwayat();
    this.getLayanan();
  },

  methods: {
    async getRiwayat() {
      try {
        const response = await axios.get('http://localhost:8000/api/riwayat-pesanan');
        this.jumlahDataRiwayat = response.data.length;
        const userData = JSON.parse(localStorage.getItem('user'));
        this.userNama = userData.data.username;
      } catch (error) {
        console.error(error);
      }
    },
    async getLayanan() {
      try {
        const response = await axios.get('http://localhost:8000/api/nama-elektronik');
        this.jumlahDataListLayanan = response.data.length;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style></style>
