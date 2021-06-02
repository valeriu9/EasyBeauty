<template>
  <div class="container">
    <p class="header-text">Favorite movies</p>
    <div class="card-wrapper">
      <div v-for="data of movie" :key="data.index" class="card-place">
        <Card :cardObject="data" :enableDelete="true" :favorit="true" @favoriteRemoved="removeFromDb" />
      </div>
    </div>
  </div>
</template>
<script>
import requests from '~/helpers/api.js'
export default {
  mounted(){
   this.initializeData()
 },
  data() {
   const movie = [];
   const movieDbs = [];

   return { movie, movieDbs }
  },
  methods:{
    async removeFromDb(event){
      setTimeout(() => {
        const user = this.$fire.auth.currentUser;
       const name = event.title || event.name
        this.$fire.firestore.collection("users").doc(user.uid).collection('movieList').doc(name).delete().then(() => {
     window.location.href = '/favorite';
     }).catch((error) => {
     console.error("Error removing document: ", error);
   });
      }, 500);
    },
    getMovie(){
     this.movieDbs.forEach( async (movie)=>{
       const res = await this.$axios.get(requests.fetchMovieById(movie.movieId));
       this.movie.push(res.data)
     })
    },
   async initializeData(){
     setTimeout(() => {
        const user = this.$fire.auth.currentUser;
       this.$fire.firestore.collection("users").doc(user.uid).collection('movieList').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.movieDbs.push(doc.data());
        });
        this.getMovie();
      })
     }, 500);
   }
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
