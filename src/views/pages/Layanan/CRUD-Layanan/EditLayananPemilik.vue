<template>
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3"><strong>Tambah Data Layanan</strong></h1>
  
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="tambah">
                <div class="mb-3">
                  <label class="form-label">Nama Layanan</label>
                  <input v-model="namaLayanan" class="form-control" name="nama_layanan" id="nama_layanan"
                    cols="30" rows="10"/>
                </div>
                <div class="mb-3">
                  <label class="form-label">Deskripsi</label>
                  <textarea v-model="Deskripsi" class="form-control" name="deskripsi" id="deskripsi"
                    cols="30" rows="10"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Nama Teknisi</label>
                  <input v-model="namaTeknisi" class="form-control" name="nama_teknisi" id="nama_teknisi"
                    cols="30" rows="10"/>
                </div>
                <!-- <div class="mb-3">
                  <label class="form-label"></label>
                  <input  class="form-control form-control-lg" type="file" name="tgl_servis"
                    placeholder="Tanggal Servis" />
                </div> -->
                <div class="mb-3">
                  <button type="submit" class="btn btn-success"> Tambah </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>

import axios from 'axios';
export default {
  name: "TambahLayanan",
//   mounted() {
//       this.tambah();
//       feather.replace();
//     },

  data() {
    return {
        namaLayanan:'',
        Deskripsi: '',
        namaTeknisi: '',
    };
  },

  methods: {


    async tambah() {
      try {
       
        const response = await axios.post('http://localhost:8000/api/tambah-layanan', {
         
            nama_layanan: this.namaLayanan,
          deskripsi: this.Deskripsi,
          nama_teknisi: this.namaTeknisi,
        
        });

        if (response && response.data && response.data.error) {
          console.error(response.data.error);

        } else {
          const savedDataMessage = `Pesanan berhasil disimpan`;
          alert(savedDataMessage);
          console.log(response.data);
         
          this.namaLayanan = '';
          this.Deskripsi = '';
          this.namaTeknisi = '';
          // this.harga = null;
          this.$router.replace({ path: '/layanan-admin' });
        }

      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
