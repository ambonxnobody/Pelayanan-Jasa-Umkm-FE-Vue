<template>
  <div class="container-fluid p-0">
    <h1 class="h3 mb-3"><strong>Layanan Jasa</strong></h1>

    <div class="row mb-3" id="layanan">
      <!-- Card -->
      <div class="col-md-4">
        <div class="card" style="width: 18rem">
          <img
            src="https://via.placeholder.com/300"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card" style="width: 18rem">
          <img
            src="https://via.placeholder.com/300"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card" style="width: 18rem">
          <img
            src="https://via.placeholder.com/300"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
export default {
  name: "PesananPembeli",
  mounted() {
    // Aktifkan ikon Feather jika diperlukan
    feather.replace();
  },
};
</script>

<style></style>
