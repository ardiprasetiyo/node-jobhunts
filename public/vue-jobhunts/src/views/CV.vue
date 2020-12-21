<template>
  <div>
    <section v-if="!isFetched && !isFetchError" class="review">
      <div class="container">
        <div class="col-12 col-lg-10 offset-lg-1">
          <div class="card app-card">
            <div class="card-body p-4">
              <h2 class="app-text-header-larger text-center text-poppins">
                Mohon tunggu sedang mencari data ...
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="!isFetched && isFetchError" class="review">
      <div class="container">
        <div class="col-12 col-lg-10 offset-lg-1">
          <div class="card app-card">
            <div class="card-body p-4 text-center">
              <h2 class="app-text-header-largest text-poppins">
                CV yang anda cari tidak tersedia
              </h2>
              <p class="app-text-subheader text-opensans">
                Link CV yang anda coba akses mungkin tidak valid atau tidak
                terdaftar di sistem kami
              </p>
              <a href="#!" class="app-nolink" @click="$router.push('/')"
                >Kembali Ke Beranda</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="review" v-if="isFetched && !isFetchError">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-10 offset-lg-1">
            <div class="card app-card">
              <div class="card-body p-5">
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <h2 class="app-text-header-largest text-poppins">
                        Curriculum Vitae
                      </h2>
                    </div>
                  </div>
                </div>

                <!-- Informasi Pribadi -->
                <div class="container mt-3">
                  <div class="row">
                    <div class="col-12 mb-4">
                      <h2 class="app-text-subheader text-poppins">
                        Informasi Pribadi
                      </h2>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div class="col-2 my-auto text-center">
                          <span class="material-icons my auto app-text-primary">
                            account_circle
                          </span>
                        </div>
                        <div class="col-10">
                          <p
                            class="app-text-header mb-0 mt-0 text-poppins my-auto"
                          >
                            Nama Lengkap
                          </p>
                        </div>
                        <div class="col-10 offset-2">
                          <h2 class="app-text-header text-opensans mb-3">
                            {{ candidate.fullname }}
                          </h2>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-2 my-auto text-center">
                          <span class="material-icons my-auto app-text-primary"
                            >place</span
                          >
                        </div>
                        <div class="col-10">
                          <p
                            class="app-text-header mb-0 mt-0 text-poppins my-auto"
                          >
                            Alamat
                          </p>
                        </div>
                        <div class="col-10 offset-2 mt-1">
                          <p class="app-text-header text-opensans">
                            {{ candidate.address.street }},
                            {{ candidate.address.city }},
                            {{ candidate.address.province }}.
                          </p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-2 my-auto text-center">
                          <span class="material-icons my-auto app-text-primary"
                            >phone</span
                          >
                        </div>
                        <div class="col-10">
                          <p
                            class="app-text-header mb-0 mt-0 text-poppins my-auto"
                          >
                            Nomor Telepon
                          </p>
                        </div>
                        <div class="col-10 offset-2 mt-1">
                          <p
                            class="mt-1 mb-1 app-text-header text-opensans"
                            v-for="(
                              phoneNumber, reviewPhoneNumberIndex
                            ) of candidate.phoneNumbers"
                            :key="reviewPhoneNumberIndex"
                          >
                            {{ phoneNumber }}
                          </p>
                        </div>
                      </div>

                      <div
                        class="row mt-3"
                        v-if="candidate.socialMedia.length > 0"
                      >
                        <div class="col-2 my-auto text-center">
                          <span class="material-icons my-auto app-text-primary"
                            >language</span
                          >
                        </div>
                        <div class="col-10">
                          <p
                            class="app-text-header mb-0 mt-0 text-poppins my-auto"
                          >
                            Social Media
                          </p>
                        </div>
                        <div class="col-10 offset-2 mt-1">
                          <div
                            class="row"
                            v-for="(
                              socialMedia, reviewSocialMediaIndex
                            ) of candidate.socialMedia"
                            :key="reviewSocialMediaIndex"
                          >
                            <div class="col-12">
                              <h2 class="app-text-header text-poppins">
                                {{ socialMedia.platform }}
                              </h2>
                            </div>
                            <div class="col-12">
                              <a
                                :href="socialMedia.link"
                                target="_blank"
                                class="text-opensans"
                              >
                                {{ socialMedia.link }}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Education -->
                <div class="container">
                  <div class="row">
                    <div class="col-12 mb-4 mt-4">
                      <h2 class="app-text-subheader text-poppins">
                        Riwayat Pendidikan
                      </h2>
                    </div>
                    <div class="col-12">
                      <div
                        class="row my-4"
                        v-for="(
                          education, educationReviewIndex
                        ) of getEducations"
                        :key="educationReviewIndex"
                      >
                        <div class="col-2 text-center">
                          <span class="app-text-primary material-icons my-auto"
                            >school</span
                          >
                        </div>
                        <div class="col-10">
                          <h2 class="app-text-header text-poppins">
                            {{ education.institution }}
                          </h2>
                          <h2 class="app-text-header text-opensans">
                            {{ education.specialization }}
                          </h2>
                          <h2 class="app-text-subheader">
                            {{
                              education.graduateDate
                                ? `Lulus pada ${education.graduateDate}`
                                : `Tidak Lulus`
                            }}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pengalaman Kerja -->
                <div
                  class="container"
                  v-if="candidate.experience.work.length > 0"
                >
                  <div class="row">
                    <div class="col-12 mb-4 mt-4">
                      <h2 class="app-text-subheader text-poppins">
                        Pengalaman Kerja
                      </h2>
                    </div>
                    <div class="col-12">
                      <div
                        class="row my-4"
                        v-for="(work, workReviewIndex) of getWorkExperiences"
                        :key="workReviewIndex"
                      >
                        <div class="col-2 text-center">
                          <span class="app-text-primary material-icons my-auto"
                            >work</span
                          >
                        </div>
                        <div class="col-10">
                          <h2 class="app-text-header text-poppins">
                            {{ work.role }}
                          </h2>
                          <h2 class="app-text-header text-opensans">
                            {{ work.companyName }}
                          </h2>
                          <h2 class="app-text-subheader">
                            {{ work.startDate }} - {{ work.endDate }}
                          </h2>
                          <h2 class="app-text-subheader mt-4">
                            {{ work.description }}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pengalaman Organisasi -->
                <div
                  class="container"
                  v-if="candidate.experience.volunteer.length > 0"
                >
                  <div class="row">
                    <div class="col-12 mb-4 mt-4">
                      <h2 class="app-text-subheader text-poppins">
                        Pengalaman Organisasi dan Komunitas
                      </h2>
                    </div>
                    <div class="col-12">
                      <div
                        class="row my-4"
                        v-for="(
                          volunteer, volunteerReviewIndex
                        ) of getVolunteerExperiences"
                        :key="volunteerReviewIndex"
                      >
                        <div class="col-2 text-center">
                          <span class="app-text-primary material-icons my-auto"
                            >groups</span
                          >
                        </div>
                        <div class="col-10">
                          <h2 class="app-text-header text-poppins">
                            {{ volunteer.role }}
                          </h2>
                          <h2 class="app-text-header text-opensans">
                            {{ volunteer.organizationName }}
                          </h2>
                          <h2 class="app-text-subheader">
                            {{ volunteer.startDate }} -
                            {{
                              volunteer.endDate ? volunteer.endDate : `Saat ini`
                            }}
                          </h2>
                          <h2 class="app-text-subheader mt-4">
                            {{ volunteer.description }}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pengalaman Organisasi -->
                <div class="container" v-if="candidate.skills.length > 0">
                  <div class="row">
                    <div class="col-12 mb-4 mt-4">
                      <h2 class="app-text-subheader text-poppins">Keahlian</h2>
                    </div>
                    <div class="col-12">
                      <div class="row my-4">
                        <div class="col-2 text-center">
                          <span class="app-text-primary material-icons my-auto"
                            >library_books</span
                          >
                        </div>
                        <div class="col-10">
                          <h2 class="app-text-header text-poppins">
                            <ul>
                              <li
                                class="app-text-subheader text-opensans"
                                v-for="(
                                  skill, skillReviewIndex
                                ) of candidate.skills"
                                :key="skillReviewIndex"
                              >
                                {{ skill }}
                              </li>
                            </ul>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      candidate: {},
      isFetchError: false,
      isFetched: false,
    };
  },
  methods: {
    parseMonth(number) {
      let monthMap = new Map();
      monthMap.set(0, "Januari");
      monthMap.set(1, "Februari");
      monthMap.set(2, "Maret");
      monthMap.set(3, "April");
      monthMap.set(4, "Mei");
      monthMap.set(5, "Juni");
      monthMap.set(6, "Juli");
      monthMap.set(7, "Agustus");
      monthMap.set(8, "September");
      monthMap.set(9, "Oktober");
      monthMap.set(10, "November");
      monthMap.set(11, "Desember");

      return monthMap.get(number);
    },
  },

  async mounted() {
    let cvId = this.$route.params.cvId;
    await this.$store.dispatch("getCv", { cvId: cvId });

    let cvData = this.$store.state.currentCv.data;
    if (!cvData) {
      this.isFetchError = true;
      return;
    }

    this.isFetched = true;
    this.candidate = cvData;
  },

  computed: {
    getEducations() {
      let educations = [...this.candidate.educations];
      let parsedEducations = [];
      for (let education of educations) {
        if (education.graduateDate) {
          education.graduateDate = `
          ${this.parseMonth(new Date(education.graduateDate).getMonth())} 
          ${new Date(education.graduateDate).getFullYear()}`;
        }
        parsedEducations.push(education);
      }

      return parsedEducations;
    },

    getWorkExperiences() {
      let works = [...this.candidate.experience.work];
      let parsedWorks = [];
      for (let work of works) {
        work.startDate = `
        ${this.parseMonth(new Date(work.startDate).getMonth())} 
        ${new Date(work.startDate).getFullYear()}`;

        work.endDate = `
        ${this.parseMonth(new Date(work.endDate).getMonth())} 
        ${new Date(work.endDate).getFullYear()}`;

        parsedWorks.push(work);
      }

      return parsedWorks;
    },

    getVolunteerExperiences() {
      let volunteers = [...this.candidate.experience.volunteer];
      let parsedVolunteers = [];
      for (let volunteer of volunteers) {
        volunteer.startDate = `
        ${this.parseMonth(new Date(volunteer.startDate).getMonth())} 
        ${new Date(volunteer.startDate).getFullYear()}`;

        if (volunteer.endDate) {
          volunteer.endDate = `
          ${this.parseMonth(new Date(volunteer.endDate).getMonth())} 
          ${new Date(volunteer.endDate).getFullYear()}`;
        }

        parsedVolunteers.push(volunteer);
      }

      return parsedVolunteers;
    },
  },
};
</script>

<style scoped>
.input-candidate,
.review {
  margin-top: 30px;
  margin-bottom: 40px;
}
.button-menu {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
