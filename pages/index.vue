<template>
  <div class="container">
    <div>
      <div class="see-top-10">
        <div class="scroll-wrapper">
          <h3 class="title">Trending Movies</h3>
          <div v-dragscroll class="scroll-parent">
            <div class="scroll-container">
              <div v-for="movie in trendingResults" :key="movie.index">
                <Card :cardObject="movie" />
              </div>
            </div>
          </div>
        </div>
        <div class="scroll-wrapper">
          <h3 class="title">Top Actors</h3>
          <div v-dragscroll class="scroll-parent">
            <div class="scroll-container">
              <div v-for="actor in actorResults" :key="actor.index">
                <Card :cardObject="actor" type="actor" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="section-name margin-top-30">Do you like statistics?</h1>
      <div class="see-top-10">
        <div class="scroll-wrapper">
          <h3 class="title">Check some awesome facts about movie industry</h3>
          <img src="~assets/images/statistics.jpg" class="stat-img" alt="statistics">
          <nuxt-link to="/facts">
            <div class="statistics">See Statistics</div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import requests from '~/helpers/api.js'
export default {
  mounted(){
    this.fetchMovies();
    this.fetchActors();
  },
  data(){
    const userInfo = {name:"Valeriu Marandici", preferences:[{name:"Home Alone"}, {name:"Sex,Drugs,Hoes"},{name:"Nasha Rassha"}]};
    const cardObject = {name:"Black list", image:"https://m.media-amazon.com/images/M/MV5BZDA1MzE3M2EtNTE4Ni00OGE4LWE1NjctYzFhMzA2NDgxMDIxXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg"}
    const actorObject = {name:"Cara Delevigne", image:"https://i.pinimg.com/originals/6b/57/0d/6b570d14c5bd4d17203dcd9f80f1a81b.jpg"}
    const countryObject = {name:"MD", image:"https://www.countryflags.com/wp-content/uploads/moldova-flag-png-large.png"}
    const trendingResults = [];
    const actorResults = [];
    const favorite =[];
    return{genre:'', userInfo, cardObject, favorite, countryObject, actorObject,  trendingResults, actorResults}
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
        this.trendingResults = res.data.results;

      } catch (e) {
        console.error(e.message);

      }
    },
    async fetchActors () {
      try {
        const res = await this.$axios.get(requests.tmdbApi.fetchPersons);
        this.actorResults = res.data.results;
        console.log(this.actorResults);
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
.stat-img {
  margin-top: 24px;
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
  max-width: 90vw !important;
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
  flex-direction: column;
}
.statistics {
  margin: 24px;
  padding: 24px;
  border: 2px solid #ccc;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  width: fit-content;
  cursor: pointer;
}
.title {
  margin: 24px;
  font-weight: 700;
  font-size: 40px;
}
</style>
