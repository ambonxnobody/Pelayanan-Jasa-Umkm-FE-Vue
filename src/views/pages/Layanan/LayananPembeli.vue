<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Layanan Jasa</strong></h1>

    <div class="row mb-3" id="layanan">
      <!-- Card -->
      <div class="row mb-3" id="layanan">
        <div class="col-md-4" v-for="(layanan, index) in layananList" :key="index">
          <div class="card" style="width: 18rem">
            <div class="img-container">
              <img :src="getImageUrl(layanan.gambar)" alt="Gambar" class="card-img-top fixed-size">
            </div>
            <div class="card-body">
              <h5 class="card-title">Servis {{ layanan.layanan }}</h5>
              <p class="card-text">
                {{ layanan.deskripsi }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4" v-if="layananList.length % 3 !== 0">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">Data Kosong</h5>
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
      layananList: [],
      gambar: '',
    };
  },

  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.gambar = file;
    },

    getImageUrl(filePath) {
      return `https://umkmbackend.pjjaka.com/${filePath}`;
    },
    async getData() {
      try {
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/nama-elektronik');
        this.layananList = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};

</script>

<style>
.img-container {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fixed-size {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>