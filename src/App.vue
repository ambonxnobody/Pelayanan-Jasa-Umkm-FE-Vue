<template>
  <div>
    <!-- Jika URL adalah "/" atau "/login", tampilkan router-view -->
    <router-view v-if="isRootOrLoginRoute" />

    <!-- Jika URL bukan "/" atau "/login", tampilkan layout lengkap -->
    <div v-else class="wrapper">
      <SidebarC />
      <div class="main">
        <NavbarC />
        <main class="content">
          <router-view />
        </main>
        <FooterC />
      </div>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import NavbarC from "./components/NavbarC.vue";
import SidebarC from "./components/SidebarC.vue";
import FooterC from "./components/FooterC.vue";

export default {
  name: "App",
  components: {
    NavbarC,
    SidebarC,
    FooterC,
  },
  mounted() {
    // Aktifkan ikon Feather jika diperlukan
    feather.replace();
  },
  computed: {
    // Periksa apakah URL adalah "/" atau "/login"
    isRootOrLoginRoute() {
      return this.$route.path === "/" || this.$route.path === "/login" || this.$route.path === "/registrasi";
    },
  },
};
</script>

<style></style>
