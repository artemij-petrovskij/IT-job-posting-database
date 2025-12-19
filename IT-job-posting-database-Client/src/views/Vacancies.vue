<template>
  <v-responsive>
    <div ref="scrollTarget"></div>

    <v-main class="mx-3 py-5">
      <v-card class="mx-auto" variant="text" max-width="900">
        <h3
          class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
        >
          Вакансии
        </h3>
      </v-card>

      <v-card border class="mx-auto mb-5" variant="text" rounded="lg" max-width="900">
        <v-card-actions>
          <v-btn block text=" Поиск и фильтрация" @click="shows = !shows"></v-btn>

          <v-spacer></v-spacer>

          <v-btn :icon="shows ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-if="shows">
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

              <v-autocomplete
                clearable
                v-model="category"
                @update:modelValue="getCategoryId()"
                label="Категория"
                :items="categories"
              ></v-autocomplete>
            </v-responsive>
          </div>
        </v-expand-transition>
      </v-card>
  <v-fade-transition>
        <div v-if="show" class="my-box">
      <v-card
        v-if="items.length != 0 && search_field === ''"
        class="mx-auto"
        variant="text"
        max-width="900"
      >
        <h3
          class="text-h6 font-weight-bold d-flex justify-space-between mb-4 align-center"
        >
          Найдено вакансий: {{ items.length }}
          <b v-if="search_field !== ''"> по запросу {{ search_field }} </b>
        </h3>
      </v-card>

      <v-card
        v-if="items.length != 0 && search_field.length != 0"
        class="mx-auto"
        variant="text"
        max-width="900"
      >
        <h3
          class="text-h6 font-weight-bold d-flex justify-space-between mb-4 align-center"
        >
          Найдено вакансий: {{ items.length }} по запросу "{{ search_field }}"
        </h3>
      </v-card>

      <v-card v-if="items.length == 0" class="mx-auto" variant="text" max-width="900">
        <h3
          class="text-h6 font-weight-bold d-flex justify-space-between mb-4 align-center"
        >
          По вашему запросу ничего не найдено
        </h3>
      </v-card>

    
          <v-data-iterator :items="items" :page="page" :items-per-page="4">
            <template v-slot:default="{ items }">
              <template v-for="(item, i) in items" :key="i">
                <v-card
                  border
                  rounded="lg"
                  elevation="0"
                  class="mx-auto mb-5"
                  max-width="900"
                >
                  <v-list-item
                    :title="item.raw.name"
                    :href="`/vacancy?id=${item.raw.id}&company=${item.raw.company.name}&companyId=${item.raw.company.id}&description=${item.raw.company.description}`"
                    density="comfortable"
                    target="_blank"
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
                    :href="`vacancy-of-company?id=${item.raw.company.id}`"
                    target="_blank"
                  >
                    {{ item.raw.company.name }}
                  </v-btn>

                  <!-- <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text> -->

                  <v-table class="text-caption" density="compact">
                    <tbody>
                      <tr align="right">
                        <th>
                          <v-icon icon="mdi-cash" size="large"></v-icon>
                          {{ item.raw.salary == "" ? "Не указана" : item.raw.salary }}
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

                      <v-btn
                        rounded="lg"
                        size="large"
                        v-if="roleId == '1'"
                        variant="flat"
                        class="ma-4"
                        :color="
                          buttonColors[item.raw.id] ||
                          (item.raw.check ? 'normal' : 'primary')
                        "
                        @click="handleButtonClick(item.raw)"
                        :key="item.raw.id"
                      >
                        {{
                          buttonColors[item.raw.id] === "normal" || item.raw.check
                            ? "Вы откликнулись"
                            : "Откликнуться"
                        }}
                      </v-btn>
                    </tbody>
                  </v-table>
                </v-card>
              </template>
            </template>
            <template v-slot:footer="{ pageCount }">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </template>
          </v-data-iterator>
        </div>
      </v-fade-transition>
    </v-main>
    <v-snackbar v-model="snackbar" vertical>
      <div class="text-subtitle-1 pb-2">{{ snackbar_title_text }}</div>

      <p>{{ snackbar_text }}</p>

      <template v-slot:actions>
        <v-btn color="indigo" variant="text" @click="snackbar = false"> </v-btn>
      </template>
    </v-snackbar>
  </v-responsive>
</template>
<script>
//import { search } from "core-js/fn/symbol";
import { Vacancy } from "../services/vacancy.service.js";
import { ref } from "vue";
const page = ref(1);

export default {
  data: () => ({
    page: 1,
    items: [],
    allItems: [], // Храним ВСЕ загруженные вакансии
    itemsPerPage: 8,
    dialog: false,
    overlay: true,
    username: localStorage.getItem("email"),
    show: false,
    shows: false,
    roleId: "",
    companyId: "",

    categoryId: null,
    categories: [],
    category: "",

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

  watch: {
    page() {
      this.scrollToTop();
    },
    search_field() {
      this.applyAllFilters(); // Добавляем отслеживание поля поиска
    },
  },

  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    handleClick(id) {
      const currentColor = this.buttonColors[id] || this.getCheckColor(id);
      this.buttonColors[id] = currentColor === "primary" ? "normal" : "primary";
    },

    getCheckColor(id) {
      const item = this.getItemById(id);
      return item.raw.check ? "primary" : "normal";
    },

    getItemById(id) {
      return this.allItems.find((item) => item.id === id);
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
        this.buttonColors[id] = "normal";
      }

      if (response.warning == "Вы уже откликались на эту вакансию") {
        this.snackbar = true;
        this.snackbar_title_text = "Предупреждение";
        this.snackbar_text = response.warning;
        this.buttonColors[id] = "normal";
      }
    },

    async handleButtonClick(item) {
      const id = item.id;
      const companyId = item.company.id;

      const currentColor = this.buttonColors[id] || (item.check ? "primary" : "normal");
      this.buttonColors[id] = currentColor === "primary" ? "normal" : "primary";

      await this.reply(id, companyId);
    },

    // Новый метод для применения всех фильтров
    applyAllFilters() {
      let filteredItems = [...this.allItems];

      // Применяем поиск
      if (this.search_field && this.search_field.trim() !== "") {
        const searchTerm = this.search_field.toLowerCase().trim();
        filteredItems = filteredItems.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm) ||
            (item.description && item.description.toLowerCase().includes(searchTerm)) ||
            (item.company &&
              item.company.name &&
              item.company.name.toLowerCase().includes(searchTerm))
        );
      }

      // Применяем фильтр по категории
      if (this.categoryId) {
        filteredItems = filteredItems.filter(
          (item) => Number(item.category.id) === this.categoryId
        );
      }

      // Применяем сортировку
      if (this.radios) {
        switch (this.radios) {
          case 1: // По дате (последние сначала)
            filteredItems = [...filteredItems].reverse();
            break;
          case 2: // По соответствию (здесь можно добавить свою логику)
            // Пока оставляем без изменений
            break;
          case 3:
            filteredItems = this.sortBySalary(filteredItems, "desc");
            break;
          case 4:
            filteredItems = this.sortBySalary(filteredItems, "asc");
            break;
        }
      }

      this.items = filteredItems;
    },

    // Метод для сортировки по зарплате
    sortBySalary(vacancies, order = "asc") {
      return [...vacancies].sort((a, b) => {
        const salaryA = parseFloat(a.salary.replace(/[^0-9]/g, "")) || 0;
        const salaryB = parseFloat(b.salary.replace(/[^0-9]/g, "")) || 0;

        return order === "asc" ? salaryA - salaryB : salaryB - salaryA;
      });
    },

    async applayFilter() {
      this.applyAllFilters();
    },

    async getCategoryId() {
      const array = this.categories;
      const found = array.find((element) => {
        return element.title == this.category;
      });
      this.categoryId = found ? found.id : null;
      this.applyAllFilters();
    },

    async searcher() {
      this.applyAllFilters();
    },

    async searcher_blur() {
      if (this.search_field == null || this.search_field.trim() === "") {
        this.applyAllFilters();
      }
    },

    async loadMyAdverts() {
      let data = {
        email: localStorage.getItem("email"),
      };
      let response = await Vacancy.allVacancies(data);

      console.log(response);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        this.roleId = response.roleId;
        this.companyId = response.companyId;
        this.companyName = response.companyName;

        const categoriesId = response.categories.map((x) => {
          return { title: x.name, id: x.id };
        });
        this.categories = categoriesId;

        const data = response.vacancies;
        const vacancies = response.vacancies;
        const applications = response.applications;

        // Сохраняем все вакансии
        this.allItems = vacancies.map((vacancy) => {
          const isMatched = applications.some((app) => app.vacancyId === vacancy.id);
          return {
            ...vacancy,
            check: isMatched,
          };
        });

        // Применяем фильтры к загруженным данным
        this.applyAllFilters();

        // Ключевое изменение: проверяем, совпадает ли роль в localStorage с полученной
        const storedRole = localStorage.getItem("roleId");
        const currentRole = response.roleId.toString();

        // Всегда сохраняем данные в localStorage
        localStorage.setItem("roleId", currentRole);
        localStorage.setItem("companyId", response.companyId);

        if (response.companyName) {
          localStorage.setItem("companyName", response.companyName.name);
        }

        // Если роль изменилась или еще не сохранена - перезагружаем
        if (storedRole !== currentRole) {
          // Даем небольшое время для рендеринга данных перед перезагрузкой
           location.reload();
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
