<template>
  <!-- <v-app-bar primary>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      БАНК ВАКАНСИЙ
    </v-app-bar-title>
    <v-btn class="auth" to="/logged"> Каталог </v-btn>
    <v-btn class="auth" to="/create-advert"> СОЗДАТЬ РЕЗЮМЕ </v-btn>
    <v-btn class="auth" to="/my-account"> Мои резюме ({{ current_user }}) </v-btn>
    <v-btn class="auth" @click="logout()"> Выйти </v-btn>
  </v-app-bar> -->
  <v-app-bar :elevation="5" rounded>
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>БАНК IT ВАКАНСИЙ</v-app-bar-title>

    <template v-slot:append sm="3" xl="3" v-if="hr_mode">
      <v-btn class="auth" to="/vacancies" color="deep-orange-accent-4"> Вакансии </v-btn>

      <v-btn class="auth" to="/create-resume"> Создать резюме</v-btn>
      <v-btn class="auth" to="/replies"> Мои отклики ({{ current_user }}) </v-btn>

      <v-btn class="auth" to="/resumes"> Мои резюме ({{ current_user }}) </v-btn>

      <v-btn class="auth" to="/companies"> Компании </v-btn>

      <v-btn class="auth" @click="logout()"> Выйти </v-btn>
    </template>

    <template v-slot:append sm="3" xl="3" v-if="user_mode">

      <v-btn class="auth" to="/vacancies" color="deep-orange-accent-4"> Вакансии </v-btn>
      <v-btn class="auth" to="/all-replies"> Отклики {{ current_user }} </v-btn>
      <v-btn class="auth" to="/create-vacancy" color="deep-orange-accent-4"> Создать вакансию</v-btn>
      <v-btn class="auth" to="/applicants" color="deep-orange-accent-4"> Резюме </v-btn>
      <v-btn class="auth" to="/create-company"> Компании</v-btn>
      <v-btn class="auth" to="/create-category"> Категории</v-btn>


      <v-btn class="auth" @click="logout()"> Выйти </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    hr_mode: false,
    user_mode: false,

    admin: false,
    current_user: localStorage.getItem("email"),
    role: localStorage.getItem("roleId")
  }),
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("email");
      localStorage.removeItem("roleId");
      this.$router.push("/");
    },
  },
  beforeCreate() {

    if (localStorage.getItem("jwt") == null) {

      this.$router.push("/");
    }
  },
  async created() {

    if (this.role == 2) {
      this.user_mode = true
      console.log('USER')
    }
    if (this.role == 1) {
      this.hr_mode = true
      console.log('USER')
    }


  },
};
</script>
