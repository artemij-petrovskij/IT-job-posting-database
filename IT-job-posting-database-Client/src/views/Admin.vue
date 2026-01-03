<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-left fill-height">
      <!-- Общая статистика -->
      <v-row class="mb-6">
        <v-col cols="12" md="3">
          <v-card class="stat-card" elevation="2">
            <v-card-text class="text-center">
              <v-icon size="48" color="blue-darken-2" class="mb-2">mdi-tag-multiple</v-icon>
              <div class="text-h4 font-weight-bold">{{ category_count }}</div>
              <div class="text-subtitle-1 text-grey-darken-1">Категорий</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stat-card" elevation="2">
            <v-card-text class="text-center">
              <v-icon size="48" color="green-darken-2" class="mb-2">mdi-briefcase</v-icon>
              <div class="text-h4 font-weight-bold">{{ vacancies_count }}</div>
              <div class="text-subtitle-1 text-grey-darken-1">Вакансий</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stat-card" elevation="2">
            <v-card-text class="text-center">
              <v-icon size="48" color="orange-darken-2" class="mb-2">mdi-domain</v-icon>
              <div class="text-h4 font-weight-bold">{{ companies_count }}</div>
              <div class="text-subtitle-1 text-grey-darken-1">Компаний</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="stat-card" elevation="2">
            <v-card-text class="text-center">
              <v-icon size="48" color="purple-darken-2" class="mr-2">mdi-account-check</v-icon>
              <div class="text-h4 font-weight-bold">{{ applications_count }}</div>
              <div class="text-subtitle-1 text-grey-darken-1">Заявок</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Основная статистика -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="bg-blue-darken-3 text-white pa-4">
          <v-icon class="mr-2">mdi-chart-bar</v-icon>
          Общая статистика системы
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="6">
              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th class="text-left font-weight-bold">Показатель</th>
                    <th class="text-left font-weight-bold">Значение</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pa-3">
                      <v-icon color="blue-darken-2" class="mr-2">mdi-tag-multiple</v-icon>
                      Количество категорий:
                    </td>
                    <td class="pa-3"><strong class="text-blue-darken-2">{{ category_count }}</strong></td>
                  </tr>
                  <tr>
                    <td class="pa-3">
                      <v-icon color="green-darken-2" class="mr-2">mdi-briefcase</v-icon>
                      Количество вакансий:
                    </td>
                    <td class="pa-3"><strong class="text-green-darken-2">{{ vacancies_count }}</strong></td>
                  </tr>
                  <tr>
                    <td class="pa-3">
                      <v-icon color="orange-darken-2" class="mr-2">mdi-domain</v-icon>
                      Количество компаний:
                    </td>
                    <td class="pa-3"><strong class="text-orange-darken-2">{{ companies_count }}</strong></td>
                  </tr>
                  <tr>
                    <td class="pa-3">
                      <v-icon color="purple-darken-2" class="mr-2">mdi-account-check</v-icon>
                      Количество заявок:
                    </td>
                    <td class="pa-3"><strong class="text-purple-darken-2">{{ applications_count }}</strong></td>
                  </tr>
                  <tr>
                    <td class="pa-3">
                      <v-icon color="amber-darken-2" class="mr-2">mdi-star</v-icon>
                      Количество отзывов:
                    </td>
                    <td class="pa-3"><strong class="text-amber-darken-2">{{ feedbacks_count }}</strong></td>
                  </tr>
                  <tr>
                    <td class="pa-3">
                      <v-icon color="red-darken-2" class="mr-2">mdi-account-group</v-icon>
                      Уникальных соискателей:
                    </td>
                    <td class="pa-3"><strong class="text-red-darken-2">{{ uniqueApplicants }}</strong></td>
                  </tr>
                  <tr>
                    <td class="pa-3">
                      <v-icon color="teal-darken-2" class="mr-2">mdi-currency-usd</v-icon>
                      Средняя зарплата:
                    </td>
                    <td class="pa-3"><strong class="text-teal-darken-2">{{ averageSalary }}</strong></td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="h-100" elevation="1">
                <v-card-title class="text-subtitle-1 bg-grey-lighten-4">
                  Статистика по требованиям
                </v-card-title>
                <v-card-text>
                  <v-list density="compact">
                    <v-list-item v-for="(count, requirement) in experienceStats" :key="requirement">
                      <template v-slot:prepend>
                        <v-icon color="indigo">mdi-account-clock</v-icon>
                      </template>
                      <v-list-item-title>{{ getRequirementLabel(requirement) }}</v-list-item-title>
                      <template v-slot:append>
                        <v-chip size="small" color="indigo" variant="outlined">
                          {{ count }} ({{ ((count / vacancies_count) * 100).toFixed(1) }}%)
                        </v-chip>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Детальная статистика по компаниям -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="bg-green-darken-3 text-white pa-4">
          <v-icon class="mr-2">mdi-office-building</v-icon>
          Детальная статистика по компаниям
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="6">
              <v-card elevation="1" class="h-100">
                <v-card-title class="text-subtitle-1 bg-green-lighten-5">
                  <v-icon color="green" class="mr-2">mdi-trophy</v-icon>
                  Топ-5 компаний по вакансиям
                </v-card-title>
                <v-card-text>
                  <v-table density="compact">
                    <thead>
                      <tr>
                        <th>Место</th>
                        <th>Компания</th>
                        <th class="text-right">Вакансий</th>
                        <th class="text-right">Доля</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(company, index) in topCompanies" :key="company.name">
                        <td>
                          <v-chip :color="getMedalColor(index)" size="small" class="font-weight-bold">
                            {{ index + 1 }}
                          </v-chip>
                        </td>
                        <td>{{ company.name }}</td>
                        <td class="text-right">
                          <strong class="text-green-darken-2">{{ company.vacancyCount }}</strong>
                        </td>
                        <td class="text-right text-blue-grey-darken-2">
                          {{ ((company.vacancyCount / vacancies_count) * 100).toFixed(1) }}%
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card elevation="1" class="h-100">
                <v-card-title class="text-subtitle-1 bg-amber-lighten-5">
                  <v-icon color="amber" class="mr-2">mdi-star</v-icon>
                  Топ-5 компаний по рейтингу
                </v-card-title>
                <v-card-text>
                  <v-table density="compact">
                    <thead>
                      <tr>
                        <th>Компания</th>
                        <th class="text-right">Рейтинг</th>
                        <th class="text-right">Отзывов</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="company in topRatedCompanies" :key="company.name">
                        <td>{{ company.name }}</td>
                        <td class="text-right">
                          <div class="d-flex align-center justify-end">
                            <v-rating
                              :model-value="company.avgRating"
                              readonly
                              size="small"
                              density="compact"
                              color="amber"
                              class="mr-1"
                            />
                            <strong class="text-amber-darken-2">
                              {{ company.avgRating.toFixed(1) }}
                            </strong>
                          </div>
                        </td>
                        <td class="text-right">
                          <v-chip size="small" variant="outlined" color="amber">
                            {{ company.reviewCount }}
                          </v-chip>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          
          <!-- Подробная таблица всех компаний -->
          <v-row class="mt-4">
            <v-col cols="12">
              <v-card elevation="1">
                <v-card-title class="text-subtitle-1 bg-blue-grey-lighten-5">
                  <v-icon color="blue-grey" class="mr-2">mdi-format-list-bulleted</v-icon>
                  Все компании в системе
                </v-card-title>
                <v-card-text>
                  <v-table density="comfortable">
                    <thead>
                      <tr>
                        <th>Компания</th>
                        <th class="text-right">Вакансий</th>
                        <th class="text-right">Рейтинг</th>
                        <th class="text-right">Отзывов</th>
                        <th class="text-right">Доля вакансий</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="company in allCompaniesStats" :key="company.name">
                        <td>{{ company.name }}</td>
                        <td class="text-right">
                          <strong>{{ company.vacancyCount || 0 }}</strong>
                        </td>
                        <td class="text-right">
                          <span v-if="company.avgRating > 0" class="text-amber-darken-2">
                            {{ company.avgRating.toFixed(1) }}/5.0
                          </span>
                          <span v-else class="text-grey">Нет оценок</span>
                        </td>
                        <td class="text-right">
                          {{ company.reviewCount || 0 }}
                        </td>
                        <td class="text-right">
                          {{ company.share }}%
                        </td>
                        <td>
                          <v-chip :color="getCompanyStatusColor(company)" size="small" variant="outlined">
                            {{ getCompanyStatus(company) }}
                          </v-chip>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Распределение вакансий по категориям -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="bg-indigo-darken-3 text-white pa-4">
          <v-icon class="mr-2">mdi-chart-pie</v-icon>
          Распределение вакансий по категориям
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="6">
              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th>Категория</th>
                    <th class="text-right">Кол-во</th>
                    <th class="text-right">Доля</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="category in topCategories" :key="category.name">
                    <td class="pa-2">{{ category.name }}</td>
                    <td class="text-right pa-2">
                      <strong>{{ category.count }}</strong>
                    </td>
                    <td class="text-right pa-2 text-blue-grey-darken-2">
                      {{ ((category.count / vacancies_count) * 100).toFixed(1) }}%
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center">
              <div style="height: 320px; width: 100%; position: relative;">
                <v-sparkline
                  :labels="categoryLabels"
                  :model-value="categoryValues"
                  type="bar"
                  color="indigo-darken-2"
                  height="320"
                  line-width="25"
                  padding="30"
                  show-labels
                  label-size="9"
                  smooth
                  :auto-draw="true"
                  :auto-draw-duration="1000"
                  :gradient="['#5C6BC0', '#3949AB', '#283593']"
                ></v-sparkline>
                <div class="text-center mt-2 text-caption text-blue-grey-darken-3">
                  Всего категорий: {{ category_count }} | Показано: 8 самых популярных
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Распределение вакансий по городам -->
      <v-card class="mb-6" elevation="2">
        <v-card-title class="bg-blue-grey-darken-3 text-white pa-4">
          <v-icon class="mr-2">mdi-map-marker</v-icon>
          Распределение вакансий по городам
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="4">
              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th>Город</th>
                    <th class="text-right">Вакансий</th>
                    <th class="text-right">Доля</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="location in topLocations" :key="location.name">
                    <td class="pa-2">
                      <v-icon small color="blue-grey" class="mr-1">mdi-city</v-icon>
                      {{ location.name }}
                    </td>
                    <td class="text-right pa-2">
                      <strong>{{ location.count }}</strong>
                    </td>
                    <td class="text-right pa-2 text-blue-grey-darken-2">
                      {{ ((location.count / vacancies_count) * 100).toFixed(1) }}%
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
            <v-col cols="12" md="8" class="d-flex align-center">
              <div style="height: 320px; width: 100%; position: relative;">
                <v-sparkline
                  :labels="locationLabels"
                  :model-value="locationValues"
                  type="bar"
                  color="blue-grey-darken-2"
                  height="320"
                  line-width="35"
                  padding="40"
                  show-labels
                  label-size="10"
                  smooth
                  :auto-draw="true"
                  :auto-draw-duration="1000"
                  :gradient="['#78909C', '#546E7A', '#37474F']"
                ></v-sparkline>
                <div class="text-center mt-2 text-caption text-blue-grey-darken-3">
                  Город с наибольшим количеством вакансий: <strong>{{ topLocation }}</strong> 
                  ({{ topLocationCount }} вакансий, {{ ((topLocationCount / vacancies_count) * 100).toFixed(1) }}%)
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Статистика по заявкам -->
      <v-card class="mb-6" elevation="2" v-if="applicationStatusStats.length > 0">
        <v-card-title class="bg-teal-darken-3 text-white pa-4">
          <v-icon class="mr-2">mdi-clipboard-check</v-icon>
          Статистика по заявкам соискателей
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="8">
              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th>Статус заявки</th>
                    <th class="text-right">Количество</th>
                    <th class="text-right">Процент</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="stat in applicationStatusStats" :key="stat.status">
                    <td class="pa-2">
                      <v-icon :color="getStatusColor(stat.status)" class="mr-2" size="small">
                        {{ getStatusIcon(stat.status) }}
                      </v-icon>
                      {{ stat.status }}
                    </td>
                    <td class="text-right pa-2">
                      <strong>{{ stat.count }}</strong>
                    </td>
                    <td class="text-right pa-2">
                      <v-chip size="small" :color="getStatusColor(stat.status)" variant="outlined">
                        {{ ((stat.count / applications_count) * 100).toFixed(1) }}%
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
            <v-col cols="12" md="4" class="d-flex align-center justify-center">
              <div class="text-center">
                <div class="text-h3 text-teal-darken-2">{{ applications_count }}</div>
                <div class="text-subtitle-1 text-grey-darken-1">Всего заявок</div>
                <div class="text-caption text-grey mt-2">
                  Уникальных соискателей: {{ uniqueApplicants }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Кнопка создания отчета -->
      <div class="text-center mb-6">
        <v-btn 
          color="blue-darken-3" 
          size="large" 
          @click="toPDF"
          prepend-icon="mdi-file-pdf-box"
          class="elevation-2"
        >
          <v-icon class="mr-2">mdi-file-pdf-box</v-icon>
          Создать PDF отчет
        </v-btn>
        <div class="text-caption text-grey mt-2">
          Будет создан подробный отчет с полной статистикой на английском языке
        </div>
      </div>

    </v-responsive>
  </v-container>
</template>

<script>
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import { Report } from "../services/report.service.js";

export default {
  data: () => ({
    categories: [],
    vacancies: [],
    companies: [],
    applications: [],
    feedbacks: [],
    
    category_count: 0,
    vacancies_count: 0,
    companies_count: 0,
    applications_count: 0,
    feedbacks_count: 0,
    uniqueApplicants: 0,
    averageSalary: '0',
    
    topCompanies: [],
    topRatedCompanies: [],
    allCompaniesStats: [],
    topCategories: [],
    topLocations: [],
    topLocation: '',
    topLocationCount: 0,
    experienceStats: {},
    applicationStatusStats: [],
    
    categoryLabels: [],
    categoryValues: [],
    locationLabels: [],
    locationValues: []
  }),
  
  methods: {
    getMedalColor(index) {
      const colors = ['amber', 'blue-grey', 'brown'];
      return colors[index] || 'blue-grey';
    },

    getCompanyStatus(company) {
      if (company.vacancyCount >= 10) return 'Активный';
      if (company.vacancyCount >= 5) return 'Средний';
      if (company.vacancyCount >= 1) return 'Малоактивный';
      return 'Без вакансий';
    },

    getCompanyStatusColor(company) {
      if (company.vacancyCount >= 10) return 'green';
      if (company.vacancyCount >= 5) return 'orange';
      if (company.vacancyCount >= 1) return 'blue';
      return 'grey';
    },

    getRequirementLabel(req) {
      const labels = {
        'Не имеет значения': 'Без требований',
        'Нет опыта': 'Нет опыта',
        'От 1 года до 3 лет': '1-3 года',
        'От 3 до 6 лет': '3-6 лет',
        'Более 6 лет': 'Более 6 лет'
      };
      return labels[req] || req;
    },

    getStatusColor(status) {
      const colors = {
        'На рассмотрении': 'blue',
        'Отказ': 'red',
        'Принято': 'green',
        'В процессе': 'orange'
      };
      return colors[status] || 'grey';
    },

    getStatusIcon(status) {
      const icons = {
        'На рассмотрении': 'mdi-clock',
        'Отказ': 'mdi-close-circle',
        'Принято': 'mdi-check-circle',
        'В процессе': 'mdi-progress-clock'
      };
      return icons[status] || 'mdi-information';
    },

    async getData() {
      try {
        let response = await Report.getReportData();
        if (response.err) {
          console.log("Empty report data");
          return;
        }
        
        // Сохраняем данные
        this.categories = response.categories || [];
        this.vacancies = response.vacancies || [];
        this.companies = response.companies || [];
        this.applications = response.applications || [];
        this.feedbacks = response.feebacks || [];
        
        // Основные счетчики
        this.category_count = this.categories.length;
        this.vacancies_count = this.vacancies.length;
        this.companies_count = this.companies.length;
        this.applications_count = this.applications.length;
        this.feedbacks_count = this.feedbacks.length;
        
        // Анализируем данные
        this.analyzeData();
        
      } catch (error) {
        console.error("Error loading report data:", error);
      }
    },

    analyzeData() {
      // Уникальные соискатели
      const uniqueUsers = new Set();
      this.applications.forEach(app => {
        if (app.user) {
          uniqueUsers.add(app.user.firstName + app.user.lastName);
        }
      });
      this.uniqueApplicants = uniqueUsers.size;

      // Средняя зарплата
      let totalSalary = 0;
      let salaryCount = 0;
      this.vacancies.forEach(vacancy => {
        if (vacancy.salary && !isNaN(parseFloat(vacancy.salary))) {
          totalSalary += parseFloat(vacancy.salary);
          salaryCount++;
        }
      });
      this.averageSalary = salaryCount > 0 ? `$${(totalSalary / salaryCount).toFixed(0)}` : 'N/A';

      // Статистика по требованиям опыта
      this.experienceStats = {};
      this.vacancies.forEach(vacancy => {
        const req = vacancy.requirements || 'Не указано';
        this.experienceStats[req] = (this.experienceStats[req] || 0) + 1;
      });

      // Статистика по компаниям
      const companyVacancyCount = {};
      const companyRatings = {};
      const companyReviews = {};
      
      // Считаем вакансии по компаниям
      this.vacancies.forEach(vacancy => {
        const companyName = vacancy.company?.name;
        if (companyName) {
          companyVacancyCount[companyName] = (companyVacancyCount[companyName] || 0) + 1;
        }
      });
      
      // Считаем рейтинги по компаниям
      this.feedbacks.forEach(feedback => {
        const companyName = feedback.company?.name;
        if (companyName && feedback.rating) {
          if (!companyRatings[companyName]) {
            companyRatings[companyName] = { total: 0, count: 0 };
          }
          companyRatings[companyName].total += feedback.rating;
          companyRatings[companyName].count++;
          companyReviews[companyName] = (companyReviews[companyName] || 0) + 1;
        }
      });
      
      // Топ компаний по количеству вакансий
      this.topCompanies = Object.entries(companyVacancyCount)
        .map(([name, count]) => ({
          name,
          vacancyCount: count
        }))
        .sort((a, b) => b.vacancyCount - a.vacancyCount)
        .slice(0, 5);

      // Лучшие компании по отзывам
      this.topRatedCompanies = Object.entries(companyRatings)
        .map(([name, data]) => ({
          name,
          avgRating: data.total / data.count,
          reviewCount: data.count
        }))
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 5);

      // Вся статистика по компаниям
      this.allCompaniesStats = this.companies.map(company => {
        const vacancyCount = companyVacancyCount[company.name] || 0;
        const ratingData = companyRatings[company.name];
        const avgRating = ratingData ? ratingData.total / ratingData.count : 0;
        const reviewCount = companyReviews[company.name] || 0;
        const share = this.vacancies_count > 0 ? 
          ((vacancyCount / this.vacancies_count) * 100).toFixed(1) : '0.0';
        
        return {
          name: company.name,
          vacancyCount,
          avgRating,
          reviewCount,
          share,
          description: company.description
        };
      }).sort((a, b) => b.vacancyCount - a.vacancyCount);

      // Распределение по категориям
      const categoryCount = {};
      this.vacancies.forEach(vacancy => {
        const categoryName = vacancy.category?.name;
        if (categoryName) {
          categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
        }
      });
      
      this.topCategories = Object.entries(categoryCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
      
      // Данные для графиков категорий
      this.categoryLabels = this.topCategories.map(c => {
        const shortName = c.name.split('(')[0].trim();
        return shortName.length > 12 ? shortName.substring(0, 10) + '...' : shortName;
      });
      this.categoryValues = this.topCategories.map(c => c.count);

      // Распределение по городам
      const locationCount = {};
      this.vacancies.forEach(vacancy => {
        const location = vacancy.location || 'Не указано';
        if (location) {
          locationCount[location] = (locationCount[location] || 0) + 1;
        }
      });
      
      const sortedLocations = Object.entries(locationCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
      
      this.topLocations = sortedLocations;
      this.topLocation = sortedLocations[0]?.name || 'Не указано';
      this.topLocationCount = sortedLocations[0]?.count || 0;
      
      // Данные для графиков городов
      this.locationLabels = sortedLocations.map(location => 
        location.name.length > 8 ? location.name.substring(0, 6) + '...' : location.name
      );
      this.locationValues = sortedLocations.map(location => location.count);

      // Статистика статусов заявок
      const statusCount = {};
      this.applications.forEach(app => {
        const status = app.coverLetter || 'Не указано';
        statusCount[status] = (statusCount[status] || 0) + 1;
      });
      
      this.applicationStatusStats = Object.entries(statusCount)
        .map(([status, count]) => ({ status, count }))
        .sort((a, b) => b.count - a.count);
    },

    toPDF() {
      try {
        // Подготовка данных для таблицы статистики
        const statsTable = [
          ["1", "Number of Categories", this.category_count.toString()],
          ["2", "Number of Vacancies", this.vacancies_count.toString()],
          ["3", "Number of Companies", this.companies_count.toString()],
          ["4", "Number of Applications", this.applications_count.toString()],
          ["5", "Number of Reviews", this.feedbacks_count.toString()],
          ["6", "Unique Applicants", this.uniqueApplicants.toString()],
          ["7", "Average Salary", this.averageSalary],
        ];

        const currentDate = new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        const pdf = new jsPDFInvoiceTemplate({
          outputType: OutputType.Save,
          returnJsPDFDocObject: true,
          fileName: `Vacancy_Report_${new Date().toISOString().slice(0,10)}.pdf`,
          orientationLandscape: false,
          compress: true,
          
          business: {
            name: "Vacancy Analytics System",
            address: "Minsk, Belarus",
            phone: "+375 (29) 151-37-61",
            email: "analytics@vacancy-system.by",
            website: "www.vacancy-analytics.by",
          },
          
          contact: {
            label: "Report generated:",
            name: `Date: ${currentDate}`,
            address: "For: System Administrator",
            phone: "Report type: Detailed Statistical Analysis",
            email: "vacancy@report.system",
            otherInfo: "© Vacancy Analytics",
          },
          
          invoice: {
            label: "Report No: ",
            num: Math.floor(Math.random() * 1000) + 1,
            invDate: `Analysis period: Full data set`,
            invGenDate: `Generation date: ${currentDate}`,
            headerBorder: true,
            tableBodyBorder: true,
            header: [
              {
                title: "#",
                style: {
                  width: 15,
                },
              },
              {
                title: "Metric",
                style: {
                  width: 100,
                },
              },
              {
                title: "Value",
                style: {
                  width: 40,
                },
              },
            ],
            table: statsTable,
            
            additionalRows: [
              {
                col1: "Total metrics:",
                col2: "7",
                col3: "items",
                style: {
                  fontSize: 12,
                },
              },
              {
                col1: "Data analyzed:",
                col2: `${this.vacancies_count} vacancies`,
                col3: "",
                style: {
                  fontSize: 10,
                },
              }
            ],
            
            invDescLabel: "Executive Summary",
            invDesc: `This comprehensive report contains detailed vacancy statistics based on the current system data. 
                     A total of ${this.vacancies_count} vacancies from ${this.companies_count} companies were analyzed, 
                     distributed across ${this.category_count} categories. The system received ${this.applications_count} 
                     applications from ${this.uniqueApplicants} unique candidates and ${this.feedbacks_count} company reviews. 
                     Average salary across all vacancies: ${this.averageSalary}.`,
          },
          
          footer: {
            text: `Report generated automatically. Data is current as of report generation. 
                   Confidential information. © ${new Date().getFullYear()}`,
          },
          
          pageEnable: true,
          pageLabel: "Page ",
        });

        // Получаем объект PDF для добавления дополнительных страниц
        const pdfDoc = pdf.create();
        
        // СТРАНИЦА 2: Детальная статистика по компаниям
        this.addCompanyStatisticsPage(pdfDoc);
        
        // СТРАНИЦА 3: Топ компании по вакансиям и рейтингу
        this.addTopCompaniesPage(pdfDoc);
        
        // СТРАНИЦА 4: Полный список всех компаний
        this.addAllCompaniesPage(pdfDoc);
        
        // СТРАНИЦА 5: Распределение по категориям
        this.addCategoriesPage(pdfDoc);
        
        // СТРАНИЦА 6: Распределение по городам
        this.addLocationsPage(pdfDoc);
        
        // СТРАНИЦА 7: Статистика по заявкам и итоговая сводка
        this.addApplicationsAndSummaryPage(pdfDoc);
        
        // Сохраняем PDF
        pdfDoc.save(`Vacancy_Report_${new Date().toISOString().slice(0,10)}.pdf`);
        
        console.log("PDF отчет успешно создан");
        
      } catch (error) {
        console.error("Ошибка при создании PDF:", error);
        alert("Произошла ошибка при создании отчета. Проверьте консоль для подробностей.");
      }
    },

    addCompanyStatisticsPage(pdfDoc) {
      pdfDoc.addPage();
      
      let yPos = 30;
      
      // Заголовок
      pdfDoc.setFontSize(16);
      pdfDoc.setTextColor(40, 40, 40);
      pdfDoc.text("COMPANY PERFORMANCE ANALYSIS", 20, yPos);
      
      yPos += 15;
      pdfDoc.setFontSize(10);
      pdfDoc.setTextColor(100, 100, 100);
      pdfDoc.text(`Analysis of ${this.companies_count} companies with ${this.vacancies_count} total vacancies`, 20, yPos);
      
      yPos += 20;
      
      // Ключевые показатели по компаниям
      pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(60, 60, 60);
      pdfDoc.text("KEY COMPANY METRICS:", 20, yPos);
      
      yPos += 15;
      pdfDoc.setFontSize(10);
      
      const activeCompanies = this.allCompaniesStats.filter(c => c.vacancyCount > 0).length;
      const companiesWithReviews = this.allCompaniesStats.filter(c => c.reviewCount > 0).length;
      const companiesWithHighRating = this.allCompaniesStats.filter(c => c.avgRating >= 4).length;
      
      pdfDoc.text(`• Active companies (with vacancies): ${activeCompanies} (${((activeCompanies / this.companies_count) * 100).toFixed(1)}%)`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Companies with reviews: ${companiesWithReviews} (${((companiesWithReviews / this.companies_count) * 100).toFixed(1)}%)`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Companies with high rating (4+): ${companiesWithHighRating}`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Average vacancies per company: ${(this.vacancies_count / this.companies_count).toFixed(1)}`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Average rating across all companies: ${this.calculateAverageRating().toFixed(2)}/5.0`, 25, yPos);
      
      yPos += 15;
      
      // Распределение компаний по активности
      pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(60, 60, 60);
      pdfDoc.text("COMPANY ACTIVITY DISTRIBUTION:", 20, yPos);
      
      yPos += 15;
      pdfDoc.setFontSize(10);
      
      const highlyActive = this.allCompaniesStats.filter(c => c.vacancyCount >= 10).length;
      const moderatelyActive = this.allCompaniesStats.filter(c => c.vacancyCount >= 5 && c.vacancyCount < 10).length;
      const lowActive = this.allCompaniesStats.filter(c => c.vacancyCount >= 1 && c.vacancyCount < 5).length;
      const inactive = this.allCompaniesStats.filter(c => c.vacancyCount === 0).length;
      
      pdfDoc.text(`• Highly active (10+ vacancies): ${highlyActive} companies`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Moderately active (5-9 vacancies): ${moderatelyActive} companies`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Low active (1-4 vacancies): ${lowActive} companies`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Inactive (0 vacancies): ${inactive} companies`, 25, yPos);
      
      yPos += 15;
      
      // Анализ рейтингов
      pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(60, 60, 60);
      pdfDoc.text("RATING ANALYSIS:", 20, yPos);
      
      yPos += 15;
      pdfDoc.setFontSize(10);
      
      const excellentRating = this.allCompaniesStats.filter(c => c.avgRating >= 4.5).length;
      const goodRating = this.allCompaniesStats.filter(c => c.avgRating >= 3.5 && c.avgRating < 4.5).length;
      const averageRating = this.allCompaniesStats.filter(c => c.avgRating >= 2.5 && c.avgRating < 3.5).length;
      const poorRating = this.allCompaniesStats.filter(c => c.avgRating > 0 && c.avgRating < 2.5).length;
      const noRating = this.allCompaniesStats.filter(c => c.avgRating === 0).length;
      
      pdfDoc.text(`• Excellent (4.5+): ${excellentRating} companies`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Good (3.5-4.4): ${goodRating} companies`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Average (2.5-3.4): ${averageRating} companies`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• Poor (1.0-2.4): ${poorRating} companies`, 25, yPos);
      yPos += 8;
      pdfDoc.text(`• No reviews: ${noRating} companies`, 25, yPos);
    },

    addTopCompaniesPage(pdfDoc) {
      pdfDoc.addPage();
      
      let yPos = 30;
      
      // Топ компаний по вакансиям
      pdfDoc.setFontSize(16);
      pdfDoc.setTextColor(40, 40, 40);
      pdfDoc.text("TOP COMPANIES BY VACANCIES", 20, yPos);
      
      yPos += 15;
      pdfDoc.setFontSize(10);
      pdfDoc.setTextColor(100, 100, 100);
      pdfDoc.text(`Top 5 companies with highest number of vacancies`, 20, yPos);
      
      yPos += 20;
      
      // Заголовок таблицы
      pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(255, 255, 255);
      pdfDoc.setFillColor(39, 174, 96);
      pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
      pdfDoc.text("#", 25, yPos);
      pdfDoc.text("Company Name", 35, yPos);
      pdfDoc.text("Vacancies", 130, yPos);
      pdfDoc.text("Share", 150, yPos);
      pdfDoc.text("Percentage", 170, yPos);
      
      yPos += 15;
      
      // Данные таблицы
      pdfDoc.setFontSize(10);
      pdfDoc.setTextColor(0, 0, 0);
      
      this.topCompanies.forEach((company, index) => {
        const share = ((company.vacancyCount / this.vacancies_count) * 100).toFixed(1);
        const percentage = `${share}%`;
        
        // Чередование цвета строк
        if (index % 2 === 0) {
          pdfDoc.setFillColor(245, 245, 245);
          pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
        }
        
        pdfDoc.text((index + 1).toString(), 25, yPos);
        pdfDoc.text(company.name.length > 35 ? company.name.substring(0, 32) + '...' : company.name, 35, yPos);
        pdfDoc.text(company.vacancyCount.toString(), 130, yPos);
        pdfDoc.text(share, 150, yPos);
        pdfDoc.text(percentage, 170, yPos);
        
        yPos += 12;
      });
      
      yPos += 20;
      
      // Топ компаний по рейтингу
      pdfDoc.setFontSize(16);
      pdfDoc.setTextColor(40, 40, 40);
      pdfDoc.text("TOP COMPANIES BY RATING", 20, yPos);
      
      yPos += 15;
      pdfDoc.setFontSize(10);
      pdfDoc.setTextColor(100, 100, 100);
      pdfDoc.text(`Top 5 companies with highest user ratings`, 20, yPos);
      
      yPos += 20;
      
      // Заголовок таблицы
      pdfDoc.setFontSize(12);
      pdfDoc.setTextColor(0, 0, 0);
      pdfDoc.setFillColor(241, 196, 15);
      pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
      pdfDoc.text("#", 25, yPos);
      pdfDoc.text("Company Name", 35, yPos);
      pdfDoc.text("Rating", 130, yPos);
      pdfDoc.text("Reviews", 150, yPos);
      pdfDoc.text("Stars", 170, yPos);
      
      yPos += 15;
      
      // Данные таблицы
      pdfDoc.setFontSize(10);
      
      this.topRatedCompanies.forEach((company, index) => {
        // Чередование цвета строк
        if (index % 2 === 0) {
          pdfDoc.setFillColor(245, 245, 245);
          pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
        }
        
        const companyName = company.name.length > 30 ? company.name.substring(0, 27) + '...' : company.name;
        pdfDoc.text((index + 1).toString(), 25, yPos);
        pdfDoc.text(companyName, 35, yPos);
        pdfDoc.text(company.avgRating.toFixed(2), 130, yPos);
        pdfDoc.text(company.reviewCount.toString(), 150, yPos);
        
        // Звезды рейтинга
        const stars = '★'.repeat(Math.floor(company.avgRating));
        const halfStar = company.avgRating % 1 >= 0.5 ? '½' : '';
        pdfDoc.text(stars + halfStar, 170, yPos);
        
        yPos += 12;
      });
    },

    addAllCompaniesPage(pdfDoc) {
      pdfDoc.addPage();
      
      let yPos = 30;
      
      // Заголовок
      pdfDoc.setFontSize(16);
      pdfDoc.setTextColor(40, 40, 40);
      pdfDoc.text("COMPLETE COMPANY LIST", 20, yPos);
      
      yPos += 15;
      pdfDoc.setFontSize(10);
      pdfDoc.setTextColor(100, 100, 100);
      pdfDoc.text(`All ${this.companies_count} companies in the system`, 20, yPos);
      
      yPos += 20;
      
      // Заголовок таблицы
      pdfDoc.setFontSize(11);
      pdfDoc.setTextColor(255, 255, 255);
      pdfDoc.setFillColor(66, 66, 66);
      pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
      pdfDoc.text("Company", 25, yPos);
      pdfDoc.text("Vac", 110, yPos);
      pdfDoc.text("Rating", 120, yPos);
      pdfDoc.text("Rev", 135, yPos);
      pdfDoc.text("Share", 145, yPos);
      pdfDoc.text("Status", 160, yPos);
      
      yPos += 15;
      
      // Данные таблицы
      pdfDoc.setFontSize(9);
      pdfDoc.setTextColor(0, 0, 0);
      
      this.allCompaniesStats.forEach((company, index) => {
        // Чередование цвета строк
        if (index % 2 === 0) {
          pdfDoc.setFillColor(245, 245, 245);
          pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
        }
        
        const companyName = company.name.length > 25 ? company.name.substring(0, 22) + '...' : company.name;
        pdfDoc.text(companyName, 25, yPos);
        pdfDoc.text(company.vacancyCount.toString(), 110, yPos);
        
        if (company.avgRating > 0) {
          pdfDoc.text(company.avgRating.toFixed(1), 120, yPos);
        } else {
          pdfDoc.text("-", 120, yPos);
        }
        
        pdfDoc.text(company.reviewCount.toString(), 135, yPos);
        pdfDoc.text(company.share + '%', 145, yPos);
        
        // Статус компании
        let status = '';
        let statusColor = [200, 200, 200];
        
        if (company.vacancyCount >= 10) {
          status = 'Active';
          statusColor = [76, 175, 80];
        } else if (company.vacancyCount >= 5) {
          status = 'Medium';
          statusColor = [255, 152, 0];
        } else if (company.vacancyCount >= 1) {
          status = 'Low';
          statusColor = [33, 150, 243];
        } else {
          status = 'None';
          statusColor = [158, 158, 158];
        }
        
        pdfDoc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
        pdfDoc.text(status, 160, yPos);
        pdfDoc.setTextColor(0, 0, 0);
        
        yPos += 10;
        
        // Проверяем, не выходим ли за пределы страницы
        if (yPos > 270) {
          pdfDoc.addPage();
          yPos = 30;
          
          // Повторяем заголовок на новой странице
          pdfDoc.setFontSize(11);
          pdfDoc.setTextColor(255, 255, 255);
          pdfDoc.setFillColor(66, 66, 66);
          pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
          pdfDoc.text("Company", 25, yPos);
          pdfDoc.text("Vac", 110, yPos);
          pdfDoc.text("Rating", 120, yPos);
          pdfDoc.text("Rev", 135, yPos);
          pdfDoc.text("Share", 145, yPos);
          pdfDoc.text("Status", 160, yPos);
          
          yPos += 15;
          pdfDoc.setFontSize(9);
        }
      });
    },

    addCategoriesPage(pdfDoc) {
      if (this.topCategories.length > 0) {
        pdfDoc.addPage();
        
        let yPos = 30;
        
        // Заголовок
        pdfDoc.setFontSize(16);
        pdfDoc.setTextColor(40, 40, 40);
        pdfDoc.text("VACANCY DISTRIBUTION BY CATEGORY", 20, yPos);
        
        yPos += 15;
        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(100, 100, 100);
        pdfDoc.text(`Top 8 categories out of ${this.category_count} total categories`, 20, yPos);
        
        yPos += 20;
        
        // Заголовок таблицы
        pdfDoc.setFontSize(12);
        pdfDoc.setTextColor(255, 255, 255);
        pdfDoc.setFillColor(142, 68, 173);
        pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
        pdfDoc.text("#", 25, yPos);
        pdfDoc.text("Category", 35, yPos);
        pdfDoc.text("Vacancies", 130, yPos);
        pdfDoc.text("Percentage", 150, yPos);
        pdfDoc.text("Share", 170, yPos);
        
        yPos += 15;
        
        // Данные таблицы
        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(0, 0, 0);
        
        this.topCategories.forEach((category, index) => {
          const percentage = ((category.count / this.vacancies_count) * 100).toFixed(1);
          
          // Чередование цвета строк
          if (index % 2 === 0) {
            pdfDoc.setFillColor(245, 245, 245);
            pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
          }
          
          const categoryName = category.name.length > 45 ? category.name.substring(0, 42) + '...' : category.name;
          pdfDoc.text((index + 1).toString(), 25, yPos);
          pdfDoc.text(categoryName, 35, yPos);
          pdfDoc.text(category.count.toString(), 130, yPos);
          pdfDoc.text(percentage + '%', 150, yPos);
          pdfDoc.text(percentage, 170, yPos);
          
          yPos += 12;
        });
        
        // Дополнительная информация
        yPos += 15;
        pdfDoc.setFontSize(11);
        pdfDoc.setTextColor(60, 60, 60);
        pdfDoc.text("Category Analysis:", 20, yPos);
        
        yPos += 10;
        pdfDoc.setFontSize(10);
        pdfDoc.text(`• Most popular category: "${this.topCategories[0]?.name}" (${this.topCategories[0]?.count} vacancies)`, 25, yPos);
        yPos += 8;
        pdfDoc.text(`• Top 3 categories account for ${this.calculateTopCategoriesShare(3)}% of all vacancies`, 25, yPos);
        yPos += 8;
        pdfDoc.text(`• Top 8 categories account for ${this.calculateTopCategoriesShare(8)}% of all vacancies`, 25, yPos);
      }
    },

    addLocationsPage(pdfDoc) {
      if (this.topLocations.length > 0) {
        pdfDoc.addPage();
        
        let yPos = 30;
        
        // Заголовок
        pdfDoc.setFontSize(16);
        pdfDoc.setTextColor(40, 40, 40);
        pdfDoc.text("GEOGRAPHICAL DISTRIBUTION", 20, yPos);
        
        yPos += 15;
        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(100, 100, 100);
        pdfDoc.text(`Vacancies distributed across ${this.topLocations.length} different locations`, 20, yPos);
        
        yPos += 20;
        
        // Заголовок таблицы
        pdfDoc.setFontSize(12);
        pdfDoc.setTextColor(255, 255, 255);
        pdfDoc.setFillColor(96, 125, 139);
        pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
        pdfDoc.text("#", 25, yPos);
        pdfDoc.text("Location", 35, yPos);
        pdfDoc.text("Vacancies", 130, yPos);
        pdfDoc.text("Percentage", 150, yPos);
        pdfDoc.text("Share", 170, yPos);
        
        yPos += 15;
        
        // Данные таблицы
        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(0, 0, 0);
        
        this.topLocations.forEach((location, index) => {
          const percentage = ((location.count / this.vacancies_count) * 100).toFixed(1);
          
          // Чередование цвета строк
          if (index % 2 === 0) {
            pdfDoc.setFillColor(245, 245, 245);
            pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
          }
          
          pdfDoc.text((index + 1).toString(), 25, yPos);
          pdfDoc.text(location.name, 35, yPos);
          pdfDoc.text(location.count.toString(), 130, yPos);
          pdfDoc.text(percentage + '%', 150, yPos);
          pdfDoc.text(percentage, 170, yPos);
          
          yPos += 12;
        });
        
        // Дополнительная информация
        yPos += 15;
        pdfDoc.setFontSize(11);
        pdfDoc.setTextColor(60, 60, 60);
        pdfDoc.text("Geographical Insights:", 20, yPos);
        
        yPos += 10;
        pdfDoc.setFontSize(10);
        pdfDoc.text(`• Top location: "${this.topLocation}" with ${this.topLocationCount} vacancies`, 25, yPos);
        yPos += 8;
        pdfDoc.text(`• ${this.topLocation} accounts for ${((this.topLocationCount / this.vacancies_count) * 100).toFixed(1)}% of all vacancies`, 25, yPos);
      }
    },

    addApplicationsAndSummaryPage(pdfDoc) {
      pdfDoc.addPage();
      
      let yPos = 30;
      
      // Заголовок
      pdfDoc.setFontSize(16);
      pdfDoc.setTextColor(40, 40, 40);
      pdfDoc.text("APPLICATIONS AND FINAL SUMMARY", 20, yPos);
      
      yPos += 20;
      
      // Статусы заявок
      if (this.applicationStatusStats.length > 0) {
        pdfDoc.setFontSize(12);
        pdfDoc.setTextColor(255, 255, 255);
        pdfDoc.setFillColor(0, 150, 136);
        pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
        pdfDoc.text("Application Status", 25, yPos);
        pdfDoc.text("Count", 130, yPos);
        pdfDoc.text("Percentage", 150, yPos);
        pdfDoc.text("Share", 170, yPos);
        
        yPos += 15;
        
        // Данные таблицы
        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(0, 0, 0);
        
        this.applicationStatusStats.forEach((stat, index) => {
          const percentage = ((stat.count / this.applications_count) * 100).toFixed(1);
          
          // Чередование цвета строк
          if (index % 2 === 0) {
            pdfDoc.setFillColor(245, 245, 245);
            pdfDoc.rect(20, yPos - 5, 170, 10, 'F');
          }
          
          pdfDoc.text(stat.status, 25, yPos);
          pdfDoc.text(stat.count.toString(), 130, yPos);
          pdfDoc.text(percentage + '%', 150, yPos);
          pdfDoc.text(percentage, 170, yPos);
          
          yPos += 12;
        });
        
        yPos += 10;
      }
      
      // Финальная сводка
      pdfDoc.setFontSize(14);
      pdfDoc.setTextColor(40, 40, 40);
      pdfDoc.text("COMPREHENSIVE EXECUTIVE SUMMARY", 20, yPos);
      
      yPos += 20;
      pdfDoc.setFontSize(10);
      pdfDoc.setTextColor(60, 60, 60);
      
      // Ключевые выводы
      pdfDoc.text("KEY FINDINGS:", 20, yPos);
      yPos += 10;
      
      if (this.topCompanies.length > 0) {
        pdfDoc.text(`• Market Leader: ${this.topCompanies[0].name} dominates with ${this.topCompanies[0].vacancyCount} vacancies (${((this.topCompanies[0].vacancyCount / this.vacancies_count) * 100).toFixed(1)}% share)`, 25, yPos);
        yPos += 8;
      }
      
      if (this.topRatedCompanies.length > 0) {
        pdfDoc.text(`• Top Rated: ${this.topRatedCompanies[0].name} has the highest rating of ${this.topRatedCompanies[0].avgRating.toFixed(2)}/5.0`, 25, yPos);
        yPos += 8;
      }
      
      if (this.topCategories.length > 0) {
        pdfDoc.text(`• Most In-Demand: ${this.topCategories[0].name} is the most popular category`, 25, yPos);
        yPos += 8;
      }
      
      pdfDoc.text(`• Geographical Concentration: ${this.topLocation} is the main hub with ${((this.topLocationCount / this.vacancies_count) * 100).toFixed(1)}% of vacancies`, 25, yPos);
      yPos += 8;
      
      pdfDoc.text(`• Application Rate: ${this.applications_count} applications from ${this.uniqueApplicants} unique candidates`, 25, yPos);
      yPos += 8;
      
      pdfDoc.text(`• Review Engagement: ${this.feedbacks_count} reviews collected from candidates`, 25, yPos);
      yPos += 8;
      
      // Рекомендации
      yPos += 10;
      pdfDoc.setFontSize(11);
      pdfDoc.setTextColor(60, 60, 60);
      pdfDoc.text("RECOMMENDATIONS:", 20, yPos);
      
      yPos += 10;
      pdfDoc.setFontSize(10);
      pdfDoc.text("1. Focus on popular categories to attract more candidates", 25, yPos);
      yPos += 8;
      pdfDoc.text("2. Encourage more companies to get reviews for better transparency", 25, yPos);
      yPos += 8;
      pdfDoc.text("3. Expand geographical presence beyond the main hub", 25, yPos);
      yPos += 8;
      pdfDoc.text("4. Improve application response time to increase candidate satisfaction", 25, yPos);
      
      // Информация о отчете
      yPos += 20;
      pdfDoc.setFontSize(9);
      pdfDoc.setTextColor(100, 100, 100);
      const currentDate = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      pdfDoc.text(`Report generated on: ${currentDate}`, 20, yPos);
      yPos += 6;
      pdfDoc.text(`Total pages: ${pdfDoc.getNumberOfPages()}`, 20, yPos);
      
      // Footer
      pdfDoc.setFontSize(8);
      pdfDoc.setTextColor(150, 150, 150);
      pdfDoc.text('Confidential - For Internal Use Only', 20, 280);
      pdfDoc.text(`© ${new Date().getFullYear()} Vacancy Analytics System - End of Report`, 140, 280);
    },

    calculateAverageRating() {
      if (this.feedbacks_count === 0) return 0;
      const totalRating = this.feedbacks.reduce((sum, fb) => sum + (fb.rating || 0), 0);
      return totalRating / this.feedbacks_count;
    },

    calculateTopCategoriesShare(count) {
      if (this.topCategories.length === 0) return 0;
      const topCount = this.topCategories.slice(0, count).reduce((sum, cat) => sum + cat.count, 0);
      return ((topCount / this.vacancies_count) * 100).toFixed(1);
    }
  },

  async mounted() {
    await this.getData();
  },
};
</script>

<style scoped>
.stat-card {
  border-radius: 8px;
  transition: box-shadow 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.text-h4 {
  font-size: 2.5rem !important;
  letter-spacing: -0.5px;
}

.v-table {
  border-radius: 4px;
  overflow: hidden;
}

.v-card-title {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.v-card-text {
  background-color: #fafafa;
}

.h-100 {
  height: 100%;
}
</style>