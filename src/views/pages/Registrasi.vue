<template>
  <main class="d-flex w-100">
    <div class="container d-flex flex-column">
      <div class="row vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div class="d-table-cell align-middle">
            <div class="text-center mt-4">
              <h1 class="h2">Halaman Pendaftaran</h1>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="m-sm-4">
                  <form @submit.prevent="registrasi">
                    <div class="mb-3">
                      <input type="hidden" id="username" v-model="nama" class="form-control form-control-lg"
                        required />
                    </div>
                    <div class="mb-3">
                      <label for="username" class="form-label">Username:</label>
                      <input type="text" id="username" v-model="username" class="form-control form-control-lg"
                        required />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password:</label>
                      <input type="password" id="password" v-model="password" class="form-control form-control-lg"
                        required />
                      <!-- <small><a href="#">Forgot password?</a></small> -->
                    </div>
                    <div class="mb-3">
                      <label for="username" class="form-label">No Telepon</label>
                      <input type="text" id="username" v-model="notelp" class="form-control form-control-lg"
                        required />
                    </div>
                    <div class="mb-3">
                      <input type="hidden" id="username" v-model="role" class="form-control form-control-lg"
                        required />
                    </div>
                    <div class="text-center mt-3">
                      <button type="submit" class="btn btn-lg btn-primary">
                        Registrasi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: "registrasi",
  data() {
    return {
      nama:"Pelanggan",
      username: "",
      password: "",
      notelp: "",
      role: "3",
    };
  },
methods:{

  async registrasi() {
      try {
      
        const response = await axios.post('http://localhost:8000/api/registrasi', {
         
          nama: this.nama,
          username: this.username,
          password: this.password,
          notelp: this.notelp,
          role: this.role,
        
        });

        if (response && response.data && response.data.error) {
          console.error(response.data.error);

        } else {
          const savedDataMessage = `berhasil registrasi`;
          alert(savedDataMessage);
          console.log(response.data);
          this.namaLayanan = '';
          this.Deskripsi = '';
          this.selectnamaTeknisi = null;
          // this.harga = null;
          this.$router.replace({ path: '/login' });
        }

      } catch (error) {
        console.error(error);
      }
    },
}

};

</script>

<style></style>
