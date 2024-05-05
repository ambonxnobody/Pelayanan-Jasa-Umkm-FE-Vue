<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Pesan Servis Pembeli</strong></h1>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="pesan">
              <div class="mb-3">
                <label class="form-label">Nama Elektronik</label>
                <select v-model="selectedNamaElektronik" class="form-select">
                  <option :value="null" disabled selected>Pilih Elektronik</option>
                  <option v-for="option in namaElektronikOptions" :key="option.id" :value="option.id">
                    {{ option.deskripsi }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Detail Masalah</label>
                <textarea v-model="detailMasalah" class="form-control" name="detail_masalah" id="detail_masalah"
                  cols="30" rows="10"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Tanggal Servis</label>
                <input v-model="tglServis" class="form-control form-control-lg" type="date" name="tgl_servis"
                  placeholder="Tanggal Servis" />
              </div>
              <div class="mb-3">
                <input hidden v-model="harga" class="form-control form-control-lg" name="harga" placeholder="Harga"
                  readonly />
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-success"> Pesan </button>
              </div>
            </form>
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
  name: "PesanServis",

  mounted() {
    feather.replace();
    this.getNamaElektronikOptions();
  },

  data() {
    return {
      selectedNamaElektronik: null,
      namaElektronikOptions: [],
      detailMasalah: '',
      teknisi: '2',
      tglServis: '',
      harga: null,
    };
  },

  methods: {
    async getNamaElektronikOptions() {
      try {
        const response = await axios.get('http://localhost:8000/api/nama-elektronik');
        this.namaElektronikOptions = response.data;

      } catch (error) {
        console.error(error);
      }
    },

    async pesan() {
      try {
        const selectedOption = this.namaElektronikOptions.find(option => option.id === this.selectedNamaElektronik);
        const response = await axios.post('http://localhost:8000/api/submit-pesanan', {
          layanan: selectedOption.layanan,
          masalah: this.detailMasalah,
          teknisi: this.teknisi,
          tgl_pesan: this.tglServis,
          harga: this.hargaElektronik,
        });

        if (response && response.data && response.data.error) {
          console.error(response.data.error);

        } else {
          const savedDataMessage = `Pesanan berhasil disimpan`;
          alert(savedDataMessage);
          console.log(response.data);
          this.selectedNamaElektronik = null;
          this.detailMasalah = '';
          this.teknisi = '';
          this.tglServis = '';
          this.harga = null;
          this.$router.replace({ path: '/pesan-servis-pembeli' });
        }

      } catch (error) {
        console.error(error);
      }
    },
  },

  computed: {
    hargaElektronik() {
      const selectedOption = this.namaElektronikOptions.find(option => option.id === this.selectedNamaElektronik);
      return selectedOption ? selectedOption.harga : null;
    },
  },

  watch: {
    selectedNamaElektronik(newVal, oldVal) {
      this.harga = this.hargaElektronik;
    },
  },
};

</script>

<style></style>
