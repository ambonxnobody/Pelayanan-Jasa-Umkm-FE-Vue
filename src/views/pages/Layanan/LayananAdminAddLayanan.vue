<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3 text-center">
      <strong>Layanan Admin</strong>
    </h1>
    <div>
      <button class="btn btn-primary" @click="showModal = true; console.log('showModal:', showModal)">Tambah</button>
      <BaseModal v-if="showModal" ref="baseModal" @close="showModal = false">
        <template v-slot:header>
          <h2 class="modal-title">Form Data</h2>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </template>
        <template v-slot:body>
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="tambah" enctype="multipart/form-data">
                <div class="mb-3">
                  <label class="form-label">Nama Layanan</label>
                  <input v-model="namaLayanan" class="form-control" name="nama_layanan" id="nama_layanan" cols="30"
                    rows="10" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Deskripsi</label>
                  <textarea v-model="Deskripsi" class="form-control" name="deskripsi" id="deskripsi" cols="30"
                    rows="10"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Gambar</label>
                  <div v-if="gambar">
                    <img :src="getImageUrl(gambar)" alt="Gambar" width="100" height="100" class="mb-3">
                  </div>
                  <input type="file" @change="onFileChange" class="form-control-file" name="gambar" id="gambar">
                </div>
                <div class="mb-3">
                  <label class="form-label">Nama Teknisi</label>
                  <select v-model="selectnamaTeknisi" class="form-select">
                    <option :value="null" disabled selected>Pilih Teknisi</option>
                    <option v-for="option in namaTeknisi" :key="option.id" :value="option.id">
                      {{ option.username }}
                    </option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <button class="btn btn-primary" @click="tambah">Submit</button>
        </template>
      </BaseModal>
    </div>
    <br>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped table-bordered nowrap table-hover" id="example">
              <thead class="text-center">
                <tr>
                  <th>No</th>
                  <th>Layanan</th>
                  <th>Deskripsi</th>
                  <th>gambar</th>
                  <th>teknisi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in DataLayanan" :key="data.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ data.layanan }}</td>
                  <td>{{ data.deskripsi }}</td>
                  <td>
                    <img :src="getImageUrl(data.gambar)" alt="Gambar" width="100" height="100">
                  </td>
                  <td>{{ data.username }}</td>
                  <td>
                    <button type="button" class="btn btn-warning" @click="editLayanan(index)">
                      Edit
                    </button>
                    &nbsp;
                    <button type="button" class="btn btn-danger" @click="deleteLayanan(index)">
                      Hapus
                    </button>
                  </td>
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
import BaseModal from '../../../components/Modal.vue';
// import MyModal from '../../../components/ModalTest.vue';
import feather from "feather-icons";
import axios from 'axios';

export default {
  name: "LayananAdmin",

  mounted() {
    this.getData();
    this.getUserTek();
    feather.replace();
  },

  data() {
    return {
      id: null,
      showModal: false,
      DataLayanan: [],
      selectnamaTeknisi: null,
      namaLayanan: '',
      Deskripsi: '',
      gambar: '',
      currentGambar: null,
      namaTeknisi: [],

    };
  },
  components: {
    BaseModal,
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
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/data-layanan');
        this.DataLayanan = response.data;
        console.log('cek', response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getUserTek() {
      try {
        const response = await axios.get('https://umkmbackend.pjjaka.com/api/get-usertek');
        this.namaTeknisi = response.data;

      } catch (error) {
        console.error(error);
      }
    },

    closeModal() {
      this.id = null;
      this.namaLayanan = '';
      this.Deskripsi = '';
      this.selectnamaTeknisi = null;
      this.$refs.baseModal.close();
    },
    editLayanan(index) {
      const layanan = this.DataLayanan[index];
      this.id = layanan.id;
      console.log(layanan.id);
      this.namaLayanan = layanan.layanan;
      this.Deskripsi = layanan.deskripsi;
      this.teknisi = layanan.teknisi;
      this.gambar = layanan.gambar;
      this.selectnamaTeknisi = layanan.teknisi;
      this.showModal = true;
    },

    async deleteLayanan(index) {
      const layanan = this.DataLayanan[index];
      const layananId = layanan.id;

      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda tidak akan dapat mengembalikan tindakan ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus saja!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`https://umkmbackend.pjjaka.com/api/delete-layanan/${layananId}`)
            .then(response => {
              console.log(response.data);
              const deletedDataMessage = "Data pengguna berhasil dihapus.";
              Swal.fire('Success', deletedDataMessage, 'success');
              this.DataLayanan.splice(index, 1);
            })
            .catch(error => {
              console.error(error);
              Swal.fire('Error', 'Terjadi kesalahan saat menghapus data', 'error');
            });
        }
      });
    },

    tambah() {
      const endpoint = this.id ? `https://umkmbackend.pjjaka.com/api/update-layanan/${this.id}` : 'https://umkmbackend.pjjaka.com/api/tambah-layanan';
      const method = this.id ? 'post' : 'post';
      axios[method](endpoint, {
        nama_layanan: this.namaLayanan,
        deskripsi: this.Deskripsi,
        gambar: this.gambar,
        teknisi: this.selectnamaTeknisi,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data);
        const savedDataMessage = `Data berhasil ${this.id ? 'diubah' : 'disimpan'}`;
        Swal.fire('Success', savedDataMessage, 'success');
        this.closeModal();
        this.getData();
        this.getUserTek();
      }).catch(error => {
        console.error(error);
        Swal.fire('Error', 'Terjadi kesalahan saat menyimpan data', 'error');
      });
    },
  },
};

</script>

<style></style>