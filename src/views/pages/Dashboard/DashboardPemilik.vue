<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Dashboard Pemilik</strong></h1>

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
import { useRouter } from 'vue-router';
import feather from "feather-icons";
import axios from 'axios';
export default {

  name: "DashboardPemilik",
  data() {
    return {
      userRole: ''
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userData = JSON.parse(localStorage.getItem('user'));
      const userRole = userData.data.role;
      this.userRole = userRole;
    } else {
      const router = useRouter();
      router.push('/login');
    }
    feather.replace();
  },
};
</script>

<style></style>
