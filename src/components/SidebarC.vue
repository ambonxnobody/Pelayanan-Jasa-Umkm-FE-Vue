<template>
  <nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
      <router-link :to="dashboardLink" class="sidebar-brand d-flex align-items-center">
        <img :src="require('@/assets/LogoProfile.png')" class="img-fluid small-image" alt="Responsive image" />
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
        <li class="sidebar-item" v-if="userRole === 'Admin'">
          <router-link to="/riwayat-admin" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Riwayat Pelanggan</span>
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
        <li class="sidebar-item" v-if="userRole === 'Teknisi'">
          <router-link to="/riwayat-teknisi" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Riwayat Teknisi</span>
          </router-link>
        </li>
        <li class="sidebar-header" v-if="userRole === 'Pelanggan'">Pages Pelanggan</li>
        <li class="sidebar-item" v-if="userRole === 'Pelanggan'">
          <router-link to="/dashboard-pelanggan" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Dashboard pelanggan</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Pelanggan'">
          <router-link to="pesan-servis-pelanggan" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Pesanan Pelanggan</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Pelanggan'">
          <router-link to="layanan-pelanggan" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Layanan Pelanggan</span>
          </router-link>
        </li>
        <li class="sidebar-item" v-if="userRole === 'Pelanggan'">
          <router-link to="riwayat-pelanggan" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Riwayat Pelanggan</span>
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
      userRole: '',
      dashboardLink: '',
    };
  },
  mounted() {
    feather.replace();
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userData = JSON.parse(localStorage.getItem('user'));
      console.log('data user :', userData.data);
      this.userRole = userData.data.name;
      this.dashboardLink = `/dashboard-${this.userRole}`;
    } else {
      const router = useRouter();
      router.push('/login');
    }
  },
};
</script>
\
<style scoped>
.sidebar-brand {
  display: flex;
  align-items: center;
}

.small-image {
  width: 50px;
  height: auto;
  margin-right: 10px;
}
</style>
