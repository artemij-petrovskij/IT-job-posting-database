<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <!-- <v-card title="Тайтл" class="mx-auto" max-width="700" variant="outlined">

            </v-card> -->

      <v-card class="mx-auto my-8" variant="outlined">
        <v-card-item>
          <v-card-title>
            <div class="text-h4 text-left">Кандидат: {{ current_advert.title }}</div>
            <v-avatar size="100"
              :image="`https://randomuser.me/api/portraits/women/${Math.round(Math.random() * 100)}.jpg`"></v-avatar>
            <!-- <v-list-item size="100" style="width:500px;"
              :prepend-avatar="`https://randomuser.me/api/portraits/women/5.jpg`" :subtitle="username"
              title="Пользователь"></v-list-item> -->
          </v-card-title>
          <v-card-subtitle>
            <p class="text-h5 text-left">Заработная плата: {{ current_advert.salary }}</p>

            <p class="text-caption text-left">{{ current_advert.updatedAt }}</p>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <p class="text-body-1 text-left">Навыки: {{ current_advert.skills }}</p>
          <p class="text-body-1 text-left">О себе: {{ current_advert.description }}</p>
          <p class="text-body-1 text-left">Контакты: {{ current_advert.contacts }}</p>
          <p class="text-body-1 text-left"></p>
        </v-card-text>
        <v-card-item>
          <!-- <v-img
            :gradient="`to top right, rgba(255, 255, 255, .1), rgba(14, 151, 210, .15)`"
            :src="current_advert.image"
            cover
          ></v-img> -->
        </v-card-item>

        <!--  <v-card-title> Характеристики </v-card-title>
        <v-table>
          <tbody>
            <tr>
              <td class="text-left">Бренд</td>
              <td class="text-left">{{ current_advert.brand }}</td>
            </tr>
            <tr>
              <td class="text-left">Марка</td>
              <td class="text-left">{{ current_advert.model }}</td>
            </tr>
            <tr>
              <td class="text-left">Пробег, км</td>
              <td class="text-left">{{ current_advert.mile_age }}</td>
            </tr>
            <tr>
              <td class="text-left">Тип кузова</td>
              <td class="text-left">{{ current_advert.body_type }}</td>
            </tr>
            <tr>
              <td class="text-left">Год</td>
              <td class="text-left">{{ current_advert.age }}</td>
            </tr>
            <tr>
              <td class="text-left">Цвет</td>
              <td class="text-left">{{ current_advert.color }}</td>
            </tr>
          </tbody>
        </v-table> -->
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script>
import { Advert } from "../services/advert.service.js";

export default {
  data: () => ({
    current_advert: "",
  }),
  methods: {
    async loadAdvert() {
      const id = this.$route.query.id;
      console.log(id);
      let response = await Advert.getOneAdvert(id);
      this.current_advert = response;
    },
  },

  async created() {
    await this.loadAdvert();
  },
};
</script>
