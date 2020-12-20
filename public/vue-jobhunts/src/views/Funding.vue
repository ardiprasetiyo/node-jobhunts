<template>
  <div>
    <section class="app-navbar" style="z-index: ">
      <div class="fixed-top w-100 bg-white p-2 app-navbar-wrapper">
        <div class="row">
          <div class="col-6 d-block my-auto">
            <a
              href="#!"
              class="app-navbar-title text-left text-poppins app-nolink"
              @click="linkTo('/')"
            >
              Joobhunts
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="funding">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2">
            <div class="card app-card">
              <div class="card-body">
                <h2
                  class="app-text-header-largest text-poppins text-center my-2"
                >
                  Donasi
                </h2>
                <p class="app-text-subheader text-opensans text-center mb-2">
                  Gimana caranya donasi?, Gampang!
                </p>
                <p class="app-text-subheader text-opensans text-center">
                  Ada <b> 2 metode </b> yang bisa kamu lakukan untuk memberi
                  donasi.
                </p>
                <div class="row my-4">
                  <div class="col-12 col-lg-6 mt-4">
                    <div class="card app-card">
                      <div class="card-body">
                        <img
                          src="@/assets/images/funding-credit.svg"
                          class="img img-fluid d-block mx-auto my-auto"
                          alt=""
                          width="80%"
                        />
                        <h2
                          class="app-text-header-larger text-poppins text-center mt-3"
                        >
                          Credit Card
                        </h2>
                        <p class="app-text-subheader text-opensans text-center">
                          Kamu bisa transfer ke rekening dibawah ini
                        </p>

                        <div class="row">
                          <div class="col-12 col-lg-12">
                            <div class="card app-card">
                              <div class="card-body">
                                <h2 class="app-text-header text-poppins mb-0">
                                  3460458501
                                </h2>
                                <h2
                                  class="app-text-subheader text-opensans mt-0"
                                >
                                  BCA - ARDI HARI PRASETIYO
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-lg-6 mt-4">
                    <div class="card app-card">
                      <div class="card-body">
                        <img
                          src="@/assets/images/funding-doa.svg"
                          class="img img-fluid d-block mx-auto my-auto"
                          alt=""
                          width="55%"
                        />
                        <h2
                          class="app-text-header-larger text-poppins text-center mt-3"
                        >
                          Doa
                        </h2>
                        <p class="app-text-subheader text-opensans text-center">
                          Cara paling gampang pake banget, gimana doanya? <br />
                          <br />
                          اَللّٰهُمَّ اَكْفِنِيْ بِحَلَالِكَ عَنْ حَرَامِكَ،
                          وَأَغْنِنِيْ بِفَضْلِكَ عَمَّنْ سِوَاكَ <br />
                          Allahummakfini bihalalika ‘an haramik wa aghnini
                          bifadhlika amman siwak.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-8 offset-lg-2 mb-5 pt-4">
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
.funding {
  margin-top: 96px;
}
</style>
