<template>
  <!-- class="fill-height" -->
  <v-container>
    <v-fade-transition>
      <div v-if="show" class="my-box">
        <v-responsive class="align-center">
          <!-- <v-btn :href="`/edit-advert?_id=`">Comfortable Button</v-btn>
            <v-btn to="/edit-advert">Comfortable Button</v-btn> -->
          <v-card
            title="Добавить отзыв компании"
            class="mx-auto"
            max-width="700"
            variant="outlined"
          >
            <v-container class="align-center">
              <!---->
              <!-- <v-form ref="form1" v-model="valid" lazy-validation autocomplete="on" @submit.prevent> -->
              <v-form
                ref="form1"
                v-model="valid"
                lazy-validation
                @submit.prevent="submitForm"
              >
                <v-autocomplete
                  v-model="company"
                  @update:modelValue="getCompanyId()"
                  label="Компания*"
                  :rules="[rules.required]"
                  :items="companies"
                ></v-autocomplete>

                <v-text-field
                  v-model="companyFeebackComment"
                  label="Комментарий"
                  :rules="[rules.required]"
                  hide-details
                  required
                >
                </v-text-field>

                <v-container
                  class="d-flex justify-center align-center"
                  style="height: 50px"
                >
                  <v-rating
                    class="align-center"
                    v-model="rating"
                    :length="5"
                    color="primary"
                    background-color="grey"
                  ></v-rating>
                </v-container>

                <v-container
                  class="d-flex justify-center align-center"
                  style="height: 50px"
                >
                  Рейтинг {{ rating }} из 5
                </v-container>

                <v-btn
                  density="comfortable"
                  class="mt-4"
                  color="success"
                  type="submit"
                  :disabled="!valid"
                  block
                >
                  Добавить отзыв
                </v-btn>
              </v-form>

              <v-btn size="x-small" variant="plain"> *Обязательное поле </v-btn>
              <v-snackbar v-model="snackbar"> {{ snackbarMessage }}</v-snackbar>
            </v-container>
          </v-card>

          <v-card class="mx-auto mt-4" max-width="700" variant="outlined">
            <v-card title="Последние отзывы" class="mx-auto" max-width="700">
              <v-list lines="one">
                <v-list-item
                  v-for="(item, i) in feebacks"
                  :key="i"
                  :title="item.title"
                  :subtitle="item.comment"
                >
                  <p style="font-weight: bold">
                    Отзыв пользователя {{ item.user }} на компанию {{ item.company }}
                  </p>
                  <p>{{ item.comment }}</p>
                  <!-- {{ item }} -->
                  Оценка пользователя: {{ item.rating }}/5
                  <br />
                  <v-rating
                    class="align-center"
                    :model-value="item.rating"
                    :length="5"
                    color="primary"
                    background-color="grey"
                  ></v-rating>
                  <v-spacer></v-spacer>
                  <v-divider></v-divider>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card>
        </v-responsive>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { Advert } from "../services/advert.service.js";
import { Vacancy } from "../services/vacancy.service.js";

export default {
  data: () => ({
    type_of_document: null,
    //Создание резюме
    name: "",
    description: "",
    //
    feebacks: [],
    companies: [],
    categoryId: 1,
    categories: [], // all categories
    category: "",

    valid: false,
    valid2: false,

    show: false,

    rules: {
      required: (value) => !!value || "Поле обязательно для заполнения",
    },
    snackbar: false,
    snackbarMessage: "",

    feedBackCompanyId: null,
    companyFeebackComment: null,
    rating: 5,
  }),
  methods: {
    // async getCompanyId(e) {
    //     const array = this.companies;
    //     const found = array.find((element) => {
    //         return element.title == this.company
    //     });
    //     this.companyId = found.id
    //     console.log(found.id + ' 1')
    // },
    submitForm() {
      if (this.valid) {
        this.createAdv();
        this.loadMyAdverts()
        this.companyFeebackComment=null
      }
    },
    async getCompanyId(e) {
      const array = this.companies;
      const found = array.find((element) => {
        return element.title == this.company;
      });
      this.feedBackCompanyId = found.id;

      console.log(found.id + " 2");
    },

    async createAdv() {
      let data = {
        companyFeebackComment: this.companyFeebackComment,
        raiting: this.rating,
        email: localStorage.getItem("email"),
        feedBackCompanyId: this.feedBackCompanyId,

        //categoryId: this.categoryId,
        /**STARTCONST **/
        // type_of_document: this.type_of_document,
        jwt: localStorage.getItem("jwt"),
        creator: localStorage.getItem("email"),
        modifeir: localStorage.getItem("email"),
        email: localStorage.getItem("email"),
        /**ENDCONST **/
      };
      let response = await Vacancy.companyFeedback(data);
      
      if (response.err) {
        //  this.snackbar = true;
        this.snackbarMessage = response.err;
      } else {
        if (localStorage.getItem("jwt") != null) {
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.loadMyAdverts();
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
        console.log(response.feebacks);
        const categoriesId = response.feebacks.map((x) => {
          return {
            comment: x.comment,
            rating: x.rating,
            desc: x.description,
            user: x.user.firstName,
            createdAt: x.createdAt,
            company: x.company.name,
          };
        });

        this.feebacks = categoriesId.reverse();
        const companiesId = response.companies.map((x) => {
          return { title: x.name, id: x.id };
        });
        const companierR = companiesId;
        this.companies = companierR
       
        setTimeout(() => {
          this.show = true;
        }, 300);
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
