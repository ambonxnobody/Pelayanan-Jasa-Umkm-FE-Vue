<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3">
      <strong>Layanan Admin</strong>
    </h1>
    <div>
      <button class="btn btn-primary" @click="showModal = true">Tambah</button>
      <BaseModal v-if="showModal" ref="baseModal" @close="showModal = false">
        <template v-slot:header>
          <h2 class="modal-title">Form Data</h2>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </template>
        <template v-slot:body>
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="tambah">
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
                  <td>{{ data.gambar }}</td>
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
      namaTeknisi: [],

    };
  },
  components: {
    BaseModal,
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8000/api/data-layanan');
        this.DataLayanan = response.data;
        console.log('cek', response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getUserTek() {
      try {
        const response = await axios.get('http://localhost:8000/api/get-usertek');
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
      this.namaLayanan = layanan.layanan;
      this.Deskripsi = layanan.deskripsi;
      this.teknisi = layanan.teknisi;
      this.selectnamaTeknisi = layanan.teknisi;
      this.showModal = true;
    },

    async deleteLayanan(index) {
      const layanan = this.DataLayanan[index];
      const layananId = layanan.id;

      if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
        axios.delete(`http://localhost:8000/api/delete-layanan/${layananId}`)
          .then(response => {
            console.log(response.data);
            const deletedDataMessage = "Data pengguna berhasil dihapus.";
            alert(deletedDataMessage);
            this.DataLayanan.splice(index, 1);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },

    tambah() {
      const selectedOption = this.namaTeknisi.find(option => option.id === this.selectnamaTeknisi);
      const endpoint = this.id ? `http://localhost:8000/api/update-layanan/${this.id}` : 'http://localhost:8000/api/tambah-layanan';
      const method = this.id ? 'put' : 'post';
      axios[method](endpoint, {
        nama_layanan: this.namaLayanan,
        deskripsi: this.Deskripsi,
        teknisi: selectedOption.id,
      }).then(response => {
        console.log(response.data);
        const savedDataMessage = `Data berhasil ${this.id ? 'diubah' : 'disimpan'}`;
        alert(savedDataMessage);
        this.closeModal();
        this.getData();
        this.getUserTek();
      }).catch(error => {
        console.error(error);
      });
    },
  }
};

</script>

<style></style>