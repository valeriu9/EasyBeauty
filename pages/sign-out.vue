<template>

</template>
<script>
export default {
  beforeMount(){
    this.$cookies.remove('movie_user');
    this.$store.dispatch('user/userLoggedOut');
    this.$router.push('/')
  }
}
</script>
