<template>
    <v-container class="fill-height">
        <v-responsive class=" text-center fill-height">


            <v-data-iterator :items="my_adverts" :items-per-page="itemsPerPage">
                <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
                    <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
                        <div class="text-truncate">
                    
                        </div>

                        <div class="d-flex align-center">
                            <v-btn class="me-8" variant="text" @click="onClickSeeAll">
                                <span class="text-decoration-underline text-none">Показать все</span>
                            </v-btn>

                            <div class="d-inline-flex">
                                <v-btn :disabled="page === 1" icon="mdi-arrow-left" size="small" variant="tonal"
                                    class="me-2" @click="prevPage"></v-btn>

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
                               
                                <v-card>
                                    <v-img :gradient="`to top right, rgba(255, 255, 255, .1), rgba(14, 151, 210, .15)`"
                                        :src="item.raw.image" cover height="350"></v-img>

                                    <v-table density="compact" class="text-caption">
                                        <tbody>
                                            <tr align="right">
                                                <th>

                                                    <p class="text-subtitle-2">
                                                        {{ item.raw.brand }} {{ item.raw.model }}
                                                    </p>
                                                    Стоимость : {{ item.raw.price }} ({{ Math.round(item.raw.price / 3.3)
                                                    }})$<br>
                                                    Цвет: {{ item.raw.color }}<br>
                                                    {{ item.raw.age }}, {{ item.raw.mile_age }} км, {{ item.raw.body_type
                                                    }}<br>
                                                
                                                    {{ item.raw.date }}

                                                <th>


                                                </th>

                                                </th>




                                            </tr>

                                        </tbody>
                                    </v-table>
                                    <!-- <v-btn block variant="text" :href="`/edit-advert?_id=${item.raw._id}`">Редактировать</v-btn> -->
                                    <v-btn block variant="text" @click="deleteItem(item.raw._id)">Удалить</v-btn>

                                </v-card>
                            </v-sheet>

                        </v-col>
                    </v-row>

                </template>

                <template v-slot:footer="{ page, pageCount }">

                    <v-footer color="surface-variant" class="justify-space-between text-body-2 mt-4">
                        Всего: {{ my_adverts.length }}

                        <div>
                            Страница {{ page }} из {{ pageCount }}
                        </div>
                    </v-footer>

                </template>




            </v-data-iterator>
        </v-responsive>
    </v-container>
</template>
  
  
    
<script>
import { Advert } from "../services/advert.service.js";
export default {
    data: () => ({
        my_adverts: [],
        itemsPerPage: 4,

        dialog: false,

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
                console.log(response)
                this.my_adverts = response.reverse();
            }
        },
        onClickSeeAll() {
            this.itemsPerPage = this.itemsPerPage === 4 ? this.my_adverts.length : 4
        },
        async deleteItem(id) {
            this.dialog = false
            let response = await Advert.deleteAdvert(id);
            console.log(response)
            await this.loadMyAdverts()
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
    