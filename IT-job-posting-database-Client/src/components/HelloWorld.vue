<template class="bg-red" >
  <v-container class="fill-height bg-red-lighten-5" style="background-image: url('../public/main.png');  border-radius:25px;background-size:cover;">
    <div class="text-h3 bg-red">IT Вакансии для каждого!</div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card subtitle="Просмотр доступных вакансий"
          text="Система предоставляет удобный интерфейс для поиска вакансий по различным критериям, включая местоположение, зарплату и требования."
          title="Каталог вакансий">
        </v-card>

        <!-- <div class="text-center text-caption">ГЛАВНАЯ СТРАНИЦА</div> -->
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <template v-slot:title>
            Управление откликами
          </template>

          <template v-slot:subtitle>
            Удобная работа с резюме кандидатов
          </template>

          <template v-slot:text>
            HR-менеджеры могут просматривать отклики на вакансии, фильтровать их по критериям
          </template>
        </v-card>

        <!-- <div class="text-center text-caption">Использование слотами</div> -->
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-item>
            <v-card-title>Анализ эффективности</v-card-title>
            <v-card-subtitle>Генерация отчетов</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            Система позволяет генерировать аналитические отчеты по ключевым метрикам найма, включая количество откликов,
            успешных собеседований и занятых позиций.
          </v-card-text>
        </v-card>

        <!-- <div class="text-center text-caption">Только разметка</div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Advert } from "../services/advert.service.js";

export default {
  data: () => ({
    tab: null,
    sort: null,

    adverts: [],
    itemsPerPage: 8,
    clear_filter_show: false,

    brand_filter: null,
  }),
  methods: {
    // sortingHigher() {
    //   this.clear_filter_show = true;
    //   const current_adv = this.adverts
    //   this.adverts = current_adv.sort((a, b) => b.price - a.price);
    // },
    // sortingCheaper() {
    //   this.clear_filter_show = true;
    //   const current_adv = this.adverts
    //   this.adverts = current_adv.sort((a, b) => a.price - b.price)
    // },
    // sortingNewer() {
    //   this.clear_filter_show = true;
    //   const current_adv = this.adverts
    //   this.adverts = current_adv.sort((a, b) => b.age - a.age)
    // },
    // sortingMaileage() {
    //   this.clear_filter_show = true;
    //   const current_adv = this.adverts
    //   this.adverts = current_adv.sort((a, b) => a.mile_age - b.mile_age)
    // },


    // async brand_filter_func() {
    //   if (this.brand_filter != null) {
    //     await this.loadAdverts();
    //     this.clear_filter_show = true;
    //     const current_adv = this.adverts

    //     this.adverts = current_adv.filter(car => car.brand == this.brand_filter);

    //   } else {
    //     console.log(null)
    //   }
    // },

    // async clear_filter_func() {
    //   this.clear_filter_show = false
    //   this.brand_filter = null
    //   await this.loadAdverts();


    // },

    // async loadAdverts() {
    //   let response = await Advert.allAdverts();
    //   if (response.err) {
    //     console.log("Empty");
    //   } else {
    //     this.adverts = response;
    //     console.log(response)
    //   }
    // },




  },

  async created() {
    //await this.loadAdverts();

  },
};


</script>
