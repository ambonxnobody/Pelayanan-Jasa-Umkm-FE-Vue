<template>
  <nav class="navbar navbar-expand navbar-light navbar-bg">
    <a class="sidebar-toggle js-sidebar-toggle" @click="toggleSidebar">
      <i class="hamburger align-self-center"></i>
    </a>
    <div class="navbar-collapse collapse">
      <ul class="navbar-nav navbar-align">
        <li class="nav-item dropdown mx-6">
          <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown"
            @click="toggleDropdown">
            <span class="text-dark">{{ username }}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-end ">
            <a class="dropdown-item" href="pages-profile.html"><i class="align-middle me-1" data-feather="user"></i>
              Profile</a>
            <a class="dropdown-item" href="#"><i class="align-middle me-1" data-feather="pie-chart"></i>
              Analytics</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="index.html"><i class="align-middle me-1" data-feather="settings"></i>
              Settings & Privacy</a>
            <a class="dropdown-item" href="#"><i class="align-middle me-1" data-feather="help-circle"></i> Help
              Center</a>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" @click="logout">Log out</button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarC",

  data() {
    return {
      username: ''
    };
  },
  mounted() {
    const userData = JSON.parse(localStorage.getItem('user'));
    this.username = userData.data.username;
  },

  methods: {
    toggleDropdown() {
      const dropdownMenu = document.querySelector(".dropdown-menu");
      dropdownMenu.classList.toggle("show");
    },
    toggleSidebar() {
      const sidebar = document.querySelector('.js-sidebar');
      sidebar.classList.toggle('show');
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
  }
};
</script>

<style></style>
