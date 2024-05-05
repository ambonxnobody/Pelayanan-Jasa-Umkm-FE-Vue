<template>
  <nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
      <router-link to="/dashboard" class="sidebar-brand">
        <span class="align-middle">Faiz Teknik Blitar</span>
      </router-link>
      
      <ul class="sidebar-nav">
        <li class="sidebar-header" v-if="userRole === 'Admin'">Pages Admin</li>
        <li class="sidebar-item" v-if="userRole === 'Admin'">
          <router-link to="/dashboard-admin" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Dashboard Admin</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Admin'">
          <router-link to="/pesanan-admin" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Pesanan Admin</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Admin'">
          <router-link to="/layanan-admin" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Layanan Admin</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Admin'">
          <router-link to="/layanan-admin-add-teknisi" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Tambah User</span>
          </router-link>
        </li>
        <li class="sidebar-header" v-if="userRole === 'Teknisi'">
          Pages Teknisi
        </li>
        <li class="sidebar-item" v-if="userRole === 'Teknisi'">
          <router-link to="/dashboard-teknisi" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Dashboard Teknisi</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Teknisi'">
          <router-link to="pesanan-teknisi" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Pesanan Teknisi</span>
          </router-link>
        </li>

        <!-- <li class="sidebar-header">Pages Pemilik</li>
        <li class="sidebar-item">
          <router-link to="/dashboard-pemilik" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Dashboard Pemilik</span>
          </router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="pesanan-pemilik" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Pesanan Pemilik</span>
          </router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="layanan-pemilik" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Layanan Pemilik</span>
          </router-link>
        </li> -->
        <li class="sidebar-header" v-if="userRole === 'Pembeli'">Pages Pembeli</li>
        <li class="sidebar-item" v-if="userRole === 'Pembeli'">
          <router-link to="/dashboard-pembeli" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Dashboard Pembeli</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Pembeli'">
          <router-link to="pesan-servis-pembeli" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Pesanan Pembeli</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Pembeli'">
          <router-link to="layanan-pembeli" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Layanan Pembeli</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Pembeli'">
          <router-link to="riwayat-pembeli" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Riwayat Pembeli</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import feather from "feather-icons";
export default {

  name: "SidebarC",
  data() {
    return {
      userRole: ''
    };
  },
  mounted() {
    feather.replace();
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userData = JSON.parse(localStorage.getItem('user'));
      console.log(userData.data);
      this.userRole = userData.data.name; // Mengambil nilai role dari data pengguna
      if (this.userRole === 'admin') {

      } else if (this.userRole === 'teknisi') {

      } else if (this.userRole === 'pembeli') {

      }
    } else {
      const router = useRouter();
      router.push('/login');
    }

  },

};
</script>
<style></style>
