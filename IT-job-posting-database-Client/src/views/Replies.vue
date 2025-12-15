<template>
  <v-responsive>
    <v-fade-transition>
      <div v-if="show" class="my-box">
        <v-layout>
          <v-main>
            <h1
              style="padding: 40px"
              class="text-h4 font-weight-bold d-flex justify-space-between align-center"
            >
              <div class="text-truncate">Мои отклики</div>
            </h1>

            <v-card class="mx-auto ">
              {{ companies.length === 0 ? "У вас еще нет откликов" : "" }}
              <v-list>
                <v-list-item v-for="(item, i) in companies" :key="i" subtitle="">
                  <v-card
                    title=""
                    max-width="1200"
                    variant="outlined"
                    class="mx-auto wrap"
                  >
                    <v-card-text>
                      <p>
                        <v-chip
                          v-if="item.coverLetter === 'На рассмотрении'"
                          color="primary"
                          variant="flat"
                        >
                          {{ item.coverLetter }}
                        </v-chip>
                        <v-chip
                          v-if="item.coverLetter === 'Отказ'"
                          color="red"
                          variant="flat"
                        >
                          {{ item.coverLetter }}
                        </v-chip>
                        <v-chip
                          v-if="item.coverLetter === 'Приглашение'"
                          color="green"
                          variant="flat"
                        >
                          {{ item.coverLetter }}
                        </v-chip>
                      </p>

                      <p class="text-h6 font-weight-black">
                        Отклик на вакансию: {{ item.title }} в компанию
                        {{ item.company }}
                      </p>

                      <p class="text-h7">
                        {{ formatDate(item.updatedAt) }}
                      </p>
                      <!-- <div class="text-medium-emphasis">
                          well meaning and kindly.<br />
                          "a benevolent smile"
                        </div> -->
                    </v-card-text>
                  </v-card>
                </v-list-item>
              </v-list>
            </v-card>
          </v-main>
        </v-layout>
      </div>
    </v-fade-transition>
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
    show: false,
    shows: false,
    roleId: "",

    search_field: "",
    search_value: "",

    radios: null,
  }),
  methods: {
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
      };
      let response = await Vacancy.allVacancies(data);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        this.items = response.vacancies.reverse();
        this.roleId = response.roleId;
        console.log();
        const data = response.vacancies;
        console.log(data);
      }

      //this.items = response.vacancies.reverse();
      console.log(response);
      const categoriesId = response.applications.map((x) => {
        return {
          coverLetter: x.coverLetter,
          id: x.id,
          desc: x.description,
          title: x.vacancy.title,
          company: x.company.name,
          updatedAt: x.updatedAt,
        };
      });
      this.companies = categoriesId.reverse();
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
      console.log(response);
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
