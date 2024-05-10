<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Dashboard</strong></h1>

    <div class="row">
      <div class="col-12">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Jumlah Data Pesanan</h5>
          </div>
          <div class="card-body py-3">
            <h2>?</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";

export default {
  name: 'dashboard',
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      const accessToken = localStorage.getItem('accessToken');
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const userRole = localStorage.getItem('userRole');

      console.log('data user :', userRole);

      if (accessToken && isLoggedIn && userRole) {
        this.$store.commit('setAuthentication', { isLoggedIn: true, accessToken, role: userRole });
      } else {
        this.$router.push({ name: 'login' });
      }
    },
    addIcons() {
      feather.replace();
    }
  }

};
</script>

<style></style>
