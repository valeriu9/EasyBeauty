<template>
  <div class="container">
    <div>
      <h1 class="section-name">See top 10 by...</h1>
      <div class="see-top-10">
        <div class="scroll-wrapper">
          <h3 class="title">Trending</h3>
          <div v-dragscroll class="scroll-parent">
            <div class="scroll-container">
              <div v-for="movie in trendingResults" :key="movie.index">
                <nuxt-link :to="`/movie/${movie.id}`">
                  <Card :cardObject="movie" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll-wrapper">
          <h3 class="title">Countries</h3>
          <div v-dragscroll class="scroll-parent">
            <div class="scroll-container">
              <CountryCard :cardObject="countryObject" />
              <CountryCard :cardObject="countryObject" />
              <CountryCard :cardObject="countryObject" />
              <CountryCard :cardObject="countryObject" />
              <CountryCard :cardObject="countryObject" />
            </div>
          </div>
        </div>
        <div class="scroll-wrapper">
          <h3 class="title">Actors</h3>
          <div v-dragscroll class="scroll-parent">
            <div class="scroll-container">
              <ActorCard :cardObject="actorObject" />
              <ActorCard :cardObject="actorObject" />
              <ActorCard :cardObject="actorObject" />
              <ActorCard :cardObject="actorObject" />
              <ActorCard :cardObject="actorObject" />
            </div>
          </div>
        </div>
      </div>
      <h1 class="section-name margin-top-30">Explore by ... time?</h1>
      <div class="see-top-10">
        <div class="scroll-wrapper">
          <h3 class="title">Movie length</h3>
          <div v-dragscroll class="scroll-parent-time">
            <div class="scroll-container">
              <TimeCard timeRange="> 2 H" />
              <TimeCard timeRange="> 2,5 H" />
              <TimeCard timeRange="> 3 H" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import requests from '~/helpers/api.js'
export default {
  mounted(){
    this.fetchMovies()
  },
  data(){
    const userInfo = {name:"Valeriu Marandici", preferences:[{name:"Home Alone"}, {name:"Sex,Drugs,Hoes"},{name:"Nasha Rassha"}]};
    const cardObject = {name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"}
    const actorObject = {name:"Cara Delevigne", image:"https://i.pinimg.com/originals/6b/57/0d/6b570d14c5bd4d17203dcd9f80f1a81b.jpg"}
    const countryObject = {name:"MD", image:"https://www.countryflags.com/wp-content/uploads/moldova-flag-png-large.png"}
    const movieList =[
{id:1, name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"},
{id:2, name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"},
{id:3, name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"},
{id:4, name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"},
{id:5, name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"},
{id:6, name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"},
{id:7, name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"},
{id:8, name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"}
    ]
    const trendingResults = [];

    const favorite =[];
    return{genre:'', userInfo, cardObject, favorite, countryObject, actorObject, movieList, trendingResults}
  },
  methods:{
    filterGenre(value){
      this.genre = value;
    },
    addToFavorite(value){
      this.favorite.push(value);
    },
    async fetchMovies () {
      try {
        const res = await this.$axios.get(requests.tmdbApi.fetchTrending);
        console.log(requests.tmdbApi.fetchTrending);
        console.log(res.data);
        this.trendingResults = res.data.results;
        console.log(this.trendingResults);
        if (res.data.type === 'Error') { throw new Error(res.data); }

      } catch (e) {
        console.error(e.message);

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-top-30 {
  margin-top: 30px;
}
.container {
  margin-top: 80px;
  padding-bottom: 100px;
}
a {
  text-decoration: none;
  color: #000;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 24px;
  color: #ffff;
  letter-spacing: 1px;
}
.section-name {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 50px;
  color: #ffff;
  letter-spacing: 1px;
  margin-bottom: 20px;
  padding-top: 20px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.scroll-parent {
  display: flex;
  flex-direction: row;
  max-width: 400px !important;
  overflow: hidden;
}
.scroll-parent-time {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.scroll-container {
  display: flex;
}
.see-top-10 {
  display: flex;
  justify-content: space-between;
}
</style>
