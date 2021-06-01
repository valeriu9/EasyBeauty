<template>
  <div class="align-inline">
    <ul class="left-side">
      <li>
        <nuxt-link to="/"><img src="~assets/images/Logo.svg" alt="logo" class="logo-size"></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/category/comedy" target="_self">Comedy</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/category/drama" target="_self">Drama</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/category/mystery" target="_self">Mystery</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/category/action" target="_self">Action</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/category/horror" target="_self">Horror</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/category/war">War</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/category/documentary">Documentary</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/category/fantasy">Fantasy</nuxt-link>
      </li>
      <li>
        <nuxt-link :class="loggedIn? '': 'disable'" to="/recomandations">Recomandations</nuxt-link>
      </li>
    </ul>
    <ul class="right-side">
      <li v-if="loggedIn">
        <nuxt-link to="/favorite"><img src="~assets/images/star.svg" class="favorite" alt="star"></nuxt-link>
      </li>
      <li><input type="text" v-model="search" /></li>
      <li class="search-button-holder">
        <a :href="`/search-result?searchKey=`+search">
          <div class="signin-out">
            <p>Search</p>
          </div>
        </a>
      </li>
      <li>
        <a v-if="loggedIn" href="/sign-out" class="signin-out">
          <p>Sign out</p>
        </a>
        <a v-else href="/login" class="signin-out">
          <p>Sign in</p>
        </a>
      </li>
      <li v-if="loggedIn">
        <p class="name">{{user.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    const user = this.$store.state.user;
    const loggedIn = !!this.$store.state.user.name;
    const search = '';
    return{user, loggedIn, search};
  },
  methods:{
    emitGenre(value){
     this.$emit("genre",value);
    },
    recomandations(){
      window.open("/recomandations");
    },
    favorite(){
       window.open("/favorite");
    },
    searchFunction(search){
      window.location.href = `/search-result?searchKey=${search}`
      this.search = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.disable {
  pointer-events: none;
  color: #111;
}
.search-button-holder {
  margin-right: 30px;
  margin-left: 4px;
}
.align-inline {
  display: flex;
  width: 100vw;
  background-color: #333;
  justify-content: space-between;
}
.logo-size {
  width: 50px;
  height: 60px;
}
.favorite {
  width: 30px;
  height: 30px;
}
.name {
  font-size: 20px;
  margin-left: 8px;
  color: #fff;
}
.left-side {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;

  display: flex;
}
.right-side {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  padding-right: 50px;
}

li {
  float: left;
  align-self: center;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #4caf50;
}
.signin-out {
  border: 1px solid #fff;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 36px;
  p {
    color: #fff;
  }
}
.align-right {
  float: right;
}
</style>
