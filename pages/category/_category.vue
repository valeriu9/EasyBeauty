<template>
  <div class="container">
    <p class="header-text">{{categoryName}}</p>
    <div class="card-wrapper">
      <div v-for="data of cardObject" :key="data.index" class="card-place">
        <Card :cardObject="data" />
      </div>
    </div>
    <div class="load-more" @click="loadMore()">Show more movies</div>
    <div class="space"></div>
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
    const page = 1;
    return{ cardObject:[], categoryName, page}
  },
  methods:{
    loadMore(){
      this.page += 1;
      this.fetchCategory(this.categoryName)
    },
    async fetchCategory(category){
      if(category === 'action'){
   try{
     if(this.page === 1){
    const res = await this.$axios.get(requests.tmdbApi.fetchActionMovies);
   this.cardObject = res.data.results;
   }
   else{
        const res = await this.$axios.get(requests.fetchActionMovies(this.page));
        this.cardObject = this.cardObject.concat(res.data.results)
     }
    }
    catch(e){
      console.log(e);
    }
      } else if( category === 'comedy'){
   try{
        if(this.page === 1){
    const res = await this.$axios.get(requests.tmdbApi.fetchComedyMovies);
   this.cardObject = res.data.results;
    }
   else{
        const res = await this.$axios.get(requests.fetchComedyMovies(this.page));
               this.cardObject = this.cardObject.concat(res.data.results)
     }
   }
    catch(e){
      console.log(e);
    }
      } else if( category === 'horror'){
   try{
        if(this.page === 1){
    const res = await this.$axios.get(requests.tmdbApi.fetchHorrorMovies);
   this.cardObject = res.data.results;
    }
     else{
        const res = await this.$axios.get(requests.fetchHorrorMovies(this.page));
               this.cardObject = this.cardObject.concat(res.data.results)
     }
   }
    catch(e){
      console.log(e);
    }
      }else if( category === 'mystery'){
   try{
        if(this.page === 1){
    const res = await this.$axios.get(requests.tmdbApi.fetchMystery);
   this.cardObject = res.data.results;
    }
     else{
        const res = await this.$axios.get(requests.fetchMystery(this.page));
              this.cardObject = this.cardObject.concat(res.data.results)
     }
   }
    catch(e){
      console.log(e);
    }
      }else if( category === 'documentary'){
   try{
        if(this.page === 1){
    const res = await this.$axios.get(requests.tmdbApi.fetchDocumentaries);
   this.cardObject = res.data.results;
    }
     else{
        const res = await this.$axios.get(requests.fetchDocumentaries(this.page));
              this.cardObject = this.cardObject.concat(res.data.results)
     }
   }
    catch(e){
      console.log(e);
    }
      }else if( category === 'fantasy'){
   try{
        if(this.page === 1){
    const res = await this.$axios.get(requests.tmdbApi.fetchFantasy);
   this.cardObject = res.data.results;
    }
     else{
        const res = await this.$axios.get(requests.fetchFantasy(this.page));
        this.cardObject = this.cardObject.concat(res.data.results)
     }
   }
    catch(e){
      console.log(e);
    }
      }else if( category === 'war'){
   try{
        if(this.page === 1){
    const res = await this.$axios.get(requests.tmdbApi.fetchWarMovies);
   this.cardObject = res.data.results;
    }
     else{
        const res = await this.$axios.get(requests.fetchActionMovies(this.page));
      this.cardObject = this.cardObject.concat(res.data.results)
     }
   }
    catch(e){
      console.log(e);
    }
      }else if( category === 'drama'){
   try{
        if(this.page === 1){
    const res = await this.$axios.get(requests.tmdbApi.fetchDrama);
   this.cardObject = res.data.results;
    }
     else{
        const res = await this.$axios.get(requests.fetchActionMovies(this.page));
        this.cardObject = this.cardObject.concat(res.data.results)
     }
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
.load-more {
  width: 100%;
  max-width: 450px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 30px;
  color: #fff;
  border: 2px solid #fff;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
.space {
  height: 100px;
}
</style>
