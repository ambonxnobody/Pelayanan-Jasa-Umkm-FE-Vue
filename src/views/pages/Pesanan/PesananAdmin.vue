<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3 text-center"><strong>Pesanan Admin</strong></h1>
    <div>
      <BaseModal v-if="showModal" ref="baseModal" @close="showModal = false">
        <template v-slot:header>
          <h2 class="modal-title">Form Data</h2>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </template>
        <template v-slot:body>
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="edit">
                <div class="mb-3">
                  <label class="form-label">Nama Pelanggan</label>
                  <input v-model="namapelanggan" class="form-control" name="namapelanggan" cols="30" rows="10"
                    readonly />
                </div>
                <div class="mb-3">
                  <label class="form-label">Nama Admin</label>
                  <input v-model="namaadmin" class="form-control" name="namaadmin" cols="30" rows="10" readonly />
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
                <div class="mb-3">
                  <label class="form-label">Layanan</label>
                  <input v-model="layanan" class="form-control" name="layanan" cols="30" rows="10" readonly />
                </div>
                <div class="mb-3">
                  <label class="form-label">masalah</label>
                  <textarea v-model="masalah" class="form-control" name="masalah" cols="30" rows="10"
                    readonly></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Harga Jasa</label>
                  <input v-model="hargajasa" class="form-control" name="hargajasa" cols="30" rows="10" readonly />
                </div>
                <div class="mb-3">
                  <label class="form-label">Harga Alat</label>
                  <input v-model="hargaalat" class="form-control" name="hargaalat" cols="30" rows="10" readonly />
                </div>
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <input v-model="status" class="form-control" name="status" cols="30" rows="10" readonly />
                </div>
              </form>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <button class="btn btn-primary" @click="edit">Submit</button>
        </template>
      </BaseModal>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped table-bordered nowrap table-hover" id="example">
              <thead class="text-center">
                <tr>
                  <th>No</th>
                  <th>Nama Pelanggan</th>
                  <th>Nama Admin</th>
                  <th>Nama Teknisi</th>
                  <th>Layanan</th>
                  <th>Masalah</th>
                  <th>Harga Jasa</th>
                  <th>Harga Alat</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="DataPesananAdmin.length > 0">
                  <tr v-for="(data, index) in DataPesananAdmin" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.id_pelanggan }}</td>
                    <td>{{ data.id_admin }}</td>
                    <td>{{ data.id_teknisi }}</td>
                    <td>{{ data.layanan }}</td>
                    <td>{{ data.masalah }}</td>
                    <td>{{ data.harga_jasa }}</td>
                    <td>{{ data.harga_alat }}</td>
                    <td>
                      <span v-if="data.status === 0">Menunggu Konfirmasi</span>
                      <span v-else>{{ data.status }}</span>
                    </td>
                    <td>
                      <button class="btn btn-warning" @click="editpesanan(index)">Edit</button>
                      &nbsp;
                      <!-- <button type="button" class="btn btn-danger" @click="deleteLayanan(index)">
                      Hapus
                    </button> -->
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
  name: "PesananAdmin",

  mounted() {
    this.getData();
    this.getUserTek();
    feather.replace();
    const userData = JSON.parse(localStorage.getItem('user'));
    this.idAdmin = userData.data.id;
    this.usernameAdmin = userData.data.username;
  },

  components: {
    BaseModal,
  },

  data() {
    return {
      id: null,
      showModal: false,
      DataPesananAdmin: [],
      hargajasa: '',
      hargaalat: '',
      status: '',
      namaTeknisi: [],
      selectnamaTeknisi: null,
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8000/api/get-pesanan-admin');
        this.DataPesananAdmin = response.data;
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
      this.layanan = '';
      this.namapelanggan = '';
      this.namaadmin = '';
      this.namateknisi = '';
      this.masalah = '';
      this.hargajasa = '';
      this.hargaalat = '';
      this.status = '';
      this.selectnamaTeknisi = null;
      this.$refs.baseModal.close();
    },

    editpesanan(index) {
      if (index >= 0 && index < this.DataPesananAdmin.length) {
        const pesanan = this.DataPesananAdmin[index];

        console.log('pesanan :', pesanan);
        this.id = pesanan.id;
        this.namapelanggan = pesanan.id_pelanggan;
        this.namaadmin = this.usernameAdmin;
        this.namateknisi = this.selectnamaTeknisi;
        this.layanan = pesanan.layanan;
        this.masalah = pesanan.masalah;
        this.hargajasa = pesanan.harga_jasa;
        this.hargaalat = pesanan.harga_alat;
        this.status = "Proses Pesanan";
        this.selectnamaTeknisi = pesanan.id_teknisi;
        this.showModal = true;
      }
    },

    async edit() {
      try {
        const response = await axios.put(`http://localhost:8000/api/update-pesanan-admin/${this.id}`, {
          id: this.id,
          id_admin: this.idAdmin,
          id_teknisi: this.selectnamaTeknisi,
          status: this.status === "Proses Pesanan" ? "1" : this.status,
        });

        if (response && response.data && response.data.error) {
          console.error(response.data.error);

        } else {
          const savedDataMessage = `data berhasil disimpan`;
          alert(savedDataMessage);
          console.log(response.data);
          this.getData();
          this.closeModal();
          // this.harga = null;
          this.$router.replace({ path: '/Pesanan-admin' });
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
};

</script>

<style></style>
