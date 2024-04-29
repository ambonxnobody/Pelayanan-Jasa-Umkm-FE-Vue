<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3 text-center"><strong>Riwayat Pembeli</strong></h1>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped table-bordered nowrap table-hover" id="example">
              <thead class="text-center">
                <tr>
                  <th>No</th>
                  <th>Nama Elektronik</th>
                  <th>Masalah</th>
                  <th>Tanggal</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pesanan, index) in riwayatPesanan" :key="pesanan.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ pesanan.layanan }}</td>
                  <td>{{ pesanan.masalah }}</td>
                  <td>{{ pesanan.tgl_pesan }}</td>
                  <td>RP. {{ pesanan.harga }}</td>
                </tr>
              </tbody>
            </table>
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
  name: "RiwayatPembeli",

  mounted() {
    this.getData();
    feather.replace();
  },

  data() {
    return {
      riwayatPesanan: []
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8000/api/riwayat-pesanan');
        this.riwayatPesanan = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};

</script>

<style></style>
