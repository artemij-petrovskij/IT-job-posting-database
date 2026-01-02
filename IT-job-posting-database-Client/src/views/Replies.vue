<template>
  <v-responsive>
    <v-layout>
      <v-main class="mx-3 py-5">
        <v-card class="mx-auto" variant="text" max-width="900">
          <h3 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
            Мои отклики
          </h3>
          <div class="justify-center mb-3">
            <!-- <v-chip variant="flat">
              Default flat
            </v-chip>

            <v-chip color="primary" variant="flat">
              Primary flat
            </v-chip>

            <v-chip color="secondary" variant="flat">
              Secondary flat
            </v-chip>

            <v-chip color="red" variant="flat">
              Red flat
            </v-chip>

            <v-chip color="green" variant="flat">
              Green flat
            </v-chip> -->
            <v-btn @click="loadRepliesByStatus('На рассмотрении')" size="x-small" rounded color="primary" variant="flat"
              location="top right">
              На рассмотрении {{ statusStatistics['На рассмотрении'] }}

            </v-btn>

            <v-btn @click="loadRepliesByStatus('Отказ')" size="x-small" class="ml-3" rounded color="red" variant="flat">
              Отказ {{ statusStatistics['Отказ'] }}

            </v-btn>

            <v-btn @click="loadRepliesByStatus('Приглашение')" size="x-small" class="ml-3" rounded color="green"
              variant="flat">
              Приглашение {{ statusStatistics['Приглашение'] }}

            </v-btn>



          </div>
        </v-card>

        <v-fade-transition>
          <div v-if="show" class="my-box">
            <v-card border class="mx-auto mb-5" variant="text" rounded="lg" max-width="900">
              {{ companies.length === 0 ? "У вас еще нет откликов" : "" }}
              <v-list>
                <v-list-item v-for="(item, i) in companies" :key="i" subtitle="">
                  <v-card title="" max-width="1200" border class="mx-auto wrap">
                    <v-card-text>
                      <p>
                        <v-chip v-if="item.coverLetter === 'На рассмотрении'" color="primary" variant="flat">
                          {{ item.coverLetter }}
                        </v-chip>
                        <v-chip v-if="item.coverLetter === 'Отказ'" color="red" variant="flat">
                          {{ item.coverLetter }}
                        </v-chip>
                        <v-chip v-if="item.coverLetter === 'Приглашение'" color="green" variant="flat">
                          {{ item.coverLetter }}
                        </v-chip>
                      </p>

                      <p class="text-h6">
                        Отклик на вакансию: <a :href="`/vacancy?id=${item.vacancyId}`" target="_blank">
                          {{ item.title }}</a> в компанию -
                        <a :href="`/vacancy-of-company?id=${item.companyId}`" target="_blank">
                          {{ item.company }}: </a>
                        <br> Резюме {{ item.resumeTitle }}
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
    show: false,
    shows: false,
    roleId: "",

    statusStatistics: {
      'На рассмотрении': 0,
      'Отказ': 0,
      'Приглашение': 0
    },

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

        const data = response.vacancies;
        //console.log(data);
      }

      const categoriesId = response.applications.map((x) => {
        return {
          coverLetter: x.coverLetter,
          id: x.id,
          desc: x.description,
          title: x.vacancy.title,
          company: x.company.name,
          companyId: x.companyId,
          vacancyId: x.vacancyId,
          resumeTitle: x.resume.title,
          updatedAt: x.updatedAt,
        };
      });
      console.log(response.applications);

      const statuses = ['На рассмотрении', 'Отказ', 'Приглашение'];
      const statusCounts = {};

      statuses.forEach(status => {
        statusCounts[status] = response.applications.filter(app =>
          app.coverLetter === status
        ).length;
      });
      this.statusStatistics = statusCounts

      this.companies = categoriesId.reverse();

      setTimeout(() => {
        this.show = true;
      }, 300);
    },

    async loadRepliesByStatus(status) {
      this.show = true;
      let data = {
        email: localStorage.getItem("email"),
      };
      let response = await Vacancy.allVacancies(data);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        this.roleId = response.roleId;
      }

      // Обновляем статистику
      const statuses = ['На рассмотрении', 'Отказ', 'Приглашение'];
      statuses.forEach(s => {
        this.statusStatistics[s] = response.applications.filter(app =>
          app.coverLetter === s
        ).length;
      });

      const categoriesId = response.applications
        .filter(x => x.coverLetter == status)
        .map((x) => {
          return {
            coverLetter: x.coverLetter,
            id: x.id,
            desc: x.description,
            title: x.vacancy.title,
            company: x.company.name,
            companyId: x.companyId,
            vacancyId: x.vacancyId,
            resumeTitle: x.resume.title,
            updatedAt: x.updatedAt,
          };
        });

      this.companies = categoriesId.reverse();
      console.log('Filtered companies:', this.companies);
      this.show = true;
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
