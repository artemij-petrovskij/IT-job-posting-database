<template>
    <v-app>
      <v-card flat class="py-12">
        <v-card-text> 
          <v-row align="center" justify="center">
            <v-col cols="12">
          
            </v-col>
            <v-btn-toggle shaped mandatory color="secondary">
              <v-btn class="auth" to="/"> Главная </v-btn>
              <v-btn class="auth" to="/login"> Войти </v-btn>
              <v-btn class="auth" to="/signup"> Регистрация </v-btn>
            </v-btn-toggle>
          </v-row>
        </v-card-text>
      </v-card>
  
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
  
      
    </v-app>
  </template>
