<template>
  <div class="container">
    <p class="header-text">Based on your favorites...</p>
    <div class="card-wrapper">
      <div v-for="data of recomanded" :key="data.index" class="card-place">
        <Card :cardObject="data" />
      </div>
    </div>
  </div>
</template>
<script>
import requests from '~/helpers/api.js'
export default {
  mounted(){
this.initializeData();
  },
  data(){
    const categoryName = this.$route.params.category;
    return{  categoryName, movieDbs:[], recomanded:[]}
  },
  methods:{
 async initializeData(){
     setTimeout(() => {
        const user = this.$fire.auth.currentUser;
       this.$fire.firestore.collection("users").doc(user.uid).collection('movieList').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.movieDbs.push(doc.data());
        });
        this.getMovies();
      })
     }, 500);
  },
  async getMovies(){
    for(let i=0; i<this.movieDbs.length; i++){
      console.log(this.movieDbs);
      try{
        const res = await this.$axios.get(requests.fetchSimilar(this.movieDbs[i].movieId));
      this.recomanded.push(...res.data.results);
        console.log(this.recomanded);
      }
   catch(e){
  console.log(e);
   }
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
  padding-top: 30px;
  font-size: 50px;
  font-weight: 700;
  color: #fff;
  text-transform: capitalize;
}
.card {
  @include from($desktop) {
    width: 250px !important;
  }
}
.card-place {
  padding-top: 14px;
  display: inline-block;
}
</style>
