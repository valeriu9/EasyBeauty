<template>
  <div class="container">
    <p class="header-text">Results</p>
    <div class="card-wrapper">
      <div v-for="data of movies" :key="data.index" class="card-place">
        <Card :cardObject="data" />
      </div>
      <p v-if="movies.length === 0" class="no-movies">No Movies For This Search</p>
    </div>
  </div>
</template>
<script>
import requests from '~/helpers/api.js'
export default {
  mounted(){
    this.initializeData(this.$route.query.searchKey);
  },
  data(){
    return{ movies:[]}
  },
  methods:{
    async initializeData(searchKey){
    try{
      const res = await this.$axios.get(requests.querySearch(searchKey));
    this.movies = res.data.results;
      console.log(this.movies);
    }
    catch(e){
      console.log(e);
    }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 80px;
}
.header-text {
  padding-top: 0px;
  font-size: 50px;
  font-weight: 700;
  color: #fff;
  text-transform: capitalize;
}
.card {
  width: 250px;
}
.card-place {
  padding-top: 14px;
  display: inline-block;
}
.card-wrapper {
  padding-bottom: 100px;
}
.no-movies {
  margin-top: 80px;
  color: #ccc;
  font-size: 20px;
}
</style>
