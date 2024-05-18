<template>
  <div class="container-fluid p-0 text-center">
    <h1 class="h3 mb-3">Selamat Datang <strong>{{ userNama }}</strong></h1>
  </div>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Dashboard Admin</strong></h1>
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
      <div class=" col-6">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Jumlah Data Layanan</h5>
          </div>
          <div class="card-body py-3">
            <h2>{{ jumlahDataLayanan }}</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="card flex-fill w-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Jumlah Data User</h5>
            </div>
            <div class="card-body py-3">
              <h2>{{ jumlahDataUser }}</h2>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card flex-fill w-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Jumlah Data Riwayat Pelanggan</h5>
            </div>
            <div class="card-body py-3">
              <h2>{{ jumlahDataRiwayat }}</h2>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  name: "DashboardPemilik",
  data() {
    return {
      jumlahDataPesanan: 0,
      jumlahDataUser: 0,
      jumlahDataLayanan: 0,
      jumlahDataRiwayat: 0,
      userNama: '',
    };
  },
  mounted() {
    this.getData();
    this.getUser();
    this.getLayanan();
    this.getRiwayat();
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8000/api/get-pesanan-admin');
        this.jumlahDataPesanan = response.data.length;
        const userData = JSON.parse(localStorage.getItem('user'));
        this.userNama = userData.data.username;
      } catch (error) {
        console.error(error);
      }
    },
    async getUser() {
      try {
        const response = await axios.get('http://localhost:8000/api/get-user');
        this.jumlahDataUser = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },
    async getLayanan() {
      try {
        const response = await axios.get('http://localhost:8000/api/data-layanan');
        this.jumlahDataLayanan = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },
    async getRiwayat() {
      try {
        const response = await axios.get('http://localhost:8000/api/riwayat-pesanan-Admin');
        this.jumlahDataRiwayat = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },
  }

};
</script>

<style></style>
