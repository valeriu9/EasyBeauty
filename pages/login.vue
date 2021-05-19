<template>
  <div class="wrapper">
    <form class="form-container">
      <p class="h4 text-center mb-4">Sign in</p>
      <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
      <input type="email" id="defaultFormLoginEmailEx" class="form-control" />
      <br />
      <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
      <input type="password" id="defaultFormLoginPasswordEx" class="form-control" />
      <div class="text-center mt-4">
        <div class="button" @click="submit()">Sign in</div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods:{
    submit(){
      const user={ name:'Valeriu', email:'valeriu.marandici98@gmail.com', userId:1};
      this.$cookies.set('movie_user',user);
      this.$store.dispatch('user/userLoggedIn', user);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 600px;
  height: 500px;
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(195, 195, 195, 0.6);
}
.wrapper {
  height: 100vh;
}
.button {
  border: 2px solid #ccc;
  border-radius: 36px;
  padding: 12px 20px;
  cursor: pointer;
  width: fit-content;
  margin: 0 auto;
  font-weight: 700;
}
</style>
