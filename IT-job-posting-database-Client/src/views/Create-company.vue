<template>
    <!-- class="fill-height" -->
    <v-container>

        <v-fade-transition>
            <div v-if="show" class="my-box">
                <v-responsive class="align-center  ">
                    <!-- <v-btn :href="`/edit-advert?_id=`">Comfortable Button</v-btn>
            <v-btn to="/edit-advert">Comfortable Button</v-btn> -->
                    <v-card title="Добавить компанию (общие сведения)" class="mx-auto" max-width="700"
                        variant="outlined">

                        <v-container class="align-center ">
                            <!---->
                            <!-- <v-form ref="form1" v-model="valid" lazy-validation autocomplete="on" @submit.prevent> -->
                            <v-form ref="form1" v-model="valid" lazy-validation @submit.prevent="submitForm">

                                <v-text-field v-model="name" label="Название компании" :rules="[rules.required]"
                                    hide-details required>
                                </v-text-field>
                                <v-text-field v-model="description" label="Описание, форма собественности"
                                    :rules="[rules.required]" hide-details required>
                                </v-text-field>

                                <v-btn density="comfortable" class="mt-4" color="success" type="submit"
                                    :disabled="!valid" block>
                                    Добавить компанию
                                </v-btn>

                            </v-form>

                            <v-btn size="x-small" variant="plain">
                                *Обязательное поле
                            </v-btn>
                            <v-snackbar v-model="snackbar"> {{ snackbarMessage }}</v-snackbar>


                        </v-container>



                    </v-card>


                    <v-card class="mx-auto mt-4" max-width="700" variant="outlined">

                        <v-card title="Список компаний" class="mx-auto" max-width="700">
                            <v-list lines="one">
                                <v-list-item v-for="(item, i) in companies" :key="i" :title="item.title"
                                    :subtitle="item.desc">
                                    <v-spacer></v-spacer>
                                    <v-divider></v-divider>
                                </v-list-item>
                            </v-list>
                        </v-card>

                    </v-card>
                </v-responsive>

            </div>
        </v-fade-transition>


    </v-container>
</template>

<script>

import { Advert } from "../services/advert.service.js";
import { Vacancy } from "../services/vacancy.service.js";


export default {
    data: () => ({
        type_of_document: null,
        //Создание резюме
        name: "",
        description: "",
        //
        companies: [],
        categoryId: 1,
        categories: [], // all categories
        category: "",


        valid: false,
        valid2: false,

        show: false,

        rules: {
            required: value => !!value || 'Поле обязательно для заполнения',
        },
        snackbar: false,
        snackbarMessage: "",
    }),
    methods: {
        submitForm() {
            if (this.valid) {
                this.createAdv();
            }
        },
        async getCategoryId(e) {
            const array = this.categories;
            const found = array.find((element) => {
                return element.title == this.category
            });
            this.categoryId = found.id
        },
        // taxCalc() {

        //     this.tax_amount = this.without_tax * this.tax_rate / 100
        //     this.with_tax = this.without_tax * 1 + this.tax_amount
        // },
        // taxCalc2() {

        //     this.amount = this.cost * this.rate / 100
        //     this.cost_with_VAT = this.cost * 1 + this.rate
        // },
        async createAdv() {
            if (this.name != null && this.description != null) {
                let data = {

                    name: this.name,
                    description: this.description,
                    //categoryId: this.categoryId,
                    /**STARTCONST **/
                    // type_of_document: this.type_of_document,
                    jwt: localStorage.getItem("jwt"),
                    creator: localStorage.getItem("email"),
                    modifeir: localStorage.getItem("email"),
                    email: localStorage.getItem("email"),
                    /**ENDCONST **/
                };
                let response = await Vacancy.createCompany(data);
                if (response.err) {
                    this.snackbar = true;
                    this.snackbarMessage = response.err;
                } else {
                    if (localStorage.getItem("jwt") != null) {
                        if (this.$route.params.nextUrl != null) {
                            this.$router.push(this.$route.params.nextUrl);
                        } else {
                            this.loadMyAdverts()
                        }
                    }
                }
            }

        },
        async loadMyAdverts() {
            let data = {
                email: localStorage.getItem("email"),
            };
            let response = await Vacancy.allVacancies(data);
            if (response.err) {
                console.log("Empty my_adverts list");
            } else {
                //this.items = response.vacancies.reverse();
                console.log(response)
                const categoriesId = response.companies.map((x) => {
                    return { 'title': x.name, "id": x.id, "desc": x.description }
                });
                this.companies = categoriesId
                setTimeout(() => { this.show = true }, 300);




            }
        },

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