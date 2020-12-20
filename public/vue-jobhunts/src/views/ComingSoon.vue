<template>
  <div>
    <section class="app-navbar" style="z-index: ">
      <div class="fixed-top w-100 bg-white p-2 app-navbar-wrapper">
        <div class="row">
          <div class="col-6 d-block my-auto">
            <h1 class="app-navbar-title text-left text-poppins">Joobhunts</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="coming-soon">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2">
            <div class="card app-card">
              <div class="card-body">
                <h2
                  class="app-text-header-largest text-poppins text-center my-2"
                >
                  Eh Loh Kok?
                </h2>
                <p class="app-text-subheader text-opensans text-center my-3">
                  Tenang, fitur ini sebentar lagi bakal release. Sambil nunggu
                  release kamu bisa dukung kita dengan cara donasi
                  <router-link to="/funding">disini</router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-8 offset-lg-2 pt-4">
            <a
              href="#!"
              @click="linkTo('/')"
              class="app-button form-control app-background-info"
              >Kembali</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    linkTo(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style scoped>
.coming-soon {
  margin-top: 96px;
}
</style>
