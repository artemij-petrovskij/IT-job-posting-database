<template>
  <v-app-bar primary>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />

      IT-Вакансии
    </v-app-bar-title>
    <!-- <v-btn class="auth" to="/logged"> Каталог </v-btn>

    <v-btn class="auth" to="/create-advert"> Подать объявление </v-btn> -->
    <!-- <v-btn class="auth" to="/admin-edit">Все данные </v-btn> -->
    <v-btn class="auth" to="/create-company">Добавить компанию </v-btn>

    <v-btn class="auth" to="/create-category">Добавить категорию </v-btn>

    <v-btn class="auth" to="/assign-users">Назначить пользователей </v-btn>

    <v-btn class="auth" to="/admin"> Панель администратора </v-btn>
    <v-btn class="auth" @click="logout()"> Выйти </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("email");
      localStorage.removeItem("roleId");
      this.$router.push("/");
    },
  },

  beforeCreate() {
    if (localStorage.getItem("jwt") == null || localStorage.getItem("email") != "admin") {
      this.$router.push("/");
    }
  },
};
</script>
