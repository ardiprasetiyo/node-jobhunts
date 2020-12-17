<template>
  <div class="home">
    <section class="app-navbar" style="z-index: ">
      <div class="fixed-top w-100 bg-white p-2 app-navbar-wrapper">
        <div class="row">
          <div class="col-6 d-block my-auto">
            <h1 class="app-navbar-title text-left text-poppins">Joobhunts</h1>
          </div>
          <div class="col-6">
            <img
              src="@/assets/icons/bookmark-active-icon.svg"
              class="app-icon d-block my-auto float-right"
            />
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
                      @keyup.enter="updateData()"
                    />
                  </div>
                  <div class="app-group-icon" @click="updateData()">
                    <img src="@/assets/icons/search-icon.svg" class="icon" />
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
                  ? `<b>${getTotalJobs}</b> Pekerjaan ditemukan
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
                    <span class="app-pils pils-bg-info mx-2 text-opensans">{{
                      capitalizeEachWord(job.type)
                    }}</span>
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
      console.log(numPage);
      if (
        numPage == 0 ||
        numPage >
          Math.ceil(this.$store.state.currentJobs.totalJobs / this.jobPerPage)
      )
        return;
      this.activePage = numPage;
      this.updateData();
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
    this.isLoading = true;
    await this.$store.dispatch("getJobs");
    this.isLoading = false;
  },
};
</script>

<style scoped>
.text-poppins {
  font-family: "Poppins", sans-serif;
}

.text-opensans {
  font-family: "Open Sans", sans-serif;
}

.app-navbar-wrapper {
  padding: 20px !important;
}

.app-navbar-title {
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  color: #414d68;
  margin: 0;
}

.app-icon {
  width: 36px;
}

.app-card {
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(233, 230, 230, 0.5);
  border-radius: 11px;
  height: 100%;
  transition: 0.3s;
}

.app-card:hover{
  box-shadow: 0px 14px 20px 2px rgb(165 163 163 / 40%)
}

.app-search {
  padding-top: 98px;
}

.app-text-disabled {
  color: #a9a9a9;
}

.app-text-header {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #414d68;
}

.app-text-header-larger {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #414d68;
}

.app-text-subheader {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #666f84;
}

.app-input-rounded {
  border-radius: 20px;
}

.app-input {
  background: #fbfbfb;
  border: 0.8px solid rgba(65, 77, 104, 0.18);
  box-sizing: border-box;
  padding: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #8f94a0;
}

.app-input-group-icon > .app-group-input {
  position: relative;
}

.app-input-group-icon > .app-group-input > input {
  padding-right: 56px;
}

.app-input-group-icon > .app-group-input > input:focus {
  background-color: white;
  box-shadow: 0px 3px 15px rgba(233, 230, 230, 0.5);
  border: 0.8px solid rgba(65, 77, 104, 0.18);
  color: #414d68;
}

.app-input-group-icon > .app-group-icon {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-right: 24px;
}

.app-pils {
  padding: 10px 20px 10px 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 84px;
}

.app-nolink{
  text-decoration: none;
}

.app-input-group-icon > .app-group-icon > .icon {
  width: 32px;
}

.pils-bg-info {
  background: linear-gradient(180deg, #0081ff 0%, #00b2ff 99.48%);
  color: white;
}

.pils-bg-success {
  background: linear-gradient(180deg, #00d23b 0%, #69ee00 100%);
  color: white;
}
</style>
