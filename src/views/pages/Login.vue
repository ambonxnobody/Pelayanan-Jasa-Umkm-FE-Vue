<template>
  <main class="d-flex w-100">
    <div class="container d-flex flex-column">
      <div class="row vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div class="d-table-cell align-middle">
            <div class="text-center mt-4">
              <h1 class="h2">Halaman Login</h1>
              <p class="lead">Sign in to your account to continue</p>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="m-sm-4">
                  <form @submit.prevent="login">

                    <div class="mb-3">
                      <label for="username" class="form-label">Username:</label>
                      <input type="text" id="username" v-model="username" class="form-control form-control-lg"
                        required />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password:</label>
                      <input type="password" id="password" v-model="password" class="form-control form-control-lg"
                        required />
                      <small><a href="#">Forgot password?</a></small>
                      <small style="float: right;"><a href="/registrasi">registrasi</a></small>
                    </div>
                    <div class="text-center mt-3">
                      <button type="submit" class="btn btn-lg btn-primary">
                        Sign in
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
import { mapActions } from "vuex";
import axios from 'axios';

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(['loginUser']),
    async login() {
      axios.post('http://localhost:8000/api/login', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          const token = response.data.token;
          const data = response.data;
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem('token', token);
          const userData = JSON.parse(localStorage.getItem('user'));
          this.userRole = userData.data.name;
          this.$router.push(`/dashboard-${this.userRole}`);
        })
        .catch(error => {
          console.error('Error:', error);

        });
    }
  },
};

</script>

<style></style>
