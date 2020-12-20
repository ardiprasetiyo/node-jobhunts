<template>
  <div>
    <form @submit.prevent="validate()">
      <div class="container">
        <div
          class="form-wrapper"
          v-for="(formInput, formInputIndex) of inputSchema"
          :key="formInputIndex"
        >
          <div class="row">
            <div class="col-12">
              <div class="card app-card" v-if="currentStep == formInput.step">
                <div class="card-body">
                  <!-- Appendable -->

                  <div class="row">
                    <div
                      class="col-12 mb-4"
                      v-if="formInput.schemaName == 'phonenumber'"
                    >
                      <div class="card app-card">
                        <div class="card-body">
                          <div class="row">
                            <div
                              class="col-12 my-2"
                              v-if="candidate.phoneNumbers.length < 1"
                            >
                              <h3 class="app-text-header text-poppins m-0 p-0">
                                Anda Belum Menambahkan Nomor Telepon ( Wajib
                                menambahkan minimal 1 nomor telepon aktif untuk
                                melanjutkan)
                              </h3>
                            </div>
                            <div
                              class="col-12 my-2"
                              v-for="(
                                phoneNumber, phoneNumberIndex
                              ) of candidate.phoneNumbers"
                              :key="phoneNumberIndex"
                            >
                              <div class="card app-card">
                                <div class="card-body">
                                  <div class="row">
                                    <div class="col-10 my-auto">
                                      {{ phoneNumber }}
                                    </div>
                                    <div class="col-2 text-center">
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
                      class="col-12 mb-4"
                      v-if="formInput.schemaName == 'socialmedia'"
                    >
                      <div class="card app-card">
                        <div class="card-body">
                          <div class="row">
                            <div
                              class="col-12 my-2"
                              v-if="candidate.socialMedia.length < 1"
                            >
                              <h3 class="app-text-header text-poppins m-0 p-0">
                                Anda Belum Menambahkan Akun Social Media (
                                Opsional )
                              </h3>
                            </div>
                            <div
                              class="col-12 my-2"
                              v-for="(
                                socialMedia, socialMediaIndex
                              ) of candidate.socialMedia"
                              :key="socialMediaIndex"
                            >
                              <div class="card app-card">
                                <div class="card-body">
                                  <div class="row">
                                    <div class="col-10 my-auto">
                                      <span
                                        class="d-block app-text-header text-poppins"
                                      >
                                        {{ socialMedia.username }}
                                      </span>
                                      <span
                                        class="d-block app-text-subheader text-opensans mt-1 mb-1"
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
                                      class="col-2 my-auto mx-auto text-center"
                                    >
                                      <a href="#!" class="app-nolink">
                                        <span
                                          class="material-icons app-text-error"
                                          @click="
                                            removeSocialMedia(socialMediaIndex)
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
                      class="col-12 mb-4"
                      v-if="formInput.schemaName == 'education'"
                    >
                      <div class="card app-card">
                        <div class="card-body">
                          <div class="row">
                            <div
                              class="col-12 my-2"
                              v-if="candidate.educations.length < 1"
                            >
                              <h3 class="app-text-header text-poppins m-0 p-0">
                                Anda Belum Menambahkan Riwayat Pendidikan (
                                Disarankan dimulai dari SMA/SMK )
                              </h3>
                            </div>
                            <div
                              class="col-12 my-2"
                              v-for="(
                                education, educationIndex
                              ) of candidate.educations"
                              :key="educationIndex"
                            >
                              <div class="card app-card">
                                <div class="card-body">
                                  <div class="row">
                                    <div class="col-10 my-auto">
                                      <span
                                        class="d-block app-text-header text-poppins"
                                      >
                                        {{ education.specialization }}
                                      </span>
                                      <span
                                        class="d-block app-text-subheader text-opensans mt-1 mb-1"
                                      >
                                        {{ education.institution }}
                                      </span>
                                      <span
                                        class="d-block app-text-color-primary text-opensans small"
                                      >
                                        Lulus pada {{ education.graduateDate }}
                                      </span>
                                    </div>
                                    <div
                                      class="col-2 my-auto mx-auto text-center"
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
                    <div class="col-12">
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

                        <div class="input-text" v-if="input.type == 'textarea'">
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
            class="col-12 mt-3"
            v-if="
              inputSchema.filter((schema) => schema.step == this.currentStep)[0]
                .formType == 'appendable-input'
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

          <div class="col-12 my-3">
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
                      Lanjut
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
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
              label: "Username Sosial Media *",
              name: "app-input-socialmedia-username",
              value: "",
              placeholder: "Ketik username akun social media kamu",
              validationRules: ["notEmpty"],
            },
            {
              type: "text",
              label: "Link Social Media *",
              name: "app-input-socialmedia-link",
              value: "",
              placeholder: "Ketik link akun social media kamu",
              validationRules: ["notEmpty"],
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
              label: "Tanggal Kelulusan *",
              name: "app-input-education-graduateDate",
              value: "",
              placeholder: "",
              validationRules: ["notEmpty"],
            },
          ],
        },
      ],
      currentStep: 1,
      totalStep: 8,
    };
  },
  methods: {
    saveChanges() {
      let cachedData = new Object();
      cachedData.candidate = this.candidate;
      cachedData.inputSchema = this.inputSchema;
      cachedData.currentStep = this.currentStep;
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
          if (!isStringOnly) {
            validationResult.fieldErrors.push("Hanya huruf yang diperbolehkan");
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
        alert("No DAta Inputted");
        return;
      }

      if (this.currentStep == 4) {
        this.nextStep();
        return;
      }

      if (this.currentStep == 5) {
        if (this.candidate.educations.length > 0) {
          // this.nextStep();
          return;
        }
        alert("No Education Data Inputted");
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

    nextStep() {
      if (this.currentStep < this.totalStep) {
        ++this.currentStep;
        this.saveChanges();
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        --this.currentStep;
        this.saveChanges();
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
            alert("Theres an duplicate");
            return;
          }
          this.candidate.phoneNumbers.push(phoneNumber);
        }

        if (schema.schemaName == "socialmedia") {
          let socialMediaPlatform = schema.inputs[0].value;
          let socialMediaUsername = schema.inputs[1].value;
          let socialMediaLink = schema.inputs[2].value;

          let candidateSocialMedia = {
            platform: socialMediaPlatform,
            username: socialMediaUsername,
            link: socialMediaLink,
          };
          let isDuplicate =
            this.candidate.socialMedia.filter(
              (socialMedia) =>
                socialMedia.platform.toLowerCase() ==
                  socialMediaPlatform.toLowerCase() &&
                socialMedia.username.toLowerCase() ==
                  socialMediaUsername.toLowerCase() &&
                socialMedia.link.toLowerCase() == socialMediaLink.toLowerCase()
            ).length > 0;

          if (isDuplicate) {
            alert("Theres an Duplicate Account");
            return;
          }

          this.candidate.socialMedia.push(candidateSocialMedia);
        }

        if (schema.schemaName == "education") {
          let institution = schema.inputs[0].value;
          let specialization = schema.inputs[1].value;
          let graduateDate = schema.inputs[2].value;
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
            alert("Theres an Duplicate");
            return;
          }

          this.candidate.educations.push(candidateEducations);
          this.saveChanges();
        }

        for (let [index, value] of Object.entries(
          validateResult.schema.inputs
        )) {
          validateResult.schema.inputs[index].value = "";
        }
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
  },

  mounted() {
    let cachedData = localStorage.getItem(btoa("app-cache"));
    if (cachedData) {
      cachedData = JSON.parse(atob(cachedData));
      this.candidate = cachedData.candidate;
      this.inputSchema = cachedData.inputSchema;
      this.currentStep = cachedData.currentStep;
    }
  },
};
</script>

<style scoped>
</style>
