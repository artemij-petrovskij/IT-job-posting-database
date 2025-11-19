<template>

  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">

      <v-card class="mx-auto" max-width="450">
        <v-tabs v-model="login_tab" bg-color="primary">
          <v-tab value="one">Вход</v-tab>
          <v-tab value="two">Регистрация</v-tab>

        </v-tabs>

        <v-card-text>
          <v-window v-model="login_tab">
            <v-window-item value="one">
              <v-snackbar v-model="login_snackbar"> {{ login_snackbarMessage }}</v-snackbar>

              <v-form ref="form" v-model="login_valid" lazy-validation autocomplete="on">
                <v-container>
                  <v-text-field v-model="login_login" autocapitalize="off" autocorrect="off" autocomplete="username"
                    label="Укажите Логин" placeholder="Укажите Логин" type="text" :rules="login_passRules" solo dense
                    elebation="5"></v-text-field>

                  <v-text-field v-model="login_password" autocomplete="current-password" label="Введите пароль"
                    placeholder="Введите пароль" type="password" :rules="login_passRules" solo dense></v-text-field>
                </v-container>

              </v-form>


              <v-btn block large color="success" @click="loginUser" :disabled="!login_valid">Войти</v-btn>

            </v-window-item>

            <v-window-item value="two">

              <v-form ref="signupForm" v-model="signup_valid" lazy-validation>
                <v-snackbar v-model="signup_snackbar"> {{ signup_snackbarMessage }}</v-snackbar>
                <v-text-field v-model="signup_login" autocapitalize="off" autocorrect="off" autocomplete="username"
                  label="Укажите Логин" placeholder="Укажите Логин" :rules="signup_loginRules" solo dense
                  elebation="5"></v-text-field>

                <!-- <v-text-field v-model="signup_lastName" autocapitalize="off" autocorrect="off" autocomplete="username"
                label="Фамилия" placeholder="Укажите Фамилию" :rules="signup_loginRules" solo dense
                elebation="5"></v-text-field>
              <v-text-field v-model="signup_firstName" autocapitalize="off" autocorrect="off" autocomplete="username"
                label="Имя" placeholder="Укажите Имя" :rules="signup_loginRules" solo dense
                elebation="5"></v-text-field> -->

                <v-text-field v-model="signup_password" autocomplete="current-password" label="Введите пароль"
                  placeholder="Введите пароль" type="password" :rules="signup_passRules" solo dense></v-text-field>


                <v-text-field v-model="signup_checkpass" autocomplete="check-pass" label="Повторите пароль"
                  placeholder="Повторите пароль" type="password" :rules="signup_passSecRules" solo dense></v-text-field>

                <div class="d-flex align-center flex-column bg-grey-lighten-4 pa-6">
                  <v-btn-toggle v-model="toggle" color="primary" variant="tonal">
                    <v-btn style="width:190px" active="" @click="this.roleId = 1">Поиск работы</v-btn>
                    <v-btn style="width:190px" @click="this.roleId = 2">Ищу сотрудников</v-btn>
                  </v-btn-toggle>

                </div>
              </v-form>
              <v-btn block large color="success" @click="registerUser" :disabled="!signup_valid">Продолжить</v-btn>



            </v-window-item>


          </v-window>
        </v-card-text>
      </v-card>



    </v-responsive>
  </v-container>
</template>

<script>
import { User } from "../services/auth.service.js";

export default {
  data: () => ({
    roleId: 1,
    toggle: null,
    //login data
    login_tab: null,
    login_snackbar: false,
    login_snackbarMessage: "",
    login_valid: false,
    login_login: "",
    login_password: "",
    login_loginRules: [
      (value) => !!value || "Обязательное поле",
      (value) => (value || "").length >= 5 || "Минимум 5 символов",
      (value) => (value || "").length <= 30 || "Максимум 30 символов",
    ],
    login_passRules: [
      (value) => !!value || "Обязательное поле.",
      (value) => (value || "").length >= 5 || "Минимум 5 символов",
      (value) => (value || "").length <= 30 || "Максимум 30 символов",
    ],

    //signup data
    signup_valid: false,
    signup_login: "",
    signup_lastName: "",
    signup_firstName: "",
    signup_password: "",
    signup_checkpass: "",
    signup_snackbar: false,
    signup_snackbarMessage: "",
    rules: {
      required: (value) => !!value || "Поле обязательно для заполнения",
    },
    signup_loginRules: [
      (value) => !!value || "Обязательное поле",
      (value) => (value || "").length >= 5 || "Минимум 5 символов",
      (value) => (value || "").length <= 40 || "Максимум 40 символов",
    ],
    signup_passRules: [
      (value) => !!value || "Обязательное поле",
      (value) => (value || "").length <= 40 || "Максимум 40 символов",
      (value) => (value || "").length >= 5 || "Минимум 5 символов",
    ],
    signup_passSecRules: [
      (value) => !!value || "Обязательное поле",
      (value) => (value || "").length <= 40 || "Максимум 40 символов",
      (value) => (value || "").length >= 5 || "Минимум 5 символов",
    ],

  }),
  methods: {

    submitForm() {
      if (this.valid) {
        this.createAdv();
      }
    },
    async loginUser() {
      if (this.login_valid) {
        let data = {
          email: this.login_login,
          password: this.login_password,
          roleId: this.roleId
        };

        let response = await User.login(data);
        if (response.err) {
          this.login_snackbar = true;
          this.login_snackbarMessage = response.err;
        } else {
          if (localStorage.getItem("jwt") != null) {
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            }
            else if (localStorage.getItem("email") == 'admin') {
              this.$router.push("/admin");

            }
            else {
              this.$router.push("/vacancies");
            }
          }
        }
      }



    },



    async registerUser() {
      if (this.signup_password === this.signup_checkpass) {
        console.log(true);
      } else {
        this.signup_snackbar = true;
        this.signup_snackbarMessage = "Пароли не совпадают";
        return false;
      }

      if (this.signup_valid) {
        let data = {
          firstName: this.signup_firstName,
          lastName: this.signup_firstName,
          email: this.signup_login,
          password: this.signup_password,
          roleId: this.roleId
        };

        let response = await User.signup(data);
        if (response.err) {
          this.signup_snackbar = true;
          this.signup_snackbarMessage = response.err;
        } else {
          if (localStorage.getItem("jwt") != null) {
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("/vacancies");
            }
          }
        }
      }
    },
  },
};
</script>