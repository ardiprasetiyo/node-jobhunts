<template>
  <div>
    <section class="app-navbar">
      <div class="fixed-top w-100 bg-white p-2 app-navbar-wrapper">
        <div class="row">
          <div class="col-2 d-block my-auto">
            <a
              href="#!"
              class="app-text-primary app-nolink"
              @click="$router.push('/')"
            >
              <span class="material-icons">arrow_back</span>
            </a>
          </div>
          <div class="col-8 d-block my-auto">
            <h1
              class="app-navbar-title text-center text-poppins"
              @click="$router.push('/')"
            >
              Joobhunts
            </h1>
          </div>
        </div>
      </div>
    </section>

    <section class="input-candidate" v-if="!isCompleted">
      <div class="container my-4" v-if="currentStep == 1">
        <div class="row text-center">
          <div class="col-lg-10 offset-lg-1 col-12">
            <h2 class="app-text-header-largest text-poppins">
              Selamat Datang!
            </h2>
            <p class="app-text-subheader text-opensans">
              Kami akan memandu CV kamu melalui beberapa pertanyaan berikut ini
            </p>
          </div>
        </div>
      </div>

      <form @submit.prevent="validate()">
        <div class="container">
          <div
            class="form-wrapper"
            v-for="(formInput, formInputIndex) of inputSchema"
            :key="formInputIndex"
          >
            <div class="row">
              <div class="col-12 col-lg-10 offset-lg-1">
                <div class="card app-card" v-if="currentStep == formInput.step">
                  <div class="card-body">
                    <!-- Appendable -->

                    <div class="row">
                      <div
                        class="col-12 col-lg-12 mb-4"
                        v-if="formInput.schemaName == 'phonenumber'"
                      >
                        <div class="card app-card">
                          <div class="card-body">
                            <div class="row">
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-if="candidate.phoneNumbers.length < 1"
                              >
                                <h3
                                  class="app-text-header text-poppins m-0 p-0"
                                >
                                  Anda Belum Menambahkan Nomor Telepon ( Wajib
                                  menambahkan minimal 1 nomor telepon aktif
                                  untuk melanjutkan)
                                </h3>
                              </div>
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-for="(
                                  phoneNumber, phoneNumberIndex
                                ) of candidate.phoneNumbers"
                                :key="phoneNumberIndex"
                              >
                                <div class="card app-card">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-10 col-lg-10 my-auto">
                                        {{ phoneNumber }}
                                      </div>
                                      <div class="col-2 col-lg-2 text-center">
                                        <a
                                          href="#!"
                                          class="app-nolink"
                                          @click="
                                            removePhoneNumber(phoneNumberIndex)
                                          "
                                        >
                                          <span
                                            class="material-icons app-text-error"
                                            >clear</span
                                          >
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-12 col-lg-12 mb-4"
                        v-if="formInput.schemaName == 'socialmedia'"
                      >
                        <div class="card app-card">
                          <div class="card-body">
                            <div class="row">
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-if="candidate.socialMedia.length < 1"
                              >
                                <h3
                                  class="app-text-header text-poppins m-0 p-0"
                                >
                                  Anda Belum Menambahkan Akun Social Media (
                                  Opsional )
                                </h3>
                              </div>
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-for="(
                                  socialMedia, socialMediaIndex
                                ) of candidate.socialMedia"
                                :key="socialMediaIndex"
                              >
                                <div class="card app-card">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-10 col-lg-10 my-auto">
                                        <span
                                          class="d-block app-text-header text-poppins"
                                        >
                                          {{ socialMedia.platform }}
                                        </span>
                                        <span
                                          class="d-block app-text-color-primary text-opensans small"
                                        >
                                          {{ socialMedia.link }}
                                        </span>
                                      </div>
                                      <div
                                        class="col-2 col-lg-2 my-auto mx-auto text-center"
                                      >
                                        <a href="#!" class="app-nolink">
                                          <span
                                            class="material-icons app-text-error"
                                            @click="
                                              removeSocialMedia(
                                                socialMediaIndex
                                              )
                                            "
                                            >clear</span
                                          >
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-12 col-lg-12 mb-4"
                        v-if="formInput.schemaName == 'education'"
                      >
                        <div class="card app-card">
                          <div class="card-body">
                            <div class="row">
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-if="candidate.educations.length < 1"
                              >
                                <h3
                                  class="app-text-header text-poppins m-0 p-0"
                                >
                                  Anda Belum Menambahkan Riwayat Pendidikan (
                                  Disarankan dimulai dari SMA/SMK )
                                </h3>
                              </div>
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-for="(
                                  education, educationIndex
                                ) of candidate.educations"
                                :key="educationIndex"
                              >
                                <div class="card app-card">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-10 col-lg-10 my-auto">
                                        <span
                                          class="d-block app-text-header text-poppins"
                                        >
                                          {{ education.specialization }}
                                        </span>
                                        <span
                                          class="d-block app-text-subheader text-opensans mt-1 mb-2"
                                        >
                                          {{ education.institution }}
                                        </span>
                                        <span
                                          class="d-block app-text-color-primary text-opensans small"
                                        >
                                          {{
                                            education.graduateDate
                                              ? `Lulus Pada ${education.graduateDate}`
                                              : `Tidak Lulus`
                                          }}
                                        </span>
                                      </div>
                                      <div
                                        class="col-2 col-lg-2 my-auto mx-auto text-center"
                                      >
                                        <a href="#!" class="app-nolink">
                                          <span
                                            class="material-icons app-text-error"
                                            @click="
                                              removeEducation(educationIndex)
                                            "
                                            >clear</span
                                          >
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-12 col-lg-12 mb-4"
                        v-if="formInput.schemaName == 'workexperience'"
                      >
                        <div class="card app-card">
                          <div class="card-body">
                            <div class="row">
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-if="candidate.experience.work.length < 1"
                              >
                                <h3
                                  class="app-text-header text-poppins m-0 p-0"
                                >
                                  Anda Belum Menambahkan Pengalaman Bekerja
                                </h3>
                              </div>
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-for="(work, workIndex) of candidate.experience
                                  .work"
                                :key="workIndex"
                              >
                                <div class="card app-card">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-10 col-lg-10 my-auto">
                                        <span
                                          class="d-block app-text-header text-poppins"
                                        >
                                          {{ work.role }}
                                        </span>
                                        <span
                                          class="d-block app-text-subheader text-opensans mt-1 mb-2"
                                        >
                                          {{ work.companyName }}
                                        </span>
                                        <span
                                          class="d-block text-opensans small"
                                        >
                                          {{ work.startDate }} -
                                          {{ work.endDate }}
                                        </span>

                                        <span
                                          class="d-block text-opensans app-text-primary small mt-2"
                                        >
                                          {{ work.description }}
                                        </span>
                                      </div>
                                      <div
                                        class="col-2 col-lg-2 my-auto mx-auto text-center"
                                      >
                                        <a href="#!" class="app-nolink">
                                          <span
                                            class="material-icons app-text-error"
                                            @click="removeWork(workIndex)"
                                            >clear</span
                                          >
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-12 col-lg-12 mb-4"
                        v-if="formInput.schemaName == 'volunteerexperience'"
                      >
                        <div class="card app-card">
                          <div class="card-body">
                            <div class="row">
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-if="candidate.experience.volunteer.length < 1"
                              >
                                <h3
                                  class="app-text-header text-poppins m-0 p-0"
                                >
                                  Anda Belum Menambahkan Pengalaman
                                  Organisasi/Komunitas
                                </h3>
                              </div>
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-for="(volunteer, volunteerIndex) of candidate
                                  .experience.volunteer"
                                :key="volunteerIndex"
                              >
                                <div class="card app-card">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-10 col-lg-10 my-auto">
                                        <span
                                          class="d-block app-text-header text-poppins"
                                        >
                                          {{ volunteer.role }}
                                        </span>
                                        <span
                                          class="d-block app-text-subheader text-opensans mt-1 mb-2"
                                        >
                                          {{ volunteer.organizationName }}
                                        </span>
                                        <span
                                          class="d-block text-opensans small"
                                        >
                                          {{ volunteer.startDate }} -
                                          {{
                                            volunteer.endDate
                                              ? `${volunteer.endDate}`
                                              : `Saat ini`
                                          }}
                                        </span>

                                        <span
                                          class="d-block text-opensans app-text-primary small mt-2"
                                        >
                                          {{ volunteer.description }}
                                        </span>
                                      </div>
                                      <div
                                        class="col-2 col-lg-2 my-auto mx-auto text-center"
                                      >
                                        <a href="#!" class="app-nolink">
                                          <span
                                            class="material-icons app-text-error"
                                            @click="
                                              removeVolunteer(volunteerIndex)
                                            "
                                            >clear</span
                                          >
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-12 col-lg-12 mb-4"
                        v-if="formInput.schemaName == 'skills'"
                      >
                        <div class="card app-card">
                          <div class="card-body">
                            <div class="row">
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-if="candidate.skills.length < 1"
                              >
                                <h3
                                  class="app-text-header text-poppins m-0 p-0"
                                >
                                  Anda Belum Menambahkan Keahlian Apapun ( Wajib
                                  menambahkan minimal 1 keahlian untuk
                                  melanjutkan)
                                </h3>
                              </div>
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-for="(skill, skillIndex) of candidate.skills"
                                :key="skillIndex"
                              >
                                <div class="card app-card">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-10 col-lg-10 my-auto">
                                        {{ skill }}
                                      </div>
                                      <div
                                        class="col-2 col-lg-2 text-center my-auto"
                                      >
                                        <a
                                          href="#!"
                                          class="app-nolink"
                                          @click="removeSkill(skillIndex)"
                                        >
                                          <span
                                            class="material-icons app-text-error"
                                            >clear</span
                                          >
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-12 col-lg-12 mb-4"
                        v-if="formInput.schemaName == 'achivements'"
                      >
                        <div class="card app-card">
                          <div class="card-body">
                            <div class="row">
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-if="candidate.achivements.length < 1"
                              >
                                <h3
                                  class="app-text-header text-poppins m-0 p-0"
                                >
                                  Anda Belum Menambahkan Penghargaan Apapun
                                </h3>
                              </div>
                              <div
                                class="col-12 col-lg-12 my-2"
                                v-for="(
                                  achivement, achivementIndex
                                ) of candidate.achivements"
                                :key="achivementIndex"
                              >
                                <div class="card app-card">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-10 col-lg-10 my-auto">
                                        <span
                                          class="d-block app-text-header text-poppins"
                                        >
                                          {{ achivement.title }}
                                        </span>
                                        <span
                                          class="d-block app-text-color-primary text-opensans small"
                                        >
                                          {{ achivement.description }}
                                        </span>
                                      </div>
                                      <div class="col-2 col-lg-2 text-center">
                                        <a
                                          href="#!"
                                          class="app-nolink"
                                          @click="
                                            removeAchivement(achivementIndex)
                                          "
                                        >
                                          <span
                                            class="material-icons app-text-error"
                                            >clear</span
                                          >
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-lg-12">
                        <h2 class="app-text-header-larger text-poppins">
                          {{ formInput.title }}
                        </h2>
                        <div
                          class="inputs"
                          v-for="(input, inputIndex) of formInput.inputs"
                          :key="inputIndex"
                        >
                          <label
                            class="app-text-subheader font-weight-bold text-opensans mt-3 ml-2 mb-3"
                            >{{ input.label }}</label
                          >
                          <div class="input-text" v-if="input.type == 'text'">
                            <input
                              type="text"
                              class="form-control app-input app-input-rounded"
                              :ref="input.name"
                              :placeholder="input.placeholder || ''"
                              :required="input.isRequired"
                              v-model="input.value"
                              autocomplete="off"
                            />
                          </div>

                          <div class="input-text" v-if="input.type == 'date'">
                            <input
                              type="date"
                              class="form-control app-input app-input-rounded"
                              :ref="input.name"
                              :placeholder="input.placeholder || ''"
                              :required="input.isRequired"
                              v-model="input.value"
                              autocomplete="off"
                            />
                          </div>

                          <div
                            class="input-text"
                            v-if="input.type == 'textarea'"
                          >
                            <textarea
                              class="form-control app-input app-input-rounded"
                              :ref="input.name"
                              :placeholder="input.placeholder || ''"
                              :required="input.isRequired"
                              v-model="
                                inputSchema[formInputIndex].inputs[inputIndex]
                                  .value
                              "
                              autocomplete="off"
                              rows="5"
                            ></textarea>
                          </div>

                          <span
                            class="app-text-error d-block mt-2"
                            :ref="input.name + '-error'"
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div
              class="col-12 col-lg-10 offset-lg-1 mt-3"
              v-if="
                inputSchema.filter(
                  (schema) => schema.step == this.currentStep
                )[0].formType == 'appendable-input'
              "
            >
              <div class="card app-card">
                <div class="card-body">
                  <a
                    @click="appendItem"
                    href="#!"
                    class="app-button app-background-success btn-block"
                  >
                    {{
                      inputSchema.filter(
                        (schema) => schema.step == this.currentStep
                      )[0].appendableLabel
                    }}
                  </a>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-10 offset-lg-1 my-3">
              <div class="card app-card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-6">
                      <a
                        href="#!"
                        class="app-button app-background-default btn-block"
                        @click="previousStep"
                      >
                        Kembali
                      </a>
                    </div>
                    <div class="col-6">
                      <button class="app-button app-background-info btn-block">
                        {{
                          inputSchema.length == currentStep
                            ? `Selesai`
                            : `Lanjut`
                        }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>

    <section class="review" v-if="isCompleted">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-10 offset-lg-1">
            <div class="card app-card">
              <div class="card-body p-5">
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <h2 class="app-text-header-largest text-poppins">
                        CV Kamu Berhasil Dibuat!
                      </h2>
                      <p class="app-text-subheader text-opensans">
                        Pastikan data kamu sudah sesuai.
                      </p>
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

    <section v-if="isCompleted">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-10 offset-lg-1 my-3">
            <div class="card app-card">
              <div class="card-body">
                <div class="row">
                  <div class="col-6 col-lg-6">
                    <a
                      href="#!"
                      class="app-button app-background-default btn-block button-menu"
                      @click="previousStep"
                    >
                      Kembali
                    </a>
                  </div>
                  <div class="col-6 col-lg-6">
                    <textarea style="display: none" ref="cvUrl"></textarea>
                    <button
                      class="app-button app-background-success btn-block button-menu"
                      @click="generateCV"
                    >
                      Buat/Update CV
                    </button>
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
      candidate: {
        fullname: "",
        address: {
          street: "",
          city: "",
          province: "",
        },
        phoneNumbers: [],
        socialMedia: [],
        educations: [],
        skills: [],
        experience: {
          work: [],
          volunteer: [],
        },
        achivements: [],
      },
      inputSchema: [
        {
          step: 1,
          schemaName: "fullname",
          title: "Siapa nama kamu?",
          process: "setFullname",
          formType: "normal",
          inputs: [
            {
              type: "text",
              label: "Nama Lengkap *",
              name: "app-input-fullname",
              value: "",
              placeholder: "Ketik nama lengkap kamu",
              validationRules: ["notEmpty", "stringOnly"],
            },
          ],
        },
        {
          step: 2,
          schemaName: "address",
          title: "Tinggal dimana kamu sekarang?",
          process: "setAddress",
          formType: "normal",
          inputs: [
            {
              type: "textarea",
              label: "Alamat *",
              name: "app-input-address-street",
              placeholder: "Ketik alamat tempat tinggal kamu",
              validationRules: ["notEmpty"],
            },
            {
              type: "text",
              label: "Kota *",
              name: "app-input-address-city",
              placeholder: "Ketik nama kota tempat tinggal kamu",
              validationRules: ["notEmpty"],
            },
            {
              type: "text",
              label: "Provinsi *",
              name: "app-input-address-province",
              value: "",
              placeholder: "Ketik nama provinsi tempat tinggal kamu",
              validationRules: ["notEmpty"],
            },
          ],
        },
        {
          step: 3,
          schemaName: "phonenumber",
          title: "Tambahkan nomor telepon kamu",
          process: "setPhoneNumber",
          formType: "appendable-input",
          appendableLabel: "Tambahkan Nomor Telepon",
          inputs: [
            {
              type: "text",
              label: "Tambahkan Nomor Telepon *",
              name: "app-input-phonenumber",
              value: "",
              placeholder: "Ketik nomor telepon kamu",
              validationRules: ["notEmpty", "numberOnly"],
            },
          ],
        },
        {
          step: 4,
          schemaName: "socialmedia",
          title: "Tambahkan akun sosial media kamu",
          process: "setSocialMedia",
          formType: "appendable-input",
          appendableLabel: "Tambahkan Akun Social Media",
          inputs: [
            {
              type: "text",
              label:
                "Platform Sosial Media * ( Misal Instagram, Facebook, LinkedIn )",
              name: "app-input-socialmedia-platform",
              value: "",
              placeholder: "Ketik platform social media kamu",
              validationRules: ["notEmpty"],
            },
            {
              type: "text",
              label: "Link Social Media *",
              name: "app-input-socialmedia-link",
              value: "",
              placeholder: "Ketik link akun social media kamu",
              validationRules: ["notEmpty", "isUrl"],
            },
          ],
        },
        {
          step: 5,
          schemaName: "education",
          title: "Tambahkan riwayat pendidikan kamu",
          process: "setEducation",
          formType: "appendable-input",
          appendableLabel: "Tambahkan Riwayat Pendidikan Kamu",
          inputs: [
            {
              type: "text",
              label:
                "Nama Institusi Pendidikan * (  Misal SMK Negeri 3 Bandung, Universitas Pendidikan Indonesia )",
              name: "app-input-education-institution",
              value: "",
              placeholder: "Ketik nama institusi pendidikan",
              validationRules: ["notEmpty"],
            },
            {
              type: "text",
              label: "Jurusan *",
              name: "app-input-education-specialization",
              value: "",
              placeholder: "Ketik nama jurusan yang kamu tempuh",
              validationRules: ["notEmpty"],
            },
            {
              type: "date",
              label: "Tanggal Kelulusan (Jika Lulus)",
              name: "app-input-education-graduateDate",
              value: "",
              placeholder: "",
              validationRules: [],
            },
          ],
        },
        {
          step: 6,
          schemaName: "workexperience",
          title: "Apakah kamu pernah bekerja/magang sebelumnya?",
          process: "setWorkExperience",
          formType: "appendable-input",
          appendableLabel: "Tambahkan Pengalaman Kerja Kamu",
          inputs: [
            {
              type: "text",
              label: "Nama Perusahaan *",
              name: "app-input-work-company",
              value: "",
              placeholder: "Ketik nama perusahaan",
              validationRules: ["notEmpty"],
            },
            {
              type: "text",
              label: "Posisi/Jabatan *",
              name: "app-input-work-role",
              value: "",
              placeholder: "Ketik posisi/jabatan di perusahaan",
              validationRules: ["notEmpty"],
            },
            {
              type: "date",
              label: "Tanggal Mulai Bekerja/Magang *",
              name: "app-input-work-startdate",
              value: "",
              placeholder: "",
              validationRules: ["notEmpty"],
            },
            {
              type: "date",
              label: "Tanggal Selesai Bekerja/Magang *",
              name: "app-input-work-enddate",
              value: "",
              placeholder: "",
              validationRules: ["notEmpty"],
            },
            {
              type: "textarea",
              label: "Deskripsikan Pekerjaan Kamu *",
              name: "app-input-work-description",
              value: "",
              placeholder: "Deskripsikan pekerjaan kamu di perusahaan",
              validationRules: ["notEmpty"],
            },
          ],
        },
        {
          step: 7,
          schemaName: "volunteerexperience",
          title:
            "Apakah kamu memiliki pengalaman organisasi/komunitas sebelumnya?",
          process: "setVolunteerExperience",
          formType: "appendable-input",
          appendableLabel: "Tambahkan Organisasi/Komunitas Kamu",
          inputs: [
            {
              type: "text",
              label: "Nama Organisasi *",
              name: "app-input-organization-name",
              value: "",
              placeholder: "Ketik nama organisasi/komunitas",
              validationRules: ["notEmpty"],
            },
            {
              type: "text",
              label: "Posisi/Jabatan di Organisasi *",
              name: "app-input-organization-role",
              value: "",
              placeholder: "Ketik posisi/jabatan kamu di organisasi",
              validationRules: ["notEmpty"],
            },
            {
              type: "date",
              label: "Tanggal Bergabung Organisasi *",
              name: "app-input-organization-startdate",
              value: "",
              placeholder: "",
              validationRules: ["notEmpty"],
            },
            {
              type: "date",
              label:
                "Tanggal Keluar Dari Organisasi (Kosongkan Jika Masih Aktif)",
              name: "app-input-organization-enddate",
              value: "",
              placeholder: "",
              validationRules: [],
            },
            {
              type: "textarea",
              label: "Deskripsikan Peran dan Pengalaman Kamu di Organisasi *",
              name: "app-input-organization-description",
              value: "",
              placeholder:
                "Deskripsikan peran dan pengalaman kamu di organisasi",
              validationRules: ["notEmpty"],
            },
          ],
        },
        {
          step: 8,
          schemaName: "skills",
          title: "Kemampuan apa saja yang kamu miliki?",
          process: "setSkills",
          formType: "appendable-input",
          appendableLabel: "Tambahkan Keahlian yang Kamu Miliki",
          inputs: [
            {
              type: "text",
              label: "Tambahkan Keahlian *",
              name: "app-input-skill",
              value: "",
              placeholder: "Ketik keahlian yang kamu miliki",
              validationRules: ["notEmpty"],
            },
          ],
        },
        {
          step: 9,
          schemaName: "achivements",
          title: "Penghargaan apa saja yang kamu miliki?",
          process: "setAchivements",
          formType: "appendable-input",
          appendableLabel: "Tambahkan Penghargaan yang Kamu Miliki",
          inputs: [
            {
              type: "text",
              label: "Judul Penghargaan *",
              name: "app-input-achivement-title",
              value: "",
              placeholder: "Ketik judul penghargaan yang kamu miliki",
              validationRules: ["notEmpty"],
            },
            {
              type: "textarea",
              label: "Deskripsi Penghargaan *",
              name: "app-input-achivement-description",
              value: "",
              placeholder:
                "Ketik peringkat dan deskripsi penghargaan yang kamu miliki",
              validationRules: ["notEmpty"],
            },
          ],
        },
      ],
      currentStep: 1,
      isCompleted: false,
    };
  },
  methods: {
    saveChanges() {
      let cachedData = new Object();
      cachedData.candidate = this.candidate;
      cachedData.inputSchema = this.inputSchema;
      cachedData.currentStep = this.currentStep;
      cachedData.isCompleted = this.isCompleted ? 1 : 0;
      localStorage.setItem(btoa("app-cache"), btoa(JSON.stringify(cachedData)));
    },
    inputValidator(rules, refName) {
      let validationResult = {
        ref: refName,
        isError: false,
        fieldErrors: [],
        reason: "",
      };

      if (!Array.isArray(rules) || !refName) {
        validationResult.isError = true;
        validationResult.reason = "Invalid data type";
        return validationResult;
      }

      let ref = this.$refs[refName];
      if (ref.length < 1) {
        validationResult.isError = true;
        validationResult.reason = "empty refs";
        return validationResult;
      }

      ref = ref[0];
      for (let rule of rules) {
        if (rule == "notEmpty") {
          let isEmpty = !ref.value;
          if (isEmpty) validationResult.fieldErrors.push("Tidak boleh kosong");
        }

        if (rule == "stringOnly") {
          let isStringOnly = ref.value.match(/^[a-zA-Z\s]*$/) || false;
          if (!isStringOnly)
            validationResult.fieldErrors.push("Hanya huruf yang diperbolehkan");
        }

        if (rule == "numberOnly") {
          let isNumberOnly = !isNaN(parseInt(ref.value)) || false;
          if (!isNumberOnly)
            validationResult.fieldErrors.push("Hanya angka yang diperbolehkan");
        }

        if (rule == "isUrl") {
          try {
            let isUrl = new URL(ref.value);
          } catch {
            validationResult.fieldErrors.push(
              "URL tidak valid. Misal https://linkedin.com/  "
            );
          }
        }
      }

      if (validationResult.fieldErrors.length > 0) {
        validationResult.isError = true;
        validationResult.reason = "invalid field";
      }
      return validationResult;
    },
    validateForm({ ...args }) {
      let schema = this.inputSchema.filter(
        (schema) => schema.step == this.currentStep
      );

      if (schema.length > 1 || schema.length < 1) {
        console.log(`Error No Schema`);
        return false;
      }

      // Get first schema
      schema = schema[0];

      // Reset all errors
      let inputErrorRefs = Object.keys(this.$refs).filter(
        (refName) => refName.search("error") > -1
      );

      for (let ref of inputErrorRefs) {
        try {
          let inputRefName = ref.split("-error")[0];
          let errorRef = this.$refs[ref][0];
          let inputRef = this.$refs[inputRefName][0];
          errorRef.innerHTML = "";
          inputRef.classList.remove("app-input-error");
        } catch {
          continue;
        }
      }

      let inputErrors = [];
      for (let input of schema.inputs) {
        let isValid = this.inputValidator(input.validationRules, input.name);
        if (isValid.isError) {
          inputErrors.push(isValid);
        }
      }

      let isSilentError = false;

      if (args.hasOwnProperty("silentError")) {
        if (args.silentError) {
          isSilentError = true;
        }
      }

      if (inputErrors.length > 0) {
        if (!isSilentError) {
          for (let errors of inputErrors) {
            let inputRef = this.$refs[`${errors.ref}`][0];
            let inputRefError = this.$refs[`${errors.ref}-error`][0];
            let errorMessage = "";
            for (let error of errors.fieldErrors) {
              errorMessage += ` ${error}, `;
            }
            inputRef.classList.add("app-input-error");
            inputRefError.innerHTML = errorMessage;
          }
        }
        return { isError: true, fieldErrors: inputErrors };
      }

      return { isError: false, schema: schema };
    },

    validate() {
      if (this.currentStep == 3) {
        if (this.candidate.phoneNumbers.length > 0) {
          this.nextStep();
          return;
        }
        alert("Anda harus mencantumkan nomor telepon");
        return;
      }

      if (this.currentStep == 4) {
        this.nextStep();
        return;
      }

      if (this.currentStep == 5) {
        if (this.candidate.educations.length > 0) {
          this.nextStep();
          return;
        }
        alert("Anda harus mencantumkan riwayat pendidikan");
        return;
      }

      if (this.currentStep == 6) {
        this.nextStep();
        return;
      }

      if (this.currentStep == 7) {
        this.nextStep();
        return;
      }

      if (this.currentStep == 8) {
        if (this.candidate.skills.length > 0) {
          this.nextStep();
          return;
        }
        alert("Anda harus mencantum skill");
        return;
      }

      if (this.currentStep == 9) {
        this.nextStep();
        return;
      }

      let validateResult = this.validateForm();
      if (!validateResult.isError) {
        let schema = validateResult.schema;
        if (schema.schemaName == "fullname") {
          this.candidate.fullname = schema.inputs[0].value;
          this.nextStep();
        }

        if (schema.schemaName == "address") {
          let street = schema.inputs[0].value;
          let city = schema.inputs[1].value;
          let province = schema.inputs[2].value;
          this.candidate.address.street = street;
          this.candidate.address.city = city;
          this.candidate.address.province = province;
          this.nextStep();
        }
      }
    },

    async generateCV(ev) {
      let cvData = this.candidate;
      let decryptedUid = atob(localStorage.getItem(btoa("app-uid")));
      let cvUrl = `${process.env.VUE_APP_API_SERVER_URL}/cv/${decryptedUid}`;

      cvData["cv_id"] = decryptedUid;

      let generateButton = ev.target;
      let defaultValue = generateButton.innerHTML;

      generateButton.innerHTML = "Tunggu Sebentar ...";
      await this.$store.dispatch("storeCv", { cvData: JSON.stringify(cvData) });
      await this.$store.dispatch("getCv", { cvId: decryptedUid });

      generateButton.innerHTML = defaultValue;
      if (this.$store.state.currentCv.data) {
        window.open(cvUrl);
        return;
      }

      alert("Terjadi kesalahan server");
    },

    async nextStep() {
      if (this.currentStep < this.inputSchema.length) {
        ++this.currentStep;
        this.saveChanges();
        window.scrollTo(0, 0);
      } else {
        this.isCompleted = true;
        this.saveChanges();
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        --this.currentStep;
        if (this.isCompleted) {
          this.isCompleted = false;
        }
        this.saveChanges();
        window.scrollTo(0, 0);
      } else {
        this.$router.push("/");
      }
    },
    appendItem() {
      let validateResult = this.validateForm();
      if (!validateResult.isError) {
        let schema = validateResult.schema;
        if (schema.schemaName == "phonenumber") {
          let phoneNumber = schema.inputs[0].value;
          let isDuplicate =
            this.candidate.phoneNumbers.filter(
              (number) => number == phoneNumber
            ).length > 0;

          if (isDuplicate) {
            alert("Kamu memasukan data yang sama");
            return;
          }
          this.candidate.phoneNumbers.push(phoneNumber);
        }

        if (schema.schemaName == "socialmedia") {
          let socialMediaPlatform = schema.inputs[0].value;
          let socialMediaLink = schema.inputs[1].value;

          let candidateSocialMedia = {
            platform: socialMediaPlatform,
            link: socialMediaLink,
          };
          let isDuplicate =
            this.candidate.socialMedia.filter(
              (socialMedia) =>
                socialMedia.platform.toLowerCase() ==
                  socialMediaPlatform.toLowerCase() &&
                socialMedia.link.toLowerCase() == socialMediaLink.toLowerCase()
            ).length > 0;

          if (isDuplicate) {
            alert("Kamu memasukan akun sosial media yang sama");
            return;
          }

          this.candidate.socialMedia.push(candidateSocialMedia);
        }

        if (schema.schemaName == "education") {
          let institution = schema.inputs[0].value;
          let specialization = schema.inputs[1].value;
          let graduateDate = schema.inputs[2].value || "";
          let isDuplicate =
            this.candidate.educations.filter(
              (education) =>
                education.institution.toLowerCase() ==
                  institution.toLowerCase() &&
                education.specialization.toLowerCase() ==
                  specialization.toLowerCase() &&
                education.graduateDate.toLowerCase() ==
                  graduateDate.toLowerCase()
            ).length > 0;

          let candidateEducations = {
            institution: institution,
            specialization: specialization,
            graduateDate: graduateDate,
          };

          if (isDuplicate) {
            alert("Kamu memasukan riwayat pendidikan yang sama");
            return;
          }

          this.candidate.educations.push(candidateEducations);
        }

        if (schema.schemaName == "workexperience") {
          let companyName = schema.inputs[0].value;
          let jobRole = schema.inputs[1].value;
          let jobStartDate = schema.inputs[2].value;
          let jobEndDate = schema.inputs[3].value;
          let jobDescription = schema.inputs[4].value;
          let isValidDate =
            new Date(jobEndDate).getTime() > new Date(jobStartDate).getTime();
          if (!isValidDate) {
            alert("Date invalid");
            return;
          }
          let candidateWorkExperience = {
            companyName: companyName,
            role: jobRole,
            startDate: jobStartDate,
            endDate: jobEndDate,
            description: jobDescription,
          };
          this.candidate.experience.work.push(candidateWorkExperience);
        }

        if (schema.schemaName == "volunteerexperience") {
          let organizationName = schema.inputs[0].value;
          let organizationRole = schema.inputs[1].value;
          let organizationStartDate = schema.inputs[2].value;
          let organizationEndDate = schema.inputs[3].value || "";
          let organizationDescription = schema.inputs[4].value;
          if (organizationEndDate) {
            let isValidDate =
              new Date(organizationEndDate).getTime() >
              new Date(organizationStartDate).getTime();
            if (!isValidDate) {
              alert("Date Invalid");
              return;
            }
          }

          let candidateOrganizationExperience = {
            organizationName: organizationName,
            role: organizationRole,
            startDate: organizationStartDate,
            endDate: organizationEndDate,
            description: organizationDescription,
          };
          this.candidate.experience.volunteer.push(
            candidateOrganizationExperience
          );
        }

        if (schema.schemaName == "skills") {
          let skill = schema.inputs[0].value;
          let isDuplicate =
            this.candidate.skills.filter((skills) => skills == skill).length >
            0;
          if (isDuplicate) {
            alert("Duplicate Input For Skill");
            return;
          }
          this.candidate.skills.push(skill);
        }

        if (schema.schemaName == "achivements") {
          let achivementTitle = schema.inputs[0].value;
          let achivementDescription = schema.inputs[1].value;
          let isDuplicate =
            this.candidate.achivements.filter(
              (achivement) =>
                achivement.title == achivementTitle &&
                achivement.description == achivementDescription
            ).length > 0;
          if (isDuplicate) {
            alert("Duplicate Achivement");
            return;
          }
          let candidateAchivement = {
            title: achivementTitle,
            description: achivementDescription,
          };
          this.candidate.achivements.push(candidateAchivement);
        }

        for (let [index, value] of Object.entries(
          validateResult.schema.inputs
        )) {
          validateResult.schema.inputs[index].value = "";
        }

        window.scrollTo(0, 0);
        this.saveChanges();
      }
    },
    removePhoneNumber(index) {
      delete this.candidate.phoneNumbers[index];
      this.candidate.phoneNumbers = this.candidate.phoneNumbers.filter(
        (phoneNumber) => phoneNumber
      );
      this.saveChanges();
    },

    removeSocialMedia(index) {
      delete this.candidate.socialMedia[index];
      this.candidate.socialMedia = this.candidate.socialMedia.filter(
        (socialMedia) => socialMedia
      );
      this.saveChanges();
    },

    removeEducation(index) {
      delete this.candidate.educations[index];
      this.candidate.educations = this.candidate.educations.filter(
        (education) => education
      );
      this.saveChanges();
    },
    removeWork(index) {
      delete this.candidate.experience.work[index];
      this.candidate.experience.work = this.candidate.experience.work.filter(
        (work) => work
      );
      this.saveChanges();
    },
    removeVolunteer(index) {
      delete this.candidate.experience.volunteer[index];
      this.candidate.experience.volunteer = this.candidate.experience.volunteer.filter(
        (volunteer) => volunteer
      );
      this.saveChanges();
    },
    removeSkill(index) {
      delete this.candidate.skills[index];
      this.candidate.skills = this.candidate.skills.filter((skill) => skill);
      this.saveChanges();
    },
    removeAchivement(index) {
      delete this.candidate.achivements[index];
      this.candidate.achivements = this.candidate.achivements.filter(
        (achivement) => achivement
      );
      this.saveChanges();
    },
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

  mounted() {
    let cachedData = localStorage.getItem(btoa("app-cache"));
    let uid = localStorage.getItem(btoa("app-uid"));

    if (!uid) {
      localStorage.setItem(btoa("app-uid"), btoa(new Date().getTime()));
    }

    if (cachedData) {
      cachedData = JSON.parse(atob(cachedData));
      this.candidate = cachedData.candidate;
      this.inputSchema = cachedData.inputSchema;
      this.currentStep = cachedData.currentStep;
      this.isCompleted = cachedData.isCompleted;
    }
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
  margin-top: 96px;
}
.button-menu {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
