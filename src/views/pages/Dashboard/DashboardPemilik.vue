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
      <hr>
      <table class="table table-striped table-bordered nowrap table-hover" id="example">
        <thead class="text-center">
          <tr>
            <th>No</th>
            <th>Nama Pelanggan</th>
            <th>Nama Elektronik</th>
            <th>Alamat</th>
            <th>No Telepon</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="DataPesananAdmin.length > 0">
            <tr v-for="(data, index) in DataPesananAdmin" :key="data.id">
              <td>{{ index + 1 }}</td>
              <td>{{ data.user_pelanggan.username }}</td>
              <td>{{ data.data_layanan.layanan }}</td>
              <td>{{ data.masalah }}</td>
              <td>{{ data.user_pelanggan.no_telp }}</td>
              <td>
                <span v-if="data.status === 0">Menunggu Konfirmasi</span>
                <span v-else>{{ data.status }}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="12" class="text-danger">Belum Ada Pesanan</td>
            </tr>
          </template>
        </tbody>
      </table>
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
      DataPesananAdmin: 0,
      userNama: '',
    };
  },
  mounted() {
    this.getData();
    this.getPesan();
    this.getUser();
    this.getLayanan();
    this.getRiwayat();
  },
  methods: {
    async getPesan() {
      try {
        const response = await axios.get(`https://umkmbackend.pjjaka.com/api/get-pesanan-admin`);
        this.jumlahDataPesanan = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },
    async getUser() {
      try {
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/get-user');
        this.jumlahDataUser = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },
    async getLayanan() {
      try {
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/data-layanan');
        this.jumlahDataLayanan = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },
    async getRiwayat() {
      try {
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/riwayat-pesanan-Admin');
        this.jumlahDataRiwayat = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },

    async getData() {
      try {
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/get-pesanan-admin');
        this.DataPesananAdmin = response.data;
        // console.log('data admin',this.DataPesananAdmin);
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>

<style></style>
