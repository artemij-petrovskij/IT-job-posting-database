<template>

  <v-app-bar :elevation="2" rounded>
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>IT-Вакансии {{ companyName }}</v-app-bar-title>

    <template v-slot:append v-if="hr_mode">
      <!-- Кнопки, которые видны только на больших экранах -->
      <div class="desktop-buttons d-none d-md-flex">
        <v-btn class="auth" to="/vacancies" color="deep-orange-accent-4">
          Вакансии
        </v-btn>
        <v-btn class="auth" to="/create-resume">
          Создать резюме
        </v-btn>
        <v-btn class="auth" to="/replies">
          Мои отклики ({{ current_user }})
        </v-btn>
        <v-btn class="auth" to="/resumes">
          Мои резюме ({{ current_user }})
        </v-btn>
      </div>

      <!-- Меню (всегда видно, но содержимое меняется) -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-menu" variant="text" v-bind="props"></v-btn>
        </template>

        <v-list width="300px">
          <!-- Кнопки, которые показываются только в меню на маленьких экранах -->
          <div class="d-md-none">
            <v-btn block variant="text" to="/vacancies">
              Вакансии
            </v-btn>
            <v-btn block variant="text" to="/create-resume">
              Создать резюме
            </v-btn>
            <v-btn block variant="text" to="/replies">
              Мои отклики ({{ current_user }})
            </v-btn>
            <v-btn block variant="text" to="/resumes">
              Мои резюме ({{ current_user }})
            </v-btn>
            <v-divider></v-divider>
          </div>

          <!-- Кнопки, которые всегда в меню -->
          <v-btn block variant="text">
            Аккаунт
          </v-btn>
          <v-btn block variant="text" to="/companies">
            Оставить отзыв о компании
          </v-btn>
          <v-btn block variant="text" @click="logout()">
            Выйти
          </v-btn>
        </v-list>
      </v-menu>
    </template>

    <template v-slot:append v-if="user_mode">
      <!-- Кнопки, которые видны только на больших экранах -->
      <div class="desktop-buttons d-none d-md-flex">
        <v-btn class="auth" to="/vacancies" color="deep-orange-accent-4">
          Вакансии
        </v-btn>
        <v-btn class="auth" to="/all-replies">
          Отклики {{ current_user }}
        </v-btn>
        <v-btn class="auth" to="/create-vacancy" color="deep-orange-accent-4">
          Создать вакансию
        </v-btn>
        <v-btn class="auth" to="/applicants" color="deep-orange-accent-4">
          Резюме
        </v-btn>
        <!-- <v-btn class="auth" to="/create-category">
          Категории
        </v-btn> -->
        <!-- <v-btn class="auth" @click="logout()">
          Выйти
        </v-btn> -->
      </div>

      <!-- Меню (всегда видно, но содержимое меняется) -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-menu" variant="text" v-bind="props"></v-btn>
        </template>

        <v-list width="300px">
          <!-- Кнопки, которые показываются только в меню на маленьких экранах -->
          <div class="d-md-none">
            <v-btn block variant="text" to="/vacancies">
              Вакансии
            </v-btn>
            <v-btn block variant="text" to="/all-replies">
              Отклики {{ current_user }}
            </v-btn>
            <v-btn block variant="text" to="/create-vacancy">
              Создать вакансию
            </v-btn>
            <v-btn block variant="text" to="/applicants">
              Резюме
            </v-btn>
            <!-- <v-btn block variant="text" to="/create-category">
              Категории
            </v-btn> -->
            <v-divider></v-divider>
          </div>

          <!-- Кнопки, которые всегда в меню (например, выход) -->
          <v-btn block variant="text" @click="logout()">
            Выйти
          </v-btn>
        </v-list>
      </v-menu>
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
    role: localStorage.getItem("roleId"),
    companyName: localStorage.getItem("companyName")
  }),
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("email");
      localStorage.removeItem("roleId");
      localStorage.removeItem("companyId");
      localStorage.removeItem("companyName");
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
