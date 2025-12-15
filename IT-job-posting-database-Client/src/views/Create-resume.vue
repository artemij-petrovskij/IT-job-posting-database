<template>
  <v-main class="mx-3 py-5">
    <v-responsive class="align-center text-center">
      <v-card class="mx-auto" variant="text" max-width="900">
        <h3
          class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
        >
          Создать резюме
        </h3>
      </v-card>

      <v-container class="align-center text-center pl-0" max-width="900" >
        <!---->
        <!-- <v-form ref="form1" v-model="valid" lazy-validation autocomplete="on" @submit.prevent> -->
        <v-form  ref="form1" v-model="valid" lazy-validation @submit.prevent="submitForm">
          <v-autocomplete
            v-model="category"
            @update:modelValue="getCategoryId()"
            label="Категория"
            :rules="[rules.required]"
            :items="categories"
          ></v-autocomplete>
          <v-text-field
            v-model="title"
            label="Впишите желаемую должность"
            :rules="[rules.required]"
            hide-details
            required
          >
          </v-text-field>
          <v-textarea
            v-model="skills"
            label="Опишите свои навыки"
            :rules="[rules.required]"
            hide-details
            required
          >
          </v-textarea>
          <v-text-field
            v-model="salary"
            label="Впишите желаемую заработную плату"
            hide-details
            required
          >
          </v-text-field>
          <v-text-field v-model="description" label="о себе" hide-details required>
          </v-text-field>
          <v-text-field
            v-model="contacts"
            :rules="[rules.required]"
            label="Контакты:"
            hide-details
            required
          >
          </v-text-field>
          <v-btn
           
            class="mt-4"
            color="success"
            type="submit"
            :disabled="!valid"
            block
          >
            Создать резюме
          </v-btn>
        </v-form>

        <v-btn size="x-small" variant="plain"> *Обязательное поле </v-btn>
        <v-snackbar v-model="snackbar"> {{ snackbarMessage }}</v-snackbar>
      </v-container>
    </v-responsive>
  </v-main>
</template>

<script>
import { Advert } from "../services/advert.service.js";
import { Vacancy } from "../services/vacancy.service.js";

export default {
  data: () => ({
    type_of_document: null,
    //Создание резюме
    title: "",
    skills: "",
    salary: "",
    description: "",
    contacts: "",
    //
    categoryId: 1,
    categories: [], // all categories
    category: "",
    // OTHER STUFF///////////////////////////////////////////////////////////////////////////////

    valid: false,
    valid2: false,

    rules: {
      required: (value) => !!value || "Поле обязательно для заполнения",
    },
    snackbar: false,
    snackbarMessage: "",
  }),
  methods: {
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

    async createAdv() {
      if (this.title != null && this.skills != null) {
        let data = {
          title: this.title,
          skills: this.skills,
          salary: this.salary,
          description: this.description,
          contacts: this.contacts,
          categoryId: this.categoryId,
          /**STARTCONST **/
          // type_of_document: this.type_of_document,
          jwt: localStorage.getItem("jwt"),
          creator: localStorage.getItem("email"),
          modifeir: localStorage.getItem("email"),
          email: localStorage.getItem("email"),
          /**ENDCONST **/
        };
        let response = await Advert.createAdvert(data);
        if (response.err) {
          this.snackbar = true;
          this.snackbarMessage = response.err;
        } else {
          if (localStorage.getItem("jwt") != null) {
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("/resumes");
            }
          }
        }
      }
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
      }
    },
  },

  beforeCreate() {
    if (localStorage.getItem("jwt") == null) {
      this.$router.push("/");
    }
  },
  async created() {
    await this.loadMyAdverts();
  },
};
</script>
