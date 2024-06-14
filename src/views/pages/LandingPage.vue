<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand text-white" href="#">Faiz Teknik Blitar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon text-white"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="#layanan">Layanan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#lokasi">Lokasi</a>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link text-white">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <div class="row mb-3">
        <div class="col-md-6">
          <h1 class="display-4">FAIZ TEKNIK</h1>
          <p class="lead">
            "Di Faiz Teknik, kami tidak hanya memperbaiki perangkat elektronik rumah tangga Anda, kami merawatnya dengan
            penuh perhatian agar kembali berfungsi seperti baru. Layanan servis kami menghadirkan kehandalan dan
            kepercayaan untuk memastikan kelancaran aktivitas rumah tangga Anda."
          </p>
          <hr class="my-4" />
          <p>

          </p>

          >
        </div>
        <div class="col-md-6">
          <img :src="require('@/assets/LogoProfile.png')" class="img-fluid" alt="Responsive image" />
        </div>
      </div>

      <div class="row mb-3" id="layanan">
        <div class="col-md-12 mb-3">
          <center>
            <h1 class="display-4">Layanan Jasa</h1>
          </center>
        </div>
        <!-- Card -->
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
            <!-- <div class="col-md-4" v-if="layananList.length % 3 !== 0">
              <div class="card" style="width: 18rem">
                <div class="card-body">
                  <h5 class="card-title">Data Kosong</h5>
                  <p class="card-text">Tidak ada data yang tersedia.</p>
                </div>
              </div>
            </div> -->
          </div>
          <!-- End Card -->
        </div>
        <!-- End Card -->
      </div>

      <div class="row mb-3">
        <div class="col-md-12 mb-3">
          <center>
            <h1 class="display-4">
              Silahkan Hubungi Kami dengan Klik Dibawah Ini
            </h1>
            <br />
            <a class="btn btn-primary btn-lg" href="#" role="button">Hubungi Kami</a>
          </center>
        </div>
        <!-- Card -->
        <div class="col-md-12" id="lokasi">
          <!--  Google Maps -->
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.013292073073!2d112.1683663147759!3d-8.098013494153073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9b1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b1!2sFaiz%20Teknik%20Blitar!5e0!3m2!1sid!2sid!4v1629783660734!5m2!1sid!2sid"
            width="100%" height="450" style="border: 0" allowfullscreen="" loading="lazy"></iframe>
          <!-- End Google Maps -->
        </div>
        <!-- End Card -->
      </div>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import axios from 'axios';

export default {
  name: "LandingPage",

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
