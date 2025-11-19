<template>
  <v-app>
    <component >
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/MainLayout";
export default {
  
  beforeCreate() {
   
    if (localStorage.getItem("jwt") != null) {
      
      //this.$router.push('dashboard');
    }
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "Main") + "-layout";
    },
  },
  components: {
    MainLayout,
    DashboardLayout,
  },
};
</script>