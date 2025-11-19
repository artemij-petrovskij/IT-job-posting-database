<template>
  <v-responsive>
    <v-card>
      <v-layout>  
        <v-navigation-drawer expand-on-hover rail>
          <v-list>
            <v-list-item :prepend-avatar="`https://randomuser.me/api/portraits/women/5.jpg`" :subtitle="username"
              title="Пользователь"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" @click="loadMyAdverts()" value="TTN">
              <v-list-item-title>
               
              </v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-folder" @click="loadTN()" value="TN">
              <v-list-item-title>
              
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item prepend-icon="mdi-folder" @click="loadPKO()" value="PKO">
              <v-list-item-title>
                
              </v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-folder" @click="loadRKO()" value="RKO">
              <v-list-item-title>
              
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item prepend-icon="mdi-folder" @click="loadPSO()" value="PSO">
              <v-list-item-title>
              
              </v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-folder" @click="loadPNA()" value="PNA">
              <v-list-item-title>
               
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height:1800px;">

          <br>

          <v-divider>router-view</v-divider>

          <router-view></router-view>


          <v-data-iterator :items="items" :items-per-page="itemsPerPage">
            <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
              <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
                <div class="text-truncate">
                  <!-- Легковые авто -->
                </div>

                <div class="d-flex align-center">
                  <v-btn class="me-8" variant="text" @click="onClickSeeAll">
                    <span class="text-decoration-underline text-none"></span>
                  </v-btn>

                  <div class="d-inline-flex">
                    <v-btn :disabled="page === 1" icon="mdi-arrow-left" size="small" variant="tonal" class="me-2"
                      @click="prevPage"></v-btn>

                    <v-btn :disabled="page === pageCount" icon="mdi-arrow-right" size="small" variant="tonal"
                      @click="nextPage"></v-btn>
                  </div>

                </div>

              </h1>
            </template>

            <template v-slot:default="{ items }">

              <v-row>
                <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" xl="3"
                  href="https://github.com/vuetifyjs/vuetify/">

                  <v-sheet border>
                    <!-- :href="`/advert?_id=${item.raw._id}`" -->
                    <v-card>
                      <!-- <v-img :gradient="`to top right, rgba(255, 255, 255, .1), rgba(14, 151, 210, .15)`"
                        :src="item.raw.image" cover height="350"></v-img> -->

                      <v-table density="compact" class="text-caption">



                        <v-expansion-panels>

                          <v-expansion-panel>

                            <v-expansion-panel-title><b>{{ item.raw.title }}</b> &nbsp; от {{ item.raw.firstName }}.
                              Создатель {{
                                item.raw.creator }}</v-expansion-panel-title>

                            <v-expansion-panel-text>
                              {{ item.raw }}
                            </v-expansion-panel-text>

                          </v-expansion-panel>
                        </v-expansion-panels>



                      </v-table>
                      <!-- <v-btn block variant="text" :href="`/edit-advert?_id=${item.raw._id}`">Редактировать</v-btn>
                      <v-btn block variant="text" @click="deleteItem(item.raw._id)">Удалить </v-btn> -->

                    </v-card>
                  </v-sheet>

                </v-col>
              </v-row>

            </template>

            <template v-slot:footer="{ page, pageCount }">

              <v-footer color="surface-variant" class="justify-space-between text-body-2 mt-4">
                Всего резюме: {{ items.length }}

                <div>
                  Страница {{ page }} из {{ pageCount }}
                </div>
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
    itemsPerPage: 16,
    dialog: false,

    username: localStorage.getItem("email")

  }),
  methods: {

    async loadMyAdverts() {
      let data = {
        email: localStorage.getItem("email")

      };
      let response = await Advert.allAdverts(data);
      if (response.err) {
        console.log("Empty my_adverts list");
      } else {
        this.items = response.reverse();
        console.log(response.reverse())
      }
    },

    // async loadTN() {
    //   let data = {
    //     email: localStorage.getItem("email")

    //   };
    //   let response = await Advert.allAdverts('-TN');
    //   if (response.err) {
    //     console.log("Empty my_adverts list");
    //   } else {
    //     this.items = response.reverse();
    //     console.log(response.reverse())
    //   }
    // },

    // async loadPKO() {
    //   let data = {
    //     email: localStorage.getItem("email")

    //   };
    //   let response = await Advert.allAdverts('-PKO');
    //   if (response.err) {
    //     console.log("Empty my_adverts list");
    //   } else {
    //     this.items = response.reverse();
    //     console.log(response.reverse())
    //   }
    // },
    // async loadRKO() {
    //   let data = {
    //     email: localStorage.getItem("email")

    //   };
    //   let response = await Advert.allAdverts('-RKO');
    //   if (response.err) {
    //     console.log("Empty my_adverts list");
    //   } else {
    //     this.items = response.reverse();
    //     console.log(response.reverse())
    //   }
    // },
    // async loadPNA() {
    //   let data = {
    //     email: localStorage.getItem("email")

    //   };
    //   let response = await Advert.allAdverts('-PNA');
    //   if (response.err) {
    //     console.log("Empty my_adverts list");
    //   } else {
    //     this.items = response.reverse();
    //     console.log(response.reverse())
    //   }
    // },

    // async loadPSO() {
    //   let data = {
    //     email: localStorage.getItem("email")

    //   };
    //   let response = await Advert.allAdverts('-PSO');
    //   if (response.err) {
    //     console.log("Empty my_adverts list");
    //   } else {
    //     this.items = response.reverse();
    //     console.log(response.reverse())
    //   }
    // },
    onClickSeeAll() {
      this.itemsPerPage = this.itemsPerPage === 4 ? this.my_adverts.length : 12
    },
    async deleteItem(id) {
      this.dialog = false
      let response = await Advert.loadMyAdvertsTN(id);
      console.log(response)
      await this.loadMyAdverts()
      // await this.loadTN()
      // await this.loadPKO()
      // await this.loadRKO()
      // await this.loadPNA()
      // await this.loadPSO()
    }

  },


  beforeCreate() {

    if (localStorage.getItem("jwt") == null) {
      this.$router.push('/');
    }

  },
  async created() {
    await this.loadMyAdverts();

  },

};

</script>