<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <v-card class="mx-auto my-8" variant="outlined">
        <v-card-item>
          <v-card-title>
            <div class="text-h4 text-left">Кандидат: {{ current_advert.title }}</div>
            <v-avatar
              size="100"
              :image="`https://randomuser.me/api/portraits/women/${Math.round(
                Math.random() * 100
              )}.jpg`"
            ></v-avatar>
          </v-card-title>
          <v-card-subtitle>
            <p class="text-h5 text-left">Заработная плата: {{ current_advert.salary }}</p>

            <p class="text-caption text-left">{{ current_advert.updatedAt }}</p>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-list-item density="comfortable" lines="two" subtitle="">
            <template v-slot:title>
              <pre> О себе: {{ current_advert.skills }}</pre>
            </template>

            <v-textarea
              readonly
              variant="outlined"
              elevation="0"
              :model-value="current_advert.skills"
            ></v-textarea>
          </v-list-item>
          <p class="text-body-1 text-left">Навыки: {{ current_advert.skills }}</p>
          <p class="text-body-1 text-left">О себе: {{ current_advert.description }}</p>
          <p class="text-body-1 text-left">Контакты: {{ current_advert.contacts }}</p>
          <p class="text-body-1 text-left"></p>
        </v-card-text>
        <v-card-item> </v-card-item>
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
