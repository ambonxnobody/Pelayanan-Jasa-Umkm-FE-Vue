<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Pesan Servis Pelanggan</strong></h1>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="pesan">
              <div class="mb-3">
                <label class="form-label">Nama Elektronik</label>
                <select ref="select2" v-model="selectedNamaElektronik" class="form-control">
                  <option :value="null" disabled>Pilih Elektronik</option>
                  <option v-for="option in namaElektronikOptions" :key="option.id" :value="option.id">
                    {{ option.layanan }}
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
                <label class="form-label">Alamat pelanggan</label>
                <input v-model="alamat" class="form-control form-control-lg" name="alamat"
                  placeholder="Alamat pelanggan" />
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-success">Pesan</button>
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
    const userData = JSON.parse(localStorage.getItem('user'));
    const userID = userData.data.id;
    this.id_pelanggan = userID;
    feather.replace();
    this.getNamaElektronikOptions();

    const today = new Date();
    const offset = 7 * 60 * 60 * 1000;
    const localTime = today.getTime();
    const gmtPlus7Time = new Date(localTime + offset);
    const formattedDate = gmtPlus7Time.toISOString().split('T')[0];
    this.tglServis = formattedDate;
  },

  data() {
    return {
      selectedNamaElektronik: null,
      namaElektronikOptions: [],
      detailMasalah: '',
      tglServis: '',
      id_pelanggan: '',
      alamat: ''
    };
  },

  methods: {

    async getNamaElektronikOptions() {
      try {
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/nama-elektronik');
        this.namaElektronikOptions = response.data;

      } catch (error) {
        console.error(error);
      }
    },

    async pesan() {
      try {
        const selectedOption = this.namaElektronikOptions.find(option => option.id === this.selectedNamaElektronik);
        const response = await axios.post('https://umkmbackend.pjjaka.com/api/submit-pesanan', {
          layanan: selectedOption.id,
          masalah: this.detailMasalah,
          tgl_pesan: this.tglServis,
          id_pelanggan: this.id_pelanggan,
          alamat: this.alamat
        });

        if (response && response.data && response.data.error) {
          console.error(response.data.error);
          Swal.fire(
            'Error',
            'Gagal menyimpan pesanan.',
            'error'
          );
        } else {
          Swal.fire(
            'Berhasil',
            'Pesanan berhasil disimpan.',
            'success'
          );
          console.log(response.data);
          this.selectedNamaElektronik = null;
          this.detailMasalah = '';
          this.tglServis = '';
          this.$router.replace({ path: '/pesan-servis-pelanggan' });
        }

      } catch (error) {
        console.error(error);
        Swal.fire(
          'Error',
          'Terjadi kesalahan saat menyimpan pesanan.',
          'error'
        );
      }
    },
  },

  // computed: {
  //   hargaElektronik() {
  //     const selectedOption = this.namaElektronikOptions.find(option => option.id === this.selectedNamaElektronik);
  //     return selectedOption ? selectedOption.harga : null;
  //   },
  // },

  // watch: {
  //   selectedNamaElektronik(newVal, oldVal) {
  //     this.harga = this.hargaElektronik;
  //   },
  // },
};

</script>

<style></style>
