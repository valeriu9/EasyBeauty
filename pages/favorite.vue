<template>
  <div class="container">
    <p class="header-text">Favorite movies</p>
    <div class="card-wrapper">
      <div v-for="data of movie" :key="data.index" class="card-place">
        <Card :cardObject="data" :enableDelete="true" :favorit="true" @favoriteRemoved="removeFromDb(data.index)" />
      </div>
      <p class="header-text" @click="removeFromDb('zRabWuDZnYF3X0WAOf1Jnpm')">Remove movie</p>
    </div>
  </div>
</template>
<script>
import requests from '~/helpers/api.js'
export default {
 async mounted(){
  this.$fire.firestore.collection("test").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const object = {id: doc.id, movieId: doc.data().number}
      this.movieDbs.push(object);
    });
    this.getMovie();
  })
 },
  data() {
   const movie = [];
   const movieDbs = [];
    return { movie, movieDbs }
  },
  methods:{
    // removeFromList(object){
    //   console.log(object);
    //  let i = this.cardObject.indexOf(object) // find index of your object
    //  console.log(i);
    //   this.cardObject.splice(i, 1)
    // },
    async removeFromDb(id){
       this.$fire.firestore.collection("test").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
    }).catch((error) => {
    console.error("Error removing document: ", error);
  });
    },
    getMovie(){
     this.movieDbs.forEach( async (movie)=>{
       const res = await this.$axios.get(requests.fetchMovieById(movie.movieId));
       this.movie.push(res.data)
     })
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
