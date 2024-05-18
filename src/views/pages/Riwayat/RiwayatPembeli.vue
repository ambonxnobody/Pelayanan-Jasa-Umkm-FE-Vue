<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3 text-center"><strong>Riwayat Pelanggan</strong></h1>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped table-bordered nowrap table-hover" id="example">
              <thead class="text-center">
                <tr>
                  <th>No</th>
                  <th>Nama Elektronik</th>
                  <th>Masalah</th>
                  <th>Teknisi</th>
                  <th>Tanggal</th>
                  <th>Tanggal Selesai</th>
                  <th>Status</th>
                  <th>Deskripsi</th>
                  <th>Total Biaya</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pesanan, index) in riwayatPesanan" :key="pesanan.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ pesanan.layanan }}</td>
                  <td>{{ pesanan.masalah }}</td>
                  <td :class="{ 'text-danger': !pesanan.username }">{{ pesanan.username || 'Data kosong' }}</td>
                  <template v-if="pesanan.tgl_pesan_awal">
                    <td>{{ formatDate(pesanan.tgl_pesan_awal) }}</td>
                  </template>
                  <template v-else>
                    <td class="text-danger">Data kosong</td>
                  </template>
                  <template v-if="pesanan.tgl_pesan_selesai">
                    <td>{{ formatDate(pesanan.tgl_pesan_selesai) }}</td>
                  </template>
                  <template v-else>
                    <td class="text-danger">Data kosong</td>
                  </template>
                  <td>
                    <span v-if="pesanan.status === 0" class="text-info">Menunggu Konfirmasi</span>
                    <span v-else-if="pesanan.status === 1" class="text-warning">Proses Pesanan</span>
                    <span v-else-if="pesanan.status === 2" class="text-warning">Proses Pengerjaan</span>
                    <span v-else-if="pesanan.status === 3" class="text-success">Pesanan Selesai</span>
                    <span v-else-if="pesanan.status === 4" class="text-danger">Pesanan Dibatalkan</span>
                  </td>
                  <td :class="{ 'text-danger': !pesanan.deskripsi }">{{ pesanan.deskripsi || 'Data kosong' }}</td>
                  <td :class="{ 'text-danger': !pesanan.harga_jasa || !pesanan.harga_alat }">
                    {{ calculateTotal(pesanan.harga_jasa, pesanan.harga_alat) || 'Pesanan kosong' }}
                  </td>
                  <td>
                    <button v-if="pesanan.status === 0" class="btn btn-danger" @click="edit(pesanan.id)">
                      Cancel
                    </button>
                    <img v-else src="@/assets/check.svg" alt="Gambar" style="width: 24px; height: 24px;">
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
import feather from "feather-icons";
import axios from 'axios';

export default {
  name: "RiwayatPembeli",

  mounted() {
    this.getData();
    feather.replace();
  },

  data() {
    return {
      riwayatPesanan: [],
      status: '',
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8000/api/riwayat-pesanan');
        this.riwayatPesanan = response.data;
        // console.log('cek', this.riwayatPesanan);
      } catch (error) {
        console.error(error);
      }
    },

    edit(id) {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda ingin membatalkan pesanan ini?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, batalkan!',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.patch(`http://localhost:8000/api/cancel-pesanan/${id}`, { status: 4 })
            .then(response => {
              console.log(response.data);
              Swal.fire(
                'Dibatalkan!',
                'Pesanan telah dibatalkan.',
                'success'
              );
              const pesananIndex = this.riwayatPesanan.findIndex(pesanan => pesanan.id === id);
              if (pesananIndex !== -1) {
                this.riwayatPesanan[pesananIndex].status = 4;
              }
            })
            .catch(error => {
              console.error(error);
              Swal.fire(
                'Error',
                'Terjadi kesalahan saat membatalkan pesanan.',
                'error'
              );
            });
        }
      });
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
  },
};

</script>

<style></style>
