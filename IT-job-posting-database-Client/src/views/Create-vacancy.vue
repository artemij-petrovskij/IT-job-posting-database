<template>
  <!-- class="fill-height" -->
  <v-container>
    <!-- <v-btn :href="`/edit-advert?_id=`">Comfortable Button</v-btn>
            <v-btn to="/edit-advert">Comfortable Button</v-btn> -->

    <v-fade-transition>
      <div v-if="show" class="my-box">
        <v-card
          title="Создать вакансию"
          class="mx-auto"
          max-width="900"
          variant="outlined"
        >
          <v-container class="align-center text-center">
            <v-form
              ref="form1"
              v-model="valid"
              lazy-validation
              @submit.prevent="submitForm"
            >
              <v-autocomplete
                v-model="category"
                @update:modelValue="getCategoryId()"
                label="Категория*"
                :rules="[rules.required]"
                :items="categories"
              ></v-autocomplete>
              <!-- 
              <v-autocomplete
                v-model="company"
                @update:modelValue="getCompanyId()"
                label="Компания*"
                :rules="[rules.required]"
                :items="companies"
              ></v-autocomplete> -->

              <v-autocomplete
               disabled
                v-model="companyName"
                label="Компания*"
                :rules="[rules.required]"
                :items="companies"
              ></v-autocomplete>

              <v-text-field
                v-model="title"
                label="Название вакансии*"
                :rules="[rules.required]"
                hide-details
                required
              >
              </v-text-field>

              <v-text-field
                v-model="description"
                label="Описание*"
                :rules="[rules.required]"
                hide-details
                required
              >
              </v-text-field>

              <v-text-field
                v-model="salary"
                label="Заработная плата"
                hide-details
                required
              >
              </v-text-field>

              <v-autocomplete
                v-model="requirements"
                label="Опыт работы*"
                :rules="[rules.required]"
                :items="[
                  'Не имеет значения',
                  'Нет опыта',
                  'От 1 года до 3 лет',
                  'От 3 до 6 лет',
                  'Более 6 лет',
                ]"
              ></v-autocomplete>
              {{ location }}
              <v-autocomplete
                v-model="location"
                label="Местанохождение"
                :rules="[rules.required]"
                :items="[
                  'Минск',
                  'Минская область',
                  'Брест',
                  'Витебск',
                  'Гомель',
                  'Гродно',
                  'Могилев',
                ]"
              ></v-autocomplete>

              <v-btn class="mt-5" color="success" type="submit" :disabled="!valid" block>
                Создать вакансию
              </v-btn>
            </v-form>

            <v-btn size="x-small" variant="plain"> *Обязательное поле </v-btn>
            <v-snackbar v-model="snackbar"> {{ snackbarMessage }}</v-snackbar>
          </v-container>
        </v-card>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { Vacancy } from "../services/vacancy.service.js";
import { ref } from "vue";

// const step = ref(1)
// const items = ref(['Aasf', 'B', 'C'])
// const textInput = ref()

export default {
  data: () => ({
    categoryId: 1,
    companyId: localStorage.getItem("companyId"),
    companyName: localStorage.getItem("companyName"),
    //form data
    step: ref(1),
    items: ref(["Выберите компанию", "Выберите категорию", "C"]),
    textInput: ref(),

    categories: [], // all categories
    companies: [], // all companies

    category: "",
    company: "",
    //Компания
    company_name: "",
    company_description: "",
    //Создание резюме
    title: "",
    description: "",
    salary: "",
    description: "",
    salary: "",
    requirements: "",
    location: "",

    show: false,
    valid: false,
    valid2: false,
    step: 1,
    validStep1: false,
    validStep2: false,
    rules: {
      required: (value) => !!value || "Поле обязательно для заполнения",
    },
    snackbar: false,
    snackbarMessage: "",
  }),
  methods: {
    validate() {
      if (this.textInput != "x") {
        this.step--;
      } else {
      }
    },
    submitForm() {
      if (this.valid) {
        this.createAdv();
      }
    },

    async getCategoryId(e) {
      const array = this.categories;
      const found = array.find((element) => {
        return element.title == this.category;
      });
      this.categoryId = found.id;
    },
    async getCompanyId(e) {
      const array = this.companies;
      const found = array.find((element) => {
        return element.title == this.company;
      });
      this.companyId = found.id;
    },

    async loadMyAdverts() {
      let data = {
        email: localStorage.getItem("email"),
      };
      let response = await Vacancy.allVacancies(data);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        //this.items = response.vacancies.reverse();

        const categoriesId = response.categories.map((x) => {
          return { title: x.name, id: x.id };
        });
        this.categories = categoriesId;

        const companiesId = response.companies.map((x) => {
          return { title: x.name, id: x.id };
        });

        this.companies = companiesId;
        setTimeout(() => {
          this.show = true;
        }, 300);

        console.log(companiesId);
      }
    },

    async createAdv() {
      if (this.title != null && this.description != null) {
        let data = {
          title: this.title,
          description: this.description,
          categoryId: this.categoryId,
          companyId: localStorage.getItem("companyId"),
          description: this.description,
          salary: this.salary,
          requirements: this.requirements,
          location: this.location,
          /**STARTCONST **/
          // type_of_document: this.type_of_document,
          jwt: localStorage.getItem("jwt"),
          creator: localStorage.getItem("email"),
          modifeir: localStorage.getItem("email"),
          email: localStorage.getItem("email"),
          /**ENDCONST **/
        };

        let response = await Vacancy.createVacancy(data);

        if (response.err) {
          this.snackbar = true;
          this.snackbarMessage = response.err;
        } else {
          if (localStorage.getItem("jwt") != null) {
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("/vacancies");
            }
          }
        }
      }
    },
  },

  beforeCreate() {
    if (localStorage.getItem("jwt") == null) {
      this.$router.push("/");
    }
  },

  nextStep() {
    if (this.step === 1) {
      this.$refs.formStep1.validate();
      if (this.validStep1) this.step++;
    } else if (this.step === 2) {
      this.$refs.formStep2.validate();
      if (this.validStep2) this.step++;
    }
  },
  prevStep() {
    this.step--;
  },
  async created() {
    await this.loadMyAdverts();
  },
};
</script>
