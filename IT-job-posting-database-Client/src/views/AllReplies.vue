<template>
  <v-responsive>
    <v-layout>
      <v-main class="mx-3 py-5">
        <v-card class="mx-auto" variant="text" max-width="900">
          <h3
            class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
          >
            Отклики
          </h3>
        </v-card>
        <v-fade-transition>
          <div v-if="show" class="my-box">
            <v-card
              v-if="companies.length === 0"
              class="mx-auto"
              variant="text"
              max-width="900"
            >
              <h3
                class="text-h7 font-weight-bold d-flex justify-space-between mb-4 align-center"
              >
                У вас еще нет откликов
              </h3>
            </v-card>

            <v-card class="mx-auto" variant="text" max-width="900">
              <v-list lines="three">
                <v-list-item v-for="(item, i) in companies" :key="i" subtitle="">
                  <v-chip
                    v-if="item.coverLetter === 'На рассмотрении'"
                    color="primary"
                    variant="flat"
                  >
                    {{ item.coverLetter }}
                  </v-chip>
                  <v-chip v-if="item.coverLetter === 'Отказ'" color="red" variant="flat">
                    {{ item.coverLetter }}
                  </v-chip>
                  <v-chip
                    v-if="item.coverLetter === 'Приглашение'"
                    color="green"
                    variant="flat"
                  >
                    {{ item.coverLetter }}
                  </v-chip>

                  {{ formatDate(item.updatedAt) }}
                  <v-spacer>
                    Пользователь {{ item.email }} - Отклик на вакансию:
                    {{ item.title }} КОМПАНИЯ {{ item.company }}</v-spacer
                  >
                  <br />

                  <v-bottom-navigation
                    style="width: 400px; position: relative; margin-bottom: 40px"
                    variant="outlined"
                  >
                    <br />
                    <v-btn
                      @click="
                        changeStatus(
                          item.coverLetter,
                          item.userId,
                          'Приглашение',
                          item.vacancyId
                        )
                      "
                      >Приглашение</v-btn
                    >

                    <v-btn
                      @click="
                        changeStatus(
                          item.coverLetter,
                          item.userId,
                          'Отказ',
                          item.vacancyId
                        )
                      "
                      >Отказ</v-btn
                    >
                  </v-bottom-navigation>

                  <v-divider> </v-divider>

                  <v-spacer></v-spacer>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
        </v-fade-transition>
      </v-main>
    </v-layout>
  </v-responsive>
</template>

<script>
//import { search } from "core-js/fn/symbol";
import { Vacancy } from "../services/vacancy.service.js";

export default {
  data: () => ({
    items: [],
    itemsPerPage: 4,
    dialog: false,
    overlay: true,
    username: localStorage.getItem("email"),
    companyId: localStorage.getItem("companyId"),
    show: false,
    shows: false,
    roleId: "",

    search_field: "",
    search_value: "",

    radios: null,
  }),
  methods: {
    async changeStatus(status, userId, decision, vacancyId) {
      let data = {
        status: status,
        userId: userId,
        decision: decision,
        vacancyId: vacancyId,
      };

      let response = await Vacancy.changeStatus(data);
      console.log(response);
      location.reload();
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleString("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    },

    async loadMyAdverts() {
      let data = {
        email: localStorage.getItem("email"),
        companyId: localStorage.getItem("companyId"),
      };
      let response = await Vacancy.allVacancies(data);
      let response2 = await Vacancy.getReplies(data);

      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        this.items = response.vacancies.reverse();
        this.roleId = response.roleId;
      }

      const res = response2;

      const applications = res.map((x) => {
        return {
          coverLetter: x.coverLetter,
          id: x.id,
          desc: x.description,
          title: x.vacancy.title,
          updatedAt: x.updatedAt,
          email: x.user.firstName,
          vacancyId: x.vacancyId,
          userId: x.userId,
          company: x.company.name,
        };
      });

      this.companies = applications;

      setTimeout(() => {
        this.show = true;
      }, 300);
    },

    onClickSeeAll() {
      this.itemsPerPage = this.itemsPerPage === 4 ? this.items.length : 4;
    },
    async deleteItem(id) {
      this.dialog = false;
      let response = await Advert.loadMyAdvertsTN(id);
      //console.log(response);
      await this.loadMyAdverts();
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
