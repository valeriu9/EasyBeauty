<template>
  <div class="container">
    <p class="header-text">Results</p>
    <div class="card-wrapper">
      <div v-for="data of movies" :key="data.index" class="card-place">
        <Card :cardObject="data" />
      </div>
      <p v-if="movies.length ===0" class="no-movies">No Movies For This Search</p>
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
    const categoryName = this.$route.params.category;
    const cardObject =[{name:"Black list sdfsa dasd asd asd asd sad asdsa dasd sa", favorit: true, image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"}]
    return{ cardObject, categoryName, movies:[]}
  },
  methods:{
    async initializeData(searchKey){
    try{
    const res = await this.$axios.get(requests.querySearch(searchKey));
    this.movies = res.data.results;
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
