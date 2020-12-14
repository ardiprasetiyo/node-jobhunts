<template>
  <div class="home p-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div class="row">
            <div class="col-12 col-lg-12">
              <h1 class="font-weight-bolder">Joobhunts</h1>
              <p class="font-weight-bolder">
                Cari Qerja Gak Sesulit Cari Jodoh
              </p>
              <div class="row">
                <div class="col-12 px-2">
                  <div class="input-grouping">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Masukan kata kunci pekerjaan"
                      ref="searchbar"
                      @keyup.enter="searchQuery"
                    />
                    <div class="icon-wrapper">
                      <i
                        class="material-icons icon icon-info"
                        @click="searchQuery"
                        >search</i
                      >
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-3">
                  <p
                    class="m-0"
                    v-if="!isLoading"
                    v-html="
                      getJobs.totalJobs > 0
                        ? `<b>${getJobs.totalJobs}</b> pekerjaan
                    ditemukan`
                        : `tidak ada pekerjaan`
                    "
                  ></p>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-2 mb-2" v-if="isLoading">
            <div class="col-12 col-lg-12 col-sm-12 col-md-12">
              <h3 class="text-center">Tunggu Sebentar Napa ...</h3>
              <p class="text-center">
                Ikan hiu makan udang, tunggu sebentar dang
              </p>
            </div>
          </div>

          <div class="row mt-2" v-if="!isLoading">
            <div class="col-12 col-lg-12 col-md-12 col-sm-12">
              <div class="row mt-2 mb-4">
                <div
                  class="col-12 col-lg-4 mb-4"
                  v-for="(job, jobIndex) in getJobs.jobs"
                  @click="showDetailJob(job._id)"
                  :key="jobIndex"
                >
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
                        <div
                          class="col-3 col-lg-3 col-md-2 col-sm-2 col-xs-2 mb-3"
                        >
                          <img
                            :src="job.company.logo"
                            alt=""
                            class="img img-fluid rounded-circle mx-auto d-block"
                          />
                        </div>
                        <div class="col-8">
                          <h5>{{ job.title }}</h5>
                          <p>{{ job.company.name }}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <h6>
                            {{
                              job.type
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")
                            }}

                            {{
                              job.location_detail.length > 0
                                ? `- ${job.location_detail[0].name}`
                                : ""
                            }}
                          </h6>
                          <h6>
                            {{
                              job.salary.min && job.salary.max
                                ? `IDR ${new Intl.NumberFormat().format(
                                    job.salary.min
                                  )} - ${new Intl.NumberFormat().format(
                                    job.salary.max
                                  )}`
                                : ``
                            }}
                          </h6>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 pt-2 pb-2">
                          <p
                            v-html="job.description.substr(0, 100) + '...'"
                          ></p>
                        </div>

                        <div class="col-12">
                          <span
                            v-if="job.is_vocational"
                            class="badge badge-success mr-2 p-2 mb-2"
                            >SMA/SMK</span
                          >
                          <span
                            class="badge badge-info mr-2 p-2 mb-2"
                            v-for="(tag, tagIndex) in job.tags"
                            :key="tagIndex"
                            >{{ tag }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12" v-if="getJobs.totalJobs > 0 && !isLoading">
          <nav aria-label="...">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#!"
                  tabindex="-1"
                  @click="
                    toPage(
                      getPagination.filter((page) => page.isActive)[0].pageNum -
                        1
                    )
                  "
                  >Mundur</a
                >
              </li>
              <li
                v-for="(page, pageIndex) of getPagination"
                :key="pageIndex"
                :class="{ 'page-item': true, active: page.isActive }"
              >
                <a class="page-link" href="#!" @click="toPage(page.pageNum)">{{
                  page.pageNum
                }}</a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#!"
                  @click="
                    toPage(
                      getPagination.filter((page) => page.isActive)[0].pageNum +
                        1
                    )
                  "
                  >Maju</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSwal from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSwal);

export default {
  name: "Home",
  data() {
    return {
      activePage: 1,
      querySearch: "",
      isLoading: true,
    };
  },
  methods: {
    async searchQuery(ev) {
      let query = this.$refs.searchbar.value;
      this.querySearch = query;
      this.activePage = 1;
      this.isLoading = true;
      await this.$store.dispatch("getJobs", {
        searchQuery: this.querySearch,
        page: this.activePage,
      });
      this.isLoading = false;
    },

    toPage(pageNum) {
      let totalJobs = this.$store.state.currentJobs.totalJobs;
      if (pageNum > Math.ceil(totalJobs / 12) || pageNum == 0) return;

      this.activePage = pageNum;
      this.$store.dispatch("getJobs", {
        searchQuery: this.querySearch,
        page: this.activePage,
      });

      window.scrollTo(0, 0);
    },

    showDetailJob(jobId) {
      let jobs = this.getJobs.jobs;
      let job = jobs.filter((job) => job._id == jobId);
      let jobDetail = job[0];

      let jobTitle = jobDetail.title;
      let jobDescription = jobDetail.description;
      let jobType = jobDetail.type;
      let jobVocational = jobDetail.is_vocational;
      let jobSalaryRange =
        jobDetail.salary.min && jobDetail.salary.max
          ? `IDR ${new Intl.NumberFormat().format(jobDetail.salary.min)} 
            - ${new Intl.NumberFormat().format(jobDetail.salary.max)}`
          : ``;
      let vocationalCategory =
        jobDetail.category_detail.length > 0
          ? jobDetail.category_detail[0].name
          : ``;
      let jobLocation =
        jobDetail.location_detail.length > 0
          ? jobDetail.location_detail[0].name
          : ``;
      let companyName = jobDetail.company.name;

      this.$swal
        .fire({
          html: `
          <div class="row">
            <div class="col-12 col-lg-12 col-md-12 col-sm-12">
              <h3 class="text-poppins mb-4">${jobTitle}</h3>
              <h6 class="text-opensans">${jobSalaryRange}</h6>
              <p class="text-opensans" style="font-size: 16px">${companyName} <br> ${jobType} ${
            jobLocation ? `- ${jobLocation}` : ``
          }</p>
              <p class="text-opensans mb-4" style="font-size: 16px">${
                jobVocational && vocationalCategory
                  ? `Direkomendasikan untuk jurusan <b>` +
                    vocationalCategory +
                    `</b>`
                  : ``
              }</p>
              <div class="row">
                <div class="col-12 col-lg-12 col-md-12 col-sm-12" style="font-size: 16px">
                  ${jobDescription}
                </div>
              </div>

            </div>
          </div>
        `,
          showCloseButton: true,
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: `Lamar Sekarang Di ${
            jobDetail.job_source.split("")[0].toUpperCase() +
            jobDetail.job_source.slice(1)
          }`,
          cancelButtonText: "Kembali",
          width: "100%",
        })
        .then((data) => {
          if (data.isConfirmed) window.open(jobDetail.job_url, "_blank");
        });
    },
  },
  computed: {
    getJobs() {
      return this.$store.state.currentJobs;
    },
    getPagination() {
      let page = this.activePage;
      let totalJobs = this.$store.state.currentJobs.totalJobs;
      let pages = [];

      if (page - 1 == 0) ++page;
      if (page + 1 == Math.ceil(totalJobs / 12) + 1) --page;

      pages.push({ pageNum: page - 1 });
      pages.push({ pageNum: page });
      pages.push({ pageNum: page + 1 });

      pages.map((page) =>
        page.pageNum == this.activePage
          ? (page.isActive = true)
          : (page.isActive = false)
      );

      return pages;
    },
  },
  async created() {
    await this.$store.dispatch("getJobs");
    this.isLoading = false;
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0px 8px 15px -10px #696b6d73;
}

.text-poppins {
  font-family: "Poppins", sans-serif;
}

.text-opensans {
  font-family: "Open Sans", sans-serif;
}

p {
  font-size: 14px !important;
}
.input-grouping > .icon-wrapper {
  position: absolute;
  display: flex;
  height: 100%;
  padding-right: 24px;
  padding-left: 24px;
  top: 0;
  right: 0;
}

.text-grey {
  color: #676767;
}

.input-grouping > input {
  padding-right: 48px;
  height: 46px;
}

input {
  background-color: #f1f3f9;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

input:focus {
  border: solid 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 11px -10px #696c7545;
}

.icon-info {
  color: #878ba2;
}

.icon-wrapper > .icon {
  display: block;
  margin: auto auto;
  text-align: center;
}
</style>
