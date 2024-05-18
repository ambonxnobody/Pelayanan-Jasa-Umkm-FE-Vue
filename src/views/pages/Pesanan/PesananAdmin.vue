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
                  <label class="form-label">Status</label>
                  <select v-model="status" class="form-select" @change="setRole">
                    <option value="" disabled selected>Pilih Status</option>
                    <option v-for="option in statusOption" :key="option.value" :value="option.value">
                      {{ option.label }}</option>
                  </select>
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
                  <th>Layanan</th>
                  <th>Masalah</th>
                  <th>No.Telp</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="DataPesananAdmin.length > 0">
                  <tr v-for="(data, index) in DataPesananAdmin" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.user_pelanggan.username }}</td>
                    <td>{{ data.layanan }}</td>
                    <td>{{ data.masalah }}</td>
                    <td>{{ data.user_pelanggan.no_telp }}</td>
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
      status: '',
      statusOption: [
        { label: 'Proses Pesanan', value: '1' },
        { label: 'Pesanan Dibatalkan', value: '4' }
      ],
      namaTeknisi: [],
      selectnamaTeknisi: null,
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8000/api/get-pesanan-admin');
        this.DataPesananAdmin = response.data;
        // console.log('data admin',this.DataPesananAdmin);
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
      this.namaadmin = '';
      this.namateknisi = '';
      this.status = '';
      this.selectnamaTeknisi = null;
      this.$refs.baseModal.close();
    },

    editpesanan(index) {
      if (index >= 0 && index < this.DataPesananAdmin.length) {
        const pesanan = this.DataPesananAdmin[index];
        this.id = pesanan.id;
        this.namaadmin = this.usernameAdmin;
        this.namateknisi = this.selectnamaTeknisi;
        this.status = this.status;
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
          status: this.status,
        });

        if (response && response.data && response.data.error) {
          console.error(response.data.error);
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Gagal memperbarui data pengguna.',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Data berhasil disimpan!',
          });
          console.log(response.data);
          this.getData();
          this.closeModal();
          this.$router.replace({ path: '/Pesanan-admin' });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan',
          text: 'Terjadi kesalahan saat memperbarui data.',
        });
      }
    },
  }
};

</script>

<style></style>
