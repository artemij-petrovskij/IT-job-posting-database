<template>
  <v-responsive>
    <v-card>
      <v-layout>
        <v-main class="mx-3 py-5">
          <v-card class="mx-auto" variant="text" max-width="900">
            <h3
              class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
            >
              Резюме {{ filteredItems.length }}
            </h3>
          </v-card>

         
          <v-card class="mx-auto mb-6" max-width="900" variant="outlined">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="searchTitle"
                    label="Поиск по должности"
                    placeholder="Введите название вакансии"
                    prepend-inner-icon="mdi-magnify"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="filterSalary"
                    label="Зарплата до"
                    placeholder="Минимальная зарплата"
                    type="number"
                    prepend-inner-icon="mdi-cash"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>

          
                <v-col cols="12" md="6">
                  <v-select
                    v-model="filterExperience"
                    :items="experienceOptions"
                    label="Опыт работы"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-btn
                    variant="tonal"
                    color="error"
                    prepend-icon="mdi-filter-remove"
                    @click="resetFilters"
                  
                  >
                    Сбросить фильтры
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-data-iterator :items="filteredItems" :page="page" :items-per-page="5">
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
                    :title="item.raw.title"
                    :href="`/applicant?id=${item.raw.id}&company=${item.raw.title}&companyId=${item.raw.title}&description=${item.raw.title}`"
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
                    <v-chip size="small"> Опыт: {{ item.raw.skills }} </v-chip>
                  </v-list-item>

                  <v-btn
                    variant="plain"
                    :ripple="false"
                    :href="`vacancy-of-company?id=${item.raw.title}`"
                    target="_blank"
                  >
                    {{ item.raw.title }}
                  </v-btn>

                  <v-table class="text-caption" density="compact">
                    <tbody>
                      <tr align="right">
                        <th>
                          <v-icon icon="mdi-cash" size="large"></v-icon>
                          {{ item.raw.salary == "" ? "Не указана" : item.raw.salary + ' $' }}
                        </th>
                        <td></td>
                      </tr>

                      <tr align="right">
                        <th>
                          <v-icon icon="mdi-map-marker" size="large"></v-icon>
                          {{ item.raw.skills }}
                        </th>
                      </tr>

                      <tr align="right">
                        <th>
                          <v-icon icon="mdi-calendar" size="large"></v-icon>
                          {{ formatDate(item.raw.createdAt) }}
                        </th>
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

                <br />
              </template>
            </template>
            
            <template v-slot:footer="{ pageCount }">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </template>
          </v-data-iterator>

          <!-- Сообщение если нет результатов -->
          <v-card 
            v-if="filteredItems.length === 0 && items.length > 0" 
            class="mx-auto text-center pa-6"
            max-width="900"
            variant="tonal"
          >
            <v-icon icon="mdi-information" size="large" class="mb-2"></v-icon>
            <p class="text-h6">Нет результатов по вашему запросу</p>
            <p class="text-body-1">Попробуйте изменить параметры поиска</p>
          </v-card>
        </v-main>
      </v-layout>
    </v-card>
  </v-responsive>
</template>

<script>
import { ref, computed } from "vue";
import { Advert } from "../services/advert.service.js";
import { Vacancy } from "../services/vacancy.service.js";

const page = ref(1);

export default {
  data: () => ({
    page: 1,
    items: [],
    itemsPerPage: 4,
    dialog: false,
    overlay: true,
    show: false,
    username: localStorage.getItem("email"),
  
    searchTitle: "",
    filterSalary: "",
    filterExperience: "",
    
    experienceOptions: [
      "Без опыта",
      "1-3 года",
      "3-5 лет",
      "5+ лет"
    ]
  }),

  computed: {
  
    filteredItems() {
      let result = [...this.items];

      if (this.searchTitle) {
        const searchTerm = this.searchTitle.toLowerCase();
        result = result.filter(item => 
          item.title.toLowerCase().includes(searchTerm)
        );
      }

    
      if (this.filterSalary) {
        const minSalary = parseFloat(this.filterSalary);
        result = result.filter(item => {
          const salary = parseFloat(item.salary);
          return !isNaN(salary) && salary <= minSalary;
        });
      }

   
      if (this.filterExperience) {
        result = result.filter(item => 
          item.skills && item.skills.includes(this.filterExperience)
        );
      }

      return result;
    },

  
    roleId() {
      return localStorage.getItem("roleId");
    }
  },

  methods: {
    async loadMyAdverts() {
      let data = {
        email: localStorage.getItem("email"),
      };
      let response = await Advert.allAdverts(data);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        this.items = response.reverse();
        console.log("Загруженные данные:", response.reverse());
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

    
    resetFilters() {
      this.searchTitle = "";
      this.filterSalary = "";
      this.filterExperience = "";
    },

  
    formatDate(dateString) {
      if (!dateString) return "Не указана";
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },

    handleButtonClick(item) {
     
      console.log("Отклик на вакансию:", item.id);
      
      
      if (!this.buttonColors) {
        this.buttonColors = {};
      }
      this.$set(this.buttonColors, item.id, "normal");
    }
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