<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <!-- <v-card title="Тайтл" class="mx-auto" max-width="700" variant="outlined">

            </v-card> -->

      <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
        <div class="text-truncate">Вакансии компании {{ current_company.name }}</div>
      </h1>
      <v-card class="mx-auto my-8" border>
        <v-card-item>
        {{ current_company.description }}
          <v-card-title>
            <div class="text-h4 text-left"></div>
          </v-card-title>
          <v-card-subtitle>
          
          </v-card-subtitle>
        </v-card-item>

        
       
      </v-card>

      <v-main>
        <v-data-iterator
          :items="items"
          :items-per-page="itemsPerPage"
        
        >
          <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
            <h3
              class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
            >
              <div >Вакансии компании  {{ current_company.name }} ({{vacancies_count}})</div>

              <div class="d-flex align-center">
                <v-btn class="me-8" variant="text" @click="onClickSeeAll">
                  <span class="text-decoration-underline text-none">Посмотреть все</span>
                </v-btn>

                <div class="d-inline-flex">
                  <v-btn
                    :disabled="page === 1"
                    class="me-2"
                    icon="mdi-arrow-left"
                    size="small"
                    variant="tonal"
                    @click="prevPage"
                  ></v-btn>

                  <v-btn
                    :disabled="page === pageCount"
                    icon="mdi-arrow-right"
                    size="small"
                    variant="tonal"
                    @click="nextPage"
                  ></v-btn>
                </div>
              </div>
            </h3>
           
          </template>

          <template v-slot:default="{ items }">
            <v-row>
              <v-col v-for="(item, i) in items" :key="i" cols="12" sm="12" xl="3">
                <v-sheet border rounded>
                  <v-list-item
                    :title="item.raw.title"
                    :href="`/vacancy?id=${item.raw.id}&company=${item.title}&companyId=${item.raw.id}&description=${item.description}`"
                    density="comfortable"
                    lines="two"
                    subtitle=""
                  >
                    <template v-slot:title>
                      <strong class="text-h6">
                        {{ item.raw.title }}
                      </strong>
                    </template>
                  </v-list-item>

                  <v-list-item>
                    <v-chip size="small"> Опыт: {{ item.raw.requirements }} </v-chip>
                  </v-list-item>

                  <v-btn
                    variant="plain"
                    :ripple="false"
                    :href="`vacancy-of-company?id=${item.raw.id}`"
                  >
                    {{ current_company.name }}
                  </v-btn>

                  <v-table class="text-caption" density="compact">
                    <tbody>
                      <!-- <tr align="right">
                              <th>Описание: {{ item.raw.description }}</th>
                              <td></td>
                            </tr> -->

                      <tr align="right">
                        <th>
                          <v-icon icon="mdi-cash" size="large"></v-icon>
                          {{ item.salary == "" ? "Не указана" : item.raw.salary }}
                        </th>
                        <td></td>
                      </tr>

                      <tr align="right">
                        <th>
                          <v-icon icon="mdi-school" size="large"></v-icon>
                          {{ item.raw.requirements }}
                        </th>
                        <td></td>
                      </tr>

                      <tr align="right">
                        <th>
                          <v-icon icon="mdi-map-marker" size="large"></v-icon>
                          {{ item.raw.location }}
                        </th>
                        <td></td>
                      </tr>

                      <!-- <v-btn v-if="this.roleId == '1'" ariant="outlined" class="ma-4"
                              @click="reply(item.raw.id, item.raw.company.id), changeColor(item.raw.id)"
                              :color="item.raw.check ? `primary` : `Secondary`">
                              :key="item.raw.id"
                              Откликнуться
                              {{ item.raw.check ? 1 : `asdf` }}
                            </v-btn> -->
                      <v-btn
                        v-if="roleId == '1'"
                        variant="elevated"
                        class="ma-4"
                        :color="
                          buttonColors[item.raw.id] ||
                          (item.raw.check ? 'primary' : 'normal')
                        "
                        @click="
                          handleClick(item.raw.id),
                            reply(item.raw.id, item.raw.company.id)
                        "
                        :key="item.raw.id"
                      >
                        {{ item.raw.check ? "Вы откликнулись" : "Откликнуться" }}
                      </v-btn>
                    </tbody>
                  </v-table>
                </v-sheet>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer="{ page, pageCount }">
            <v-footer
              class="justify-space-between text-body-2 mt-4"
              color="surface-variant"
            >
              Всего вакансий: {{ items.length }}

              <div>Страница {{ page }} из {{ pageCount }}</div>
            </v-footer>
          </template>
        </v-data-iterator>
      </v-main>
    </v-responsive>
  </v-container>
</template>

<script>
import { Vacancy } from "../services/vacancy.service.js";

export default {
  data: () => ({
    current_company: [],
    items: [],
    itemsPerPage: 4,
    dialog: false,
    overlay: true,
    username: localStorage.getItem("email"),
    show: false,
    shows: false,
    roleId:localStorage.getItem("roleId"),
    companyId: "",
    search_field: "",
    search_value: "",
    radios: null,
  }),
  methods: {
    async loadAdvert() {
      const id = this.$route.query.id;
      let response = await Vacancy.getOneCompany(id);

      this.items = response.vacancies;
      this.current_company = response;
      this.vacancies_count = response.vacancies.length
      console.log(response);
    },

    onClickSeeAll() {
      this.itemsPerPage = this.itemsPerPage === 4 ? this.items.length : 4;
    },
    //async loadMyAdverts() {
    //   let data = {
    //     email: localStorage.getItem("email"),
    //   };
    //   let response = await Vacancy.allVacancies(data);
    //   console.log(response);
    //   if (response.err) {
    //     console.log("Empty my_adverts list");
    //   } else {
    //     this.roleId = response.roleId;
    //     this.companyId = response.companyId;
    //     this.companyName = response.companyName;
    //     const data = response.vacancies;
    //     //console.log(response.vacancies)

    //     const vacancies = response.vacancies;
    //     const applications = response.applications;
    //     const vacanciesWithCheck = vacancies.map((vacancy) => {
    //       const isMatched = applications.some((app) => app.vacancyId === vacancy.id);
    //       return {
    //         ...vacancy,
    //         check: isMatched,
    //       };
    //     });
    //     this.items = vacanciesWithCheck.reverse();
    //   }

    //   if (localStorage.getItem("roleId") == null) {
    //     location.reload();
    //   }
    //   {
    //     localStorage.setItem("roleId", response.roleId);
    //     localStorage.setItem("companyId", response.companyId);
    //     if (response.companyName) {
    //       localStorage.setItem("companyName", response.companyName.name);
    //     }
    //   }
    // },
    // },
  },
  async created() {
    await this.loadAdvert();
  },
};
</script>
