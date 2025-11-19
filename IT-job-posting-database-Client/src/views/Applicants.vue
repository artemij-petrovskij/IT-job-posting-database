<template>
  <v-responsive>
    <v-card>
      <v-layout>
        <v-main>
          <v-data-iterator :items="items" :items-per-page="itemsPerPage" style="padding: 40px">
            <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
              <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
                <div class="text-truncate">Резюме</div>

                <div class="d-flex align-center">
                  <v-btn class="me-8" variant="text" @click="onClickSeeAll">
                    <span class="text-decoration-underline text-none">Посмотреть все</span>
                  </v-btn>

                  <div class="d-inline-flex">
                    <v-btn :disabled="page === 1" class="me-2" icon="mdi-arrow-left" size="small" variant="tonal"
                      @click="prevPage"></v-btn>

                    <v-btn :disabled="page === pageCount" icon="mdi-arrow-right" size="small" variant="tonal"
                      @click="nextPage"></v-btn>
                  </div>
                </div>
              </h1>
            </template>

            <template v-slot:default="{ items }">
              <v-row>

                <v-col v-for="(item, i) in items" :key="i" cols="12" sm="12" xl="3">
                  <v-sheet border>


                    <v-list-item :title="item.raw.name" :href="`/applicant?id=${item.raw.id}`" density="comfortable"
                      lines="two" subtitle="Резюме">
                      <template v-slot:title>

                        <strong class="text-h6">
                          {{ item.raw.title }}
                        </strong>

                      </template>
                    </v-list-item>

                    <v-table class="text-caption" density="compact">
                      <tbody>
                        <tr align="right">
                          <th>Нвыки: {{ item.raw.skills }}</th>

                          <td></td>
                        </tr>

                        <tr align="right">
                          <th>Описание: {{ item.raw.description }}</th>

                          <td></td>
                        </tr>

                        <tr align="right">
                          <th>Желаемая заработная плата: {{ item.raw.salary }}</th>

                          <td></td>
                        </tr>


                        <tr align="right">
                          <th>Контакты: {{ item.raw.contacts }}</th>

                          <td></td>
                        </tr>



                      </tbody>
                    </v-table>
                  </v-sheet>
                </v-col>
              </v-row>
            </template>

            <template v-slot:footer="{ page, pageCount }">
              <v-footer class="justify-space-between text-body-2 mt-4" color="surface-variant">
                Вего резюме: {{ items.length }}

                <div>Страница {{ page }} из {{ pageCount }}</div>
              </v-footer>
            </template>
          </v-data-iterator>
        </v-main>
      </v-layout>
    </v-card>
  </v-responsive>
</template>

<script>
import { Advert } from "../services/advert.service.js";

export default {
  data: () => ({
    items: [],
    itemsPerPage: 4,
    dialog: false,
    overlay: true,
    username: localStorage.getItem("email"),
  }),
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
        console.log(response.reverse());
      }
    },

    onClickSeeAll() {
      this.itemsPerPage = this.itemsPerPage === 4 ? this.items.length : 4;
    },
    async deleteItem(id) {
      this.dialog = false;
      let response = await Advert.loadMyAdvertsTN(id);
      console.log(response);
      await this.loadMyAdverts();
      // await this.loadTN()
      // await this.loadPKO()
      // await this.loadRKO()
      // await this.loadPNA()
      // await this.loadPSO()
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
