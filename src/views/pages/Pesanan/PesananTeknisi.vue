<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3 text-center"><strong>Pesanan Teknisi</strong></h1>

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
                  <label class="form-label">Harga Jasa</label>
                  <input v-model="hargajasa" class="form-control" name="hargajasa" cols="30" rows="10" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Harga Alat</label>
                  <input v-model="hargaalat" class="form-control" name="hargaalat" cols="30" rows="10" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Tanggal Servis Selesai</label>
                  <input v-model="tglServis" class="form-control form-control-lg" type="date" name="tgl_servis_selesai"
                    placeholder="Tanggal Servis Selesai" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Deskripsi</label>
                  <textarea v-model="deskripsi" class="form-control" name="deskripsi" cols="30" rows="10"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <select v-model="status" class="form-select" id="basic-usage" data-placeholder="Choose one thing">
                    <option value="" disabled selected>Pilih Role</option>
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
                  <th>No.Telp</th>
                  <th>Layanan</th>
                  <th>Masalah</th>
                  <th>Tanggal Pesan</th>
                  <th>Tanggal Selesai</th>
                  <th>Harga Jasa</th>
                  <th>Harga Alat</th>
                  <th>Status</th>
                  <th>Deskripsi</th>
                  <th>Total Harga</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="DataPesananTeknisi.length > 0">
                  <tr v-for="(data, index) in DataPesananTeknisi" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td :class="{ 'text-danger': !data.user_pelanggan.username }">{{ data.user_pelanggan.username ||
        'Data kosong' }}</td>
                    <td :class="{ 'text-danger': !data.user_pelanggan.no_telp }">
                      {{ data.user_pelanggan.no_telp || 'Data kosong' }}
                    </td>
                    <td :class="{ 'text-danger': !data.layanan }">{{ data.layanan || 'Data kosong' }}</td>
                    <td :class="{ 'text-danger': !data.masalah }">{{ data.masalah || 'Data kosong' }}</td>
                    <template v-if="data.tgl_pesan_awal">
                      <td>{{ formatDate(data.tgl_pesan_awal) }}</td>
                    </template>
                    <template v-else>
                      <td class="text-danger">Data kosong</td>
                    </template>
                    <template v-if="data.tgl_pesan_selesai">
                      <td>{{ formatDate(data.tgl_pesan_selesai) }}</td>
                    </template>
                    <template v-else>
                      <td class="text-danger">Data kosong</td>
                    </template>
                    <td :class="{ 'text-danger': !data.harga_jasa }">{{ data.harga_jasa || 'Data kosong' }}</td>
                    <td :class="{ 'text-danger': !data.harga_alat }">{{ data.harga_alat || 'Data kosong' }}</td>
                    <td>
                      <span v-if="data.status === 1">Menunggu Konfirmasi</span>
                      <span v-else-if="data.status === 2" class="text-warning">Proses Pengerjaan</span>
                      <span v-else-if="data.status === 3" class="text-warning">Perbaikan Selesai</span>
                      <span v-else class="text-danger">Data kosong</span>
                    </td>
                    <td :class="{ 'text-danger': !data.deskripsi }">{{ data.deskripsi || 'Data kosong' }}</td>
                    <td :class="{ 'text-danger': !data.harga_jasa || !data.harga_alat }">
                      {{ calculateTotal(data.harga_jasa, data.harga_alat) || 'Data kosong' }}
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
  name: "PesananTeknisi",

  mounted() {
    this.getData();
    feather.replace();
  },

  components: {
    BaseModal,
  },

  data() {
    return {
      id: null,
      showModal: false,
      DataPesananTeknisi: [],
      hargajasa: '',
      hargaalat: '',
      tglServis: '',
      deskripsi: '',
      status: '',
      statusOption: [
        { label: 'Proses Pengerjaan', value: '2' },
        { label: 'Perbaikan Selesai', value: '3' }
      ],

    };
  },

  methods: {
    async getData() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userID = userData.data.id;
        const response = await axios.get(`http://localhost:8000/api/data-layanan-teknisi/${userID}`);
        this.DataPesananTeknisi = response.data;
        console.log('cek', response.data);
      } catch (error) {
        console.error(error);
      }
    },

    closeModal() {
      this.id = null;
      this.tglServis = '';
      this.hargajasa = '';
      this.hargaalat = '';
      this.deskripsi = '';
      this.status = '';
      this.$refs.baseModal.close();
    },

    editpesanan(index) {
      const pesanan = this.DataPesananTeknisi[index];
      this.id = pesanan.id;
      console.log(pesanan.id);
      this.hargajasa = pesanan.harga_jasa;
      this.hargaalat = pesanan.harga_alat;
      this.status = pesanan.status;
      this.tglServis = pesanan.tgl_pesan_selesai;
      this.deskripsi = pesanan.deskripsi;
      this.showModal = true;
    },

    async edit() {
      try {
        const response = await axios.put(`http://localhost:8000/api/update-pesanan-teknisi/${this.id}`, {
          id: this.id,
          tglServis: this.tglServis,
          deskripsi: this.deskripsi,
          jasa: this.hargajasa,
          alat: this.hargaalat,
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
          this.getData();
          this.closeModal();
          this.$router.replace({ path: '/Pesanan-Teknisi' });
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

    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

      return formattedDate;
    },

    calculateTotal(hargaJasa, hargaAlat) {
      if (!hargaJasa || !hargaAlat) {
        return 'Data kosong';
      }
      const total = parseFloat(hargaJasa) + parseFloat(hargaAlat);
      return total;
    },
  }
};

</script>

<style></style>
