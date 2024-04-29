<template>
  <main class="d-flex w-100">
    <div class="container d-flex flex-column">
      <div class="row vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div class="d-table-cell align-middle">
            <div class="text-center mt-4">
              <h1 class="h2">Halaman Pendaftaran</h1>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="m-sm-4">
                  <form>
                    <div class="mb-3">
                      <label class="form-label">Nama Lengkap</label>
                      <input
                        class="form-control form-control-lg"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Username</label>
                      <input
                        class="form-control form-control-lg"
                        type="username"
                        name="username"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Password</label>
                      <input
                        class="form-control form-control-lg"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Alamat</label>
                      <input
                        class="form-control form-control-lg"
                        type="alamat"
                        name="alamat"
                        placeholder="Enter your alamat"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Nomor Hp</label>
                      <input
                        class="form-control form-control-lg"
                        type="no_hp"
                        name="no_hp"
                        placeholder="Enter your Nomor"
                      />
                    </div>
                    <div class="text-center mt-3">
                      <router-link
                        to="/login"
                        href="index.html"
                        class="btn btn-lg btn-primary"
                        >Sign up</router-link
                      >
                      <!-- <button type="submit" class="btn btn-lg btn-primary">Sign up</button> -->
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
export default {};
</script>

<style></style>
