<template>
  <v-responsive>
    <v-layout>
      <v-main class="mx-3 py-5">
        <v-card class="mx-auto" variant="text" max-width="900">
          <h3
            class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
          >
            Мои резюме
            <v-btn variant="outlined" to="/create-resume"> Создать резюме</v-btn>
          </h3>
        </v-card>
        <v-fade-transition>
          <div v-if="show" class="my-box">
            <v-data-iterator
              :items="items"
              :items-per-page="itemsPerPage"
              class="mx-auto"
              variant="text"
              max-width="900"
            >
              <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
                <h1
                  class="text-h4 font-weight-bold d-flex mb-4 align-center"
                >
                  <div class="mx-auto" variant="text" max-width="900">
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
              </template>

              <template v-slot:default="{ items }"  class="mx-auto"
        variant="text"
        max-width="900">
                <v-row>
                  <v-col v-for="(item, i) in items" :key="i" cols="12" sm="12" xl="3">
                    <v-sheet border class="mx-auto" variant="text" max-width="900">
                      <v-list-item
                        :title="item.raw"
                        :href="`/applicant?id=${item.raw.id}`"
                        density="comfortable"
                        lines="two"
                        subtitle="Резюме"
                      >
                        <template v-slot:title>
                          <strong class="text-h6">
                            {{ item.raw.title }}
                          </strong>
                        </template>
                      </v-list-item>

                      <v-table class="text-caption" density="compact">
                        <tbody>
                          <!-- {{
                            item.raw
                          }} -->

                          <tr align="right">
                            <th>Описание: {{ item.raw.description }}</th>
                            <td></td>
                          </tr>

                          <tr align="right">
                            <th>
                              <v-icon icon="mdi-cash" size="large"></v-icon>
                              {{ item.raw.salary }}
                            </th>
                            <td></td>
                          </tr>

                          <!-- <tr align="right">
                              <th> <v-icon icon="mdi-account-group" size="large"></v-icon> {{ item.raw.category }}
                              </th>
                              <td></td>
                            </tr> -->

                          <tr align="right">
                            <th>
                              <v-icon icon="mdi-school" size="large"></v-icon>
                              {{ item.raw.skills }}
                            </th>
                            <td></td>
                          </tr>
                          <tr align="right">
                            <th>
                              <v-icon icon="mdi-phone" size="large"></v-icon>
                              {{ item.raw.contacts }}
                            </th>
                            <td></td>
                          </tr>

                          <v-btn variant="outlined" class="my-3 mx-3" @click="deleteItem(item.raw.id)"
                            >Удалить
                          </v-btn>

                           <v-btn variant="outlined"  :href="`/edit-resume?id=${item.raw.id}`"
                            >Редактировать
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
                  Всего резюме: {{ items.length }}

                  <div>Страница {{ page }} из {{ pageCount }}</div>
                </v-footer>
              </template>
            </v-data-iterator>
          </div>
        </v-fade-transition>
      </v-main>
    </v-layout>
  </v-responsive>
</template>

<script>
console.log();
import { Advert } from "../services/advert.service.js";

export default {
  data: () => ({
    show: false,
    items: [],
    itemsPerPage: 4,
    dialog: false,

    username: localStorage.getItem("email"),
  }),
  methods: {
    async loadMyAdverts() {
      let data = {
        email: localStorage.getItem("email"),
      };
      let response = await Advert.loadMyAdverts(data);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        this.items = response.reverse();
        console.log(response.reverse());
      }
      setTimeout(() => {
        this.show = true;
      }, 300);
    },

    onClickSeeAll() {
      this.itemsPerPage = this.itemsPerPage === 4 ? this.my_adverts.length : 12;
    },

    async deleteItem(id) {
      //this.dialog = false
      console.log(id);
      let response = await Advert.deleteAdvert(id);

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
