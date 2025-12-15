<template>
  <v-responsive>
    <v-fade-transition>
      <div v-if="show" class="my-box">
        <v-snackbar v-model="snackbar" vertical>
          <div class="text-subtitle-1 pb-2">{{ snackbar_title_text }}</div>

          <p>{{ snackbar_text }}</p>

          <template v-slot:actions>
            <v-btn color="indigo" variant="text" @click="snackbar = false"> </v-btn>
          </template>
        </v-snackbar>
        <v-card>
          <v-layout>
            <!-- <v-main style="height: 1800px" class="ma-10 xs"> -->
            <v-main>
              <v-data-iterator
                :items="items"
                :items-per-page="itemsPerPage"
                style="padding: 40px"
              >
                <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
                  <h1
                    class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
                  >
                    <div class="text-truncate">Вакансии</div>

                    <div class="d-flex align-center">
                      <v-btn class="me-8" variant="text" @click="onClickSeeAll">
                        <span class="text-decoration-underline text-none"
                          >Посмотреть все</span
                        >
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
                  </h1>
                  <v-card variant="outlined" class="mx-auto mb-4">
                    <v-card-actions>
                      <v-btn
                        block
                        text=" Поиск и фильтрация"
                        @click="shows = !shows"
                      ></v-btn>

                      <v-spacer></v-spacer>

                      <v-btn
                        :icon="shows ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                      ></v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                      <div v-show="shows">
                        <v-divider></v-divider>

                        <v-responsive class="mx-auto pt-8" max-width="800">
                          <v-text-field
                            v-model="search_field"
                            label="Поиск"
                            clearable
                            prepend-icon="mdi-magnify"
                            variant="outlined"
                            @input="searcher()"
                            @blur="searcher_blur()"
                          ></v-text-field>

                          <!-- <p>Selected Button: {{ radios }}</p> -->
                          <v-radio-group v-model="radios" inline @change="applayFilter()">
                            <v-radio :value="1" label="По дате"></v-radio>
                            <v-radio :value="2" label="По соответствию"></v-radio>
                            <v-radio :value="3" label="По убыванию зарплат"></v-radio>
                            <v-radio :value="4" label="По возрастанию зарплат"></v-radio>
                          </v-radio-group>
                        </v-responsive>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </template>

                <template v-slot:default="{ items }">
                  <v-row>
                    <v-col v-for="(item, i) in items" :key="i" cols="12" sm="12" xl="3">
                      <v-sheet border rounded>
                        <v-list-item
                          :title="item.raw.name"
                          :href="`/vacancy?id=${item.raw.id}&company=${item.raw.company.name}&companyId=${item.raw.company.id}&description=${item.raw.company.description}`"
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

                        <v-btn variant="plain" :ripple="false">
                          {{ item.raw.company.name }}
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
                                {{
                                  item.raw.salary == "" ? "Не указана" : item.raw.salary
                                }}
                              </th>
                              <td></td>
                            </tr>

                            <tr align="right">
                              <th>
                                <v-icon icon="mdi-account-group" size="large"></v-icon>
                                {{ item.raw.category.name }}
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
          </v-layout>
        </v-card>
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
    companyId: "",

    search_field: "",
    search_value: "",

    radios: null,
    snackbar: false,
    snackbar_text: null,
    snackbar_title_text: null,

    applications: null,
    vacancies: null,

    buttonColors: {},
  }),
  methods: {
    handleClick(id) {
      // Определяем текущий цвет на основе check
      const currentColor = this.buttonColors[id] || this.getCheckColor(id); // Получаем текущий цвет, если есть, или вычисляем по check
      // Меняем цвет кнопки
      this.buttonColors[id] = currentColor === "primary" ? "normal" : "primary";
    },

    // Функция для получения начального цвета на основе check
    getCheckColor(id) {
      const item = this.getItemById(id); // Здесь можно извлечь объект item по id
      return item.raw.check ? "primary" : "normal"; // Вычисляем начальный цвет
    },
    getItemById(id) {
      // Получение объекта item по id. Пожалуйста, адаптируйте это под свою логику.
      return { raw: { id, check: false } }; // Пример возвращаемого объекта
    },

    async reply(id, companyId) {
      console.log(id);
      console.log(this.username);
      const data = {
        email: this.username,
        vacancyId: id,
        companyId: companyId,
      };
      let response = await Vacancy.createReply(data);

      if (response.success == "Вы откликнулись на вакансию") {
        this.snackbar = true;
        this.snackbar_title_text = "Успешно";
        this.snackbar_text = response.success;
      }

      if (response.warning == "Вы уже откликались на эту вакансию") {
        this.snackbar = true;
        this.snackbar_title_text = "Предупреждение";
        this.snackbar_text = response.warning;
      }
      // if (response.err) {
      //   console.log(1)
      // } else {
      //   console.log(2)
      // }
    },

    async applayFilter() {
      console.log(this.radios);
      if (this.radios == 1) {
        this.loadMyAdverts();
      } else if (this.radios == 2) {
      } else if (this.radios == 3) {
        let data = {
          email: localStorage.getItem("email"),
        };
        let response = await Vacancy.allVacancies(data);
        if (response.err) {
          console.log("Empty my_adverts list");
        } else {
          const data = response.vacancies;
          const filterBySalaryAsc = (vacancies) => {
            return vacancies
              .map((vacancy) => ({
                ...vacancy,
                salary: parseFloat(vacancy.salary.replace(/[^0-9]/g, "")) || 0, // Убираем символы, оставляя только числа
              }))
              .sort((a, b) => b.salary - a.salary); // Сортируем по возрастанию
          };
          this.items = filterBySalaryAsc(data);
        }
      } else if (this.radios == 4) {
        let data = {
          email: localStorage.getItem("email"),
        };
        let response = await Vacancy.allVacancies(data);
        if (response.err) {
          console.log("Empty my_adverts list");
        } else {
          const data = response.vacancies;
          const filterBySalaryAsc = (vacancies) => {
            return vacancies
              .map((vacancy) => ({
                ...vacancy,
                salary: parseFloat(vacancy.salary.replace(/[^0-9]/g, "")) || 0, // Убираем символы, оставляя только числа
              }))
              .sort((a, b) => a.salary - b.salary); // Сортируем по возрастанию
          };

          this.items = filterBySalaryAsc(data);
        }
      } else {
      }
    },

    async searcher() {
      let data = {
        email: localStorage.getItem("email"),
      };
      let response = await Vacancy.allVacancies(data);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        const data = response.vacancies;
        const filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(this.search_field)
        );
        console.log(filteredData);
        console.log(this.search_field);

        this.items = filteredData;
      }
    },
    async searcher_blur() {
      if (this.search_field == null) {
        this.loadMyAdverts();
      }
    },
    async loadMyAdverts() {
      let data = {
        email: localStorage.getItem("email"),
      };
      let response = await Vacancy.allVacancies(data);
      console.log("XXXXXXXXXXXX");
      console.log(response);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        this.roleId = response.roleId;
        this.companyId = response.companyId;
        this.companyName = response.companyName;
        const data = response.vacancies;
        //console.log(response.vacancies)

        const vacancies = response.vacancies;
        const applications = response.applications;
        const vacanciesWithCheck = vacancies.map((vacancy) => {
          const isMatched = applications.some((app) => app.vacancyId === vacancy.id);
          return {
            ...vacancy,
            check: isMatched,
          };
        });
        this.items = vacanciesWithCheck.reverse();
      }

      if (localStorage.getItem("roleId") == null) {
        location.reload();
      }
      {
        localStorage.setItem("roleId", response.roleId);
        localStorage.setItem("companyId", response.companyId);
        if (response.companyName) {
          localStorage.setItem("companyName", response.companyName.name);
        }
      }

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
