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
    <hr>  
  <table class="table table-striped table-bordered nowrap table-hover" id="example">
              <thead class="text-center">
                <tr>
                  <th>No</th>
                  <th>Nama Pelanggan</th>
                  <th>Nama Elektronik</th>
                  <th>Masalah</th>
                  <th>Alamat</th>
                  <th>No Telepon</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="DataPesananTeknisi.length > 0">
                  <tr v-for="(data, index) in DataPesananTeknisi" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td :class="{ 'text-danger': !data.user_pelanggan.username }">{{ data.user_pelanggan.username ||
        'Data kosong' }}</td>
                   
                    <td :class="{ 'text-danger': !data.data_layanan.layanan }">{{ data.data_layanan.layanan || 'Data kosong' }}</td>
                    <td :class="{ 'text-danger': !data.masalah }">{{ data.masalah || 'Data kosong' }}</td>
                    <td>{{ data.alamat }}</td>
                    <td :class="{ 'text-danger': !data.user_pelanggan.no_telp }">
                      {{ data.user_pelanggan.no_telp || 'Data kosong' }}
                    </td>
                    <td>
                      <span v-if="data.status === 1">Menunggu Konfirmasi</span>
                      <span v-else-if="data.status === 2" class="text-warning">Proses Pengerjaan</span>
                      <span v-else-if="data.status === 3" class="text-warning">Perbaikan Selesai</span>
                      <span v-else class="text-danger">Data kosong</span>
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
      DataPesananTeknisi: [],
      userNama: '',
    };
  },
  mounted() {
    feather.replace();
    this.getData();
    this.getPesanan();
    this.getRiwayat();
    this.getDatatek();
  },
  methods: {
    async getData() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userID = userData.data.id;
        const response = await axios.get(`https://umkmbackend.pjjaka.com/api/data-layanan-teknisi/${userID}`);
        this.jumlahDataPesanan = response.data.length;
        console.log('cek', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getPesanan() {
      try {
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/get-pesanan-admin');
        this.DataPesananAdmin = response.data;
        // console.log('data admin',this.DataPesananAdmin);
      } catch (error) {
        console.error(error);
      }
    },
    async getRiwayat() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userID = userData.data.id;
        const response = await axios.get(`https://umkmbackend.pjjaka.com/api/riwayat-pesanan-Teknisi/${userID}`);
        this.jumlahDataRiwayat = response.data.length;
      } catch (error) {
        console.error(error);
      }
    },
    async getDatatek() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userID = userData.data.id;
        const response = await axios.get(`https://umkmbackend.pjjaka.com/api/data-layanan-teknisi/${userID}`);
        this.DataPesananTeknisi = response.data;
        console.log('cek', response.data);
      } catch (error) {
        console.error(error);
      }
    },
  }
  
};
</script>

<style></style>
