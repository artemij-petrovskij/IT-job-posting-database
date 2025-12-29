<template>
    <v-responsive>
        <v-main class="mx-3 py-5">
            <v-card class="mx-auto mb-5" variant="text" rounded="lg" max-width="900">
                <h3 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
                    Здравствуйте! <br> Вы успешно зарегистрировались как работодатель!
                    <br>После назначения компании, произойдет автоматический переход в личный кабинет.
                </h3>
                <v-img aspect-ratio="16/9" cover src='../../public/team.jpg'></v-img>
            </v-card>
        </v-main>
    </v-responsive>
</template>

<script>
import { Vacancy } from "../services/vacancy.service.js";

export default {
    data: () => ({
        intervalId: null, 
        checkCount: 0, 
        maxChecks: 60 
    }),

    methods: {
        async loadMyAdverts() {
            try {
                let data = {
                    email: localStorage.getItem("email"),
                };
                let response = await Vacancy.allVacancies(data);

                console.log("Проверка компании:", response);

                if (response.err) {
                    console.log("Empty my_adverts list");
                } else {
                    const categoriesId = response.categories.map((x) => {
                        return { title: x.name, id: x.id };
                    });
                    this.categories = categoriesId;

                    const storedRole = localStorage.getItem("roleId");
                    const currentRole = response.roleId.toString();

                    localStorage.setItem("roleId", currentRole);
                    localStorage.setItem("companyId", response.companyId);

                    if (response.companyName) {
                        localStorage.setItem("companyName", response.companyName.name);
                    }

                    const companyName = response.companyName;

                 
                    if (response.companyId !== null && currentRole == 2) {
                        console.log("Компания подтверждена:", companyName);
                        
                        this.stopChecking();

                         this.$router.push("/vacancies");

                        return; // Выходим из метода
                    }

                    console.log("Текущая роль:", currentRole);
                    console.log("Имя компании:", companyName);

                    
                    if (storedRole !== currentRole) {
                        location.reload();
                    }
                }
            } catch (error) {
                console.error("Ошибка при загрузке объявлений:", error);
            }

           
            this.checkCount++;

            
            if (this.checkCount >= this.maxChecks) {
                console.log("Достигнут лимит проверок");
                this.stopChecking();
            }
        },

        // Метод для запуска периодической проверки
        startChecking() {
            console.log("Запуск периодической проверки компании...");
            // Сначала вызываем сразу
            this.loadMyAdverts();

            // Затем устанавливаем интервал каждые 5 секунд
            this.intervalId = setInterval(() => {
                this.loadMyAdverts();
            }, 5000);
        },

        // Метод для остановки проверки
        stopChecking() {
            if (this.intervalId) {
                console.log("Остановка периодической проверки");
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    },

    async created() {
        await this.loadMyAdverts();
        this.startChecking();
    },

    // Важно очищать интервал при уничтожении компонента
    beforeUnmount() {
        this.stopChecking();
    },

    // Для Vue 2 используем beforeDestroy вместо beforeUnmount
    beforeDestroy() {
        this.stopChecking();
    }
};
</script>