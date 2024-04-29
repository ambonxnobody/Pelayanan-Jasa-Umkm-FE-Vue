<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Layanan Jasa</strong></h1>

    <div class="row mb-3" id="layanan">
      <!-- Card -->
      <div class="row mb-3" id="layanan">
        <div class="col-md-4" v-for="(layanan, index) in layananList" :key="index">
          <div class="card" style="width: 18rem">
            <!-- <img :src="layanan.gambar" class="card-img-top" alt="..."> -->
            <img src="https://via.placeholder.com/300" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Servis {{ layanan.deskripsi }}</h5>
              <!-- <p class="card-text">
                Servis {{ layanan.deskripsi }}
              </p> -->
              <p class="card-text">Harga: {{ layanan.harga }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4" v-if="layananList.length % 3 !== 0">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">Card Kosong</h5>
              <p class="card-text">Tidak ada data yang tersedia.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import axios from 'axios';

export default {
  name: "LayananPembeli",

  mounted() {
    feather.replace();
    this.getData();
  },

  data() {
    return {
      layananList: []
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8000/api/nama-elektronik');
        this.layananList = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};

</script>

<style></style>
