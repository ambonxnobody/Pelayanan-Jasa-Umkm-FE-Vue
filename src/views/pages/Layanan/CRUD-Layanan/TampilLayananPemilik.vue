<template>
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">
        <strong>Layanan Pemilik</strong>
      </h1>
      <router-link to="/Tambah-Layanan" class="btn btn-success">
                        Tambah
        </router-link>
      <br><br>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <table
                class="table table-striped table-bordered nowrap table-hover"
                id="example"
              >
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
                  <td>{{ data.teknisi }}</td>
                  <td>
                    <router-link to="/" class="btn btn-warning">
                        Edit
                    </router-link>
                    &nbsp;
                    <button type="button" class="btn btn-danger">
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
  import feather from "feather-icons";
  import axios from 'axios';
  
  export default {
    name: "LayananAdmin",
  
    mounted() {
      this.getData();
      feather.replace();
    },
  
    data() {
      return {
        DataLayanan: []
      };
    },
  
    methods: {
      async getData() {
        try {
          const response = await axios.get('http://localhost:8000/api/data-layanan');
          this.DataLayanan = response.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  
  </script>
  
  <style></style>
  