<template>
  <div class="container">
    <p class="header-text">{{categoryName}}</p>
    <div class="card-wrapper">
      <div v-for="data of cardObject" :key="data.index" class="card-place">
        <Card :cardObject="data" />
      </div>
    </div>
  </div>
</template>
<script>
import requests from '~/helpers/api.js'
export default {
  mounted(){
    this.fetchCategory(this.$route.params.category)
  },
  data(){
    const categoryName = this.$route.params.category;

    return{ cardObject:[], categoryName}
  },
  methods:{
    async fetchCategory(category){
      if(category === 'action'){
   try{
    const res = await this.$axios.get(requests.tmdbApi.fetchActionMovies);
   this.cardObject = res.data.results;
    }
    catch(e){
      console.log(e);
    }
      } else if( category === 'comedy'){
   try{
    const res = await this.$axios.get(requests.tmdbApi.fetchComedyMovies);
   this.cardObject = res.data.results;
    }
    catch(e){
      console.log(e);
    }
      } else if( category === 'horror'){
   try{
    const res = await this.$axios.get(requests.tmdbApi.fetchHorrorMovies);
   this.cardObject = res.data.results;
    }
    catch(e){
      console.log(e);
    }
      }else if( category === 'mystery'){
   try{
    const res = await this.$axios.get(requests.tmdbApi.fetchMystery);
   this.cardObject = res.data.results;
    }
    catch(e){
      console.log(e);
    }
      }else if( category === 'documentary'){
   try{
    const res = await this.$axios.get(requests.tmdbApi.fetchDocumentaries);
   this.cardObject = res.data.results;
    }
    catch(e){
      console.log(e);
    }
      }else if( category === 'fantasy'){
   try{
    const res = await this.$axios.get(requests.tmdbApi.fetchFantasy);
   this.cardObject = res.data.results;
    }
    catch(e){
      console.log(e);
    }
      }else if( category === 'war'){
   try{
    const res = await this.$axios.get(requests.tmdbApi.fetchWarMovies);
   this.cardObject = res.data.results;
    }
    catch(e){
      console.log(e);
    }
      }else if( category === 'drama'){
   try{
    const res = await this.$axios.get(requests.tmdbApi.fetchDrama);
   this.cardObject = res.data.results;
    }
    catch(e){
      console.log(e);
    }
      }
    },
     appendUrl(img){
    if(img){
    return 'https://image.tmdb.org/t/p/original/'+img
    }
  },
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 80px;
}
.header-text {
  padding-top: 30px;
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
</style>
