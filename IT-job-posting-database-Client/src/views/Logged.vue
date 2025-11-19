<template>
 asdfasdf
</template>
    
<script>

export default {
  beforeCreate() {
    if (localStorage.getItem("email") == 'admin') {
      this.$router.push('/admin');
    }
    else if (localStorage.getItem("jwt") == null) {
      this.$router.push('/');

    } else {

    }
  },

  components: {
    HelloWorld,
  },
};

</script>
    