<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Dashboard Pembeli</strong></h1>

    <div class="row">
      <div class="col-6">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Daftar Layanan</h5>
          </div>
          <div class="card-body py-3">
            <h2>?</h2>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Riwayat Pesanan</h5>
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
  name: "DashboardPembeli",
  mounted() {
    feather.replace();
  },
};
</script>

<style></style>
