<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Dashboard Teknisi</strong></h1>

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
  name: "DashboardTeknisi",
  mounted() {
    // Aktifkan ikon Feather jika diperlukan
    feather.replace();
  },
};
</script>

<style></style>
