<template>
  <div class="home">
    <section class="app-navbar" style="z-index: ">
      <div class="fixed-top w-100 bg-white p-2 app-navbar-wrapper">
        <div class="row">
          <div class="col-6 d-block my-auto">
            <h1 class="app-navbar-title text-left text-poppins">Joobhunts</h1>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-lg-4 offset-lg-7 col-9 my-auto">
                <a href="#!">
                  <h2
                    class="app-text-subheader float-right m-0 text-right"
                    @click="linkTo('cv-builder')"
                  >
                    CV Builder
                  </h2>
                </a>
              </div>
              <div class="col-lg-1 col-3">
                <a href="#!" @click="linkTo('cv-builder')">
                  <img
                    src="@/assets/icons/cv-builder-icon.svg"
                    class="app-icon d-block my-auto float-right"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="app-search mb-4">
      <div class="container">
        <div class="card app-card">
          <div class="card-body">
            <div class="row">
              <div class="col-12 mb-2">
                <h1 class="app-text-header text-poppins">Cari Pekerjaan</h1>
              </div>
              <div class="col-12 mb-3">
                <div class="app-input-group-icon d-relative">
                  <div class="app-group-input">
                    <input
                      type="text"
                      class="form-control app-input app-input-rounded"
                      placeholder="Cari pekerjaan impianmu"
                      v-model="querySearch"
                      ref="searchjob"
                      @keyup.enter="setSearchQuery"
                    />
                  </div>
                  <div class="app-group-icon" @click="updateData()">
                    <a href="#!" class="icon"
                      ><img src="@/assets/icons/search-icon.svg"
                    /></a>
                  </div>
                  <div
                    class="app-group-icon search-clear"
                    v-if="querySearch"
                    @click="clearSearchQuery"
                  >
                    <a href="#!" class="icon"
                      ><span class="material-icons">clear</span></a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="d-inline-block float-center">
                  <input
                    type="checkbox"
                    id="isVocational"
                    class="ml-1"
                    ref="vocationalcheckbox"
                    v-model="isVocational"
                    @click="setIsVocational"
                  />
                  <label
                    for="isVocational"
                    class="pl-3 app-text-subheader text-opensans"
                    >Hanya tampilkan pekerjaan untuk SMA/SMK</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="app-funding mb-4">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-4">
            <a href="#!" @click="linkTo('/funding')" class="app-nolink">
              <img
                src="@/assets/images/funding.png"
                alt=""
                class="img img-fluid"
              />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="app-loading" v-if="isLoading">
      <h5 class="text-center text-poppins">Mengambil Data</h5>
      <p class="text-center text-opensans">
        Ini namanya loading, ditunggu aja ...
      </p>
    </section>

    <section class="app-total-job" v-if="!isLoading">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1
              class="app-text-subheader text-poppins ml-3"
              v-html="
                getTotalJobs > 0
                  ? `Menampilkan ${
                      activePage * jobPerPage > getTotalJobs
                        ? ` hasil terakhir`
                        : `<b>${activePage * jobPerPage}</b>`
                    } dari <b>${getTotalJobs}</b> pekerjaan
                  `
                  : 'Pekerjaan tidak ditemukan'
              "
            ></h1>
          </div>
        </div>
      </div>
    </section>

    <section class="app-jobs-content" v-if="!isLoading">
      <div class="container">
        <div class="row">
          <div
            class="col-12 col-lg-6 mt-2 mb-2"
            v-for="(job, jobIndex) of getJobs"
            :key="jobIndex"
          >
            <a href="#!" class="app-nolink" @click="redirectJob(job.job_url)">
              <div class="app-card card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 col-lg-12 mt-2 mb-2">
                      <span
                        class="app-pils pils-bg-info mx-2 text-opensans"
                        v-if="job.type"
                        >{{ capitalizeEachWord(job.type) }}</span
                      >
                      <span
                        class="app-pils pils-bg-success mx-2 text-opensans"
                        v-if="job.is_vocational"
                        >SMA/SMK</span
                      >
                    </div>
                    <div class="col-12 col-lg-12 mt-2">
                      <div class="row">
                        <div class="col-4 col-lg-4 my-auto">
                          <img
                            :src="job.company.logo"
                            alt=""
                            class="img img-fluid d-block mx-auto my-auto"
                            width="92px"
                          />
                        </div>
                        <div class="col-8 col-lg-8 my-auto">
                          <h1 class="app-text-header-larger text-poppins">
                            {{ job.title }}
                          </h1>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-8 col-lg-8 offset-lg-4 offset-4">
                          <h1 class="app-text-subheader text-opensans">
                            {{ job.company.name }}
                          </h1>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-8 col-lg-8 offset-lg-4 offset-4">
                          <div class="row">
                            <div class="col-12 col-lg-12 mb-3">
                              <h1 class="app-text-subheader text-opensans">
                                Bandung
                              </h1>
                            </div>
                            <div class="col-12 col-lg-12">
                              <h1
                                class="app-text-subheader font-weight-bold text-opensans"
                              >
                                {{
                                  salaryParse(
                                    job.salary.min,
                                    job.salary.max,
                                    job.salary.type
                                  )
                                }}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="app-pagination mt-4 mb-4" v-if="!isLoading">
      <div class="container">
        <div class="col-lg-4 offset-lg-4 col-12">
          <div class="card app-card">
            <div class="card-body">
              <div class="row">
                <div
                  class="col-4 col-lg-4 text-center my-auto app-text-subheader text-center"
                  @click="moveToPage(activePage - 1)"
                >
                  <a
                    href="#!"
                    :class="{
                      btn: true,
                      'app-text-disabled': activePage - 1 == 0,
                    }"
                    >Kembali</a
                  >
                </div>
                <div class="col-4 col-lg-4 text-center">
                  <select
                    name="pagination"
                    id=""
                    class="form-control"
                    ref="pagination"
                    @change="jumpToPage()"
                  >
                    <option
                      :value="numPage"
                      :selected="numPage == activePage"
                      v-for="numPage of Math.ceil(
                        getTotalJobs / this.jobPerPage
                      )"
                      :key="numPage"
                    >
                      {{ numPage }}
                    </option>
                  </select>
                </div>
                <div
                  class="col-4 col-lg-4 text-center my-auto app-text-subheader text-center"
                >
                  <a
                    href="#!"
                    :class="{
                      btn: true,
                      'app-text-disabled':
                        activePage + 1 >
                        Math.ceil(getTotalJobs / this.jobPerPage),
                    }"
                    @click="moveToPage(activePage + 1)"
                    >Lanjut</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row mt-4 mb-4">
          <div class="col-12 text-center">
            <span class="app-text-subheader text-opensans d-block"
              >Brought to you by
              <a href="https://www.instagram.com/nerdstrtype/" target="_blank"
                >@nerdstrtype</a
              >
              brain</span
            >
            <span class="text-center text-opensans app-text-subheader"
              >This is my one week open source project</span
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import VueCookies from "vue-cookies";
import { mapGetters } from "vuex";

Vue.use(VueCookies);

export default {
  name: "Home",
  data() {
    return {
      activePage: 1,
      querySearch: "",
      jobPerPage: 30,
      isVocational: false,
      isLoading: false,
    };
  },
  methods: {
    setIsVocational() {
      this.isVocational = this.$refs.vocationalcheckbox.checked;
      this.activePage = 1;
      this.$cookies.set("is-vocational", this.isVocational ? "1" : "0", "1d");
      this.$cookies.set("last-page", this.activePage, "1d");
      this.updateData();
    },

    linkTo(path) {
      this.$router.push(path);
    },

    setSearchQuery() {
      this.querySearch = this.$refs.searchjob.value;
      this.activePage = 1;
      this.$cookies.set("last-search", this.querySearch, "1d");
      this.$cookies.set("last-page", this.activePage, "1d");
      this.updateData();
    },

    clearSearchQuery() {
      this.querySearch = "";
      this.activePage = 1;
      this.$cookies.set("last-search", this.querySearch, "1d");
      this.$cookies.set("last-page", this.activePage, "1d");
      this.updateData();
    },

    async updateData() {
      this.isLoading = true;
      await this.$store.dispatch("getJobs", {
        searchQuery: this.querySearch,
        page: this.activePage,
        isVocational: this.isVocational,
      });
      this.isLoading = false;
      window.scrollTo(0, 0);
    },

    capitalizeEachWord(text) {
      let words = text.split(" ");
      words = words.map((word) => word[0].toUpperCase() + word.slice(1));
      return words.join(" ");
    },

    redirectJob(url) {
      window.open(url);
    },
    moveToPage(numPage) {
      if (
        numPage == 0 ||
        numPage >
          Math.ceil(this.$store.state.currentJobs.totalJobs / this.jobPerPage)
      )
        return;
      this.activePage = numPage;
      this.updateData();
      this.$cookies.set("last-page", this.activePage, "1d");
    },
    jumpToPage() {
      let numPage = Number.parseInt(this.$refs.pagination.value);
      this.activePage = numPage;
      this.moveToPage(numPage);
    },
    salaryParse(minSalary, maxSalary, salaryType) {
      if (!minSalary || !maxSalary) {
        return "Lamar untuk melihat gaji";
      }

      minSalary = String(minSalary);
      maxSalary = String(maxSalary);

      minSalary =
        minSalary.length > 6
          ? `${minSalary.slice(0, minSalary.length - 6)}`
          : `${minSalary.slice(0, minSalary.length - 3)} Ribu `;

      maxSalary =
        maxSalary.length > 6
          ? `${maxSalary.slice(0, maxSalary.length - 6)} Juta`
          : `${maxSalary.slice(0, maxSalary.length - 3)} Ribu`;

      salaryType = salaryType.toLowerCase();
      if (salaryType == "monthly") {
        salaryType = "Bulan";
      } else if (salaryType == "yearly") {
        salaryType = "Tahun";
      } else {
        salaryType = null;
      }

      return `IDR. ${minSalary} - ${maxSalary} ${
        salaryType ? "/ " + salaryType : ""
      }`;
    },
  },
  computed: {
    getJobs() {
      return this.$store.state.currentJobs.jobs;
    },
    getTotalJobs() {
      return this.$store.state.currentJobs.totalJobs;
    },
    getPagination() {
      let totalJobs = this.$store.state.currentJobs.totalJobs;
      let totalPages = Math.ceil(totalJobs / 12);
      let currentPage = this.activePage;
      let pageLeft = totalPages - currentPage;
    },
  },
  async mounted() {
    let page = this.$cookies.get("last-page");
    let searchQuery = this.$cookies.get("last-search");
    let isVocational = this.$cookies.get("is-vocational");

    if (page) this.activePage = parseInt(page);
    if (searchQuery) this.querySearch = searchQuery;
    if (isVocational) this.isVocational = Boolean(parseInt(isVocational));

    this.isLoading = true;
    await this.updateData();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.search-clear {
  right: 45px !important;
}

.search-clear > .icon {
  display: block;
  margin: auto auto;
  color: #868686;
  text-decoration: none;
}

.app-search {
  padding-top: 98px;
}
</style>
