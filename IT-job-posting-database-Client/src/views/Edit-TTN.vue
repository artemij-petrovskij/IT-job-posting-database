<template>
    <v-container class="fill-height">



        <v-snackbar v-model="snackbar">
            {{ text }}

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>




        <v-responsive class="align-center text-center fill-height">

            <v-card title="Редактировать объявление TTN" class="mx-auto" max-width="700" variant="outlined">

                <v-form ref="form" v-model="valid" lazy-validation autocomplete="on">

                    <v-text-field v-model="unique_payer_number" label="УНП(Учетный номер плательщика )" :rules="rules"
                        hide-details required></v-text-field>
                    <v-text-field v-model="car_trailer" label="Автомобиль, прицеп" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="waybill_number" label="Номер путевого листа," :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="driver" label="Фамилия и инициалы водителя" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="payer" label="Заказчик автомобильной перевозки (плательщик)" :rules="rules"
                        hide-details required></v-text-field>
                    <v-text-field v-model="shipper" label="Грузоотправитель " :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="consignee" label="Грузополучатель" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="basis_of_leave" label="Основание отпуска	" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="loading_point" label="Пункт погрузки" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="unloading_point" label="Пункт разгрузки" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="redirection" label="Переадресовка" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="total_amount_of_VAT" label="Всего сумма НДС	" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="total_cargo_weight" label="Всего масса груза	" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="total_number_of_cargo_places" label="Всего количество грузовых мест	"
                        :rules="rules" hide-details required></v-text-field>
                    <v-text-field v-model="release_authorized" label="Отпуск разрешил" :rules="rules" hide-details
                        required></v-text-field>
                    <v-text-field v-model="shipper_delivered" label="Товар к перевозке принял	" :rules="rules"
                        hide-details required></v-text-field>
                    <v-text-field v-model="accepted_for_transportation" label="Товар к перевозке принял" :rules="rules"
                        hide-details required></v-text-field>
                    <v-text-field v-model="accepted_by_consignee" label="Принял грузополучатель	" :rules="rules"
                        hide-details required></v-text-field><br>
                </v-form>

            </v-card>



        </v-responsive>
    </v-container>
</template>

<script>
import { Advert } from "../services/advert.service.js";

export default {
    data: () => ({
        advert: true,
        valid: false,
        rulesss: [
            (value) => value !== null || "Обязательное поле"
        ],
        snackbar: false,
        text: 'Редактировано успешно',
        timeout: 2000,


        unique_payer_number: "",
        car_trailer: "",
        waybill_number: 0,
        driver: "",
        payer: "",
        shipper: "",
        consignee: "",
        basis_of_leave: "",
        loading_point: "",
        unloading_point: "",
        redirection: "",
        total_amount_of_VAT: "",
        total_cargo_weight: "",
        total_number_of_cargo_places: 6,
        release_authorized: "",//Отпуск разрешил	
        shipper_delivered: "",//Сдал грузоотправитель	
        accepted_for_transportation: "",//Товар к перевозке принял	
        accepted_by_consignee: "", //Принял грузополучатель	



    }),
    methods: {
        async editAdv() {
            if (this.brand != null && this.body_type != null && this.color != null && this.price != null && this.age != null && this.mile_age != null && this.image != null) {

                let data = {
                    _id: this.$route.query._id,
                    id: localStorage.getItem("email"),
                    jwt: localStorage.getItem("jwt"),

                    unique_payer_number: 4465546511553434,
                    car_trailer: "Грузовой тягач Shacman X6000",
                    waybill_number: 9856547,
                    driver: "Водитель Петр Евгеньевич",
                    payer: "ЗАО КРАССТРОЙ",
                    shipper: "Наша компания",
                    consignee: "Наша компания",
                    basis_of_leave: "Продажа",
                    loading_point: "Москва, свиблово",
                    unloading_point: "Иркутск",
                    redirection: "-",
                    total_amount_of_VAT: "Один миллион двести тридцать тысяч 1 230 000",
                    total_cargo_weight: "1250кг",
                    total_number_of_cargo_places: 6,
                    release_authorized: "Отпускающий Сергей Павлович",//Отпуск разрешил	
                    shipper_delivered: "Разгружающий Игорь Сергеевич",//Сдал грузоотправитель	
                    accepted_for_transportation: "Принимающий Семен Сергеевич",//Товар к перевозке принял	
                    accepted_by_consignee: "Принимающий-Учетный Семен Сергеевич", //Принял грузополучатель	
                };


                console.log(data)
                let response = await Account.updateAdvert(data);
                if (response.err) {

                } else {


                    this.snackbarMessage = "Редактирование успешно";
                    if (localStorage.getItem("jwt") != null) {
                        if (this.$route.params.nextUrl != null) {
                            this.$router.push(this.$route.params.nextUrl);
                        } else {
                            this.$router.push("/logged");
                        }
                    }
                }
            }

        },

        async loadAdvert() {
            const id = this.$route.query._id
            let response = await Advert.getOneAdvert(id);

            const current_data = response[0]

            // this.brand = current_data.brand
            // this.model = current_data.model,
            //     this.body_type = current_data.body_type
            // this.color = current_data.color
            // this.price = current_data.price
            // this.age = current_data.age
            // this.mile_age = current_data.mile_age
            // this.image = current_data.image


            this.unique_payer_number = current_data.unique_payer_number
            this.car_trailer = current_data.car_trailer
            this.waybill_number = current_data.waybill_number
            this.driver = current_data.driver
            this.payer = current_data.payer
            this.shipper = current_data.shipper
            this.consignee = current_data.consignee
            this.basis_of_leave = current_data.basis_of_leave
            this.loading_point = current_data.loading_point
            this.unloading_point = current_data.unloading_point
            this.redirection = current_data.redirection
            this.total_amount_of_VAT = current_data.total_amount_of_VAT
            this.total_cargo_weight = current_data.total_cargo_weight
            this.total_number_of_cargo_places = current_data.total_number_of_cargo_places
            this.release_authorized = current_data.release_authorized
            this.shipper_delivered = current_data.shipper_delivered
            this.accepted_for_transportation = current_data.accepted_for_transportation
            this.accepted_by_consignee = current_data.accepted_by_consignee
            console.log(this.unloading_point)

        },
    },

    beforeCreate() {
        if (localStorage.getItem("jwt") == null) {
            this.$router.push('/');
        }
    },
    async created() {
        await this.loadAdvert();

    },

};

</script>
