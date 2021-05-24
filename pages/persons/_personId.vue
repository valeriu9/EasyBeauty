<template>
  <div class="container">
    <div class="overview-wrapper">
      <div class="img-container">
        <img v-if="image" :src="image" alt="actor img">
        <img v-else src="~assets/images/no-image.png" alt="card image" class="image lazyload">
      </div>
      <div class="actor-info">
        <div class="right-side">
          <p v-if="actor.name" class="title">{{actor.name}}</p>
          <p v-else class="title">{{actor.name}}</p>
          <div v-if="actor.place_of_birth" class="field-name">
            <p>Place of birth:</p>
            <span>{{actor.place_of_birth}} </span>
          </div>
          <div v-if="actor.known_for_department" class="field-name">
            <p>Known for:</p>
            <span>{{actor.known_for_department}}</span>
          </div>
          <div v-if="actor.release_date" class="field-name">
            <p>Release date:</p>
            <span>{{actor.release_date}}</span>
          </div>
          <div v-if="actor.birthday" class="field-name">
            <p>Birthday:</p>
            <span>{{actor.birthday}}</span>
          </div>
          <div v-if="actor.deathday" class="field-name">
            <p>Deathday:</p>
            <span>{{actor.deathday}}</span>
          </div>
          <div v-if="actor.also_known_as" class="field-name">
            <p>Also known as:</p>
            <span v-for="names in actor.also_known_as" :key="names.index">{{names}} <br></span>
          </div>
        </div>

        <div class="left-side">
          <p class="title">Description:</p>
          <span class="subtext">{{actor.biography}}</span>
        </div>
      </div>
    </div>
    <div class="list-container">
      <p class="title margin-left-12">Known for:</p>
      <div class="display-flex">
        <div v-for="movie in movies" :key="movie.index" class="actor-slot">
          <nuxt-link :to="`/movie/`+movie.id">
            <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/original/`+movie.poster_path" class="actor-img" alt="actor img">
            <img v-else src="~/assets/images/no-image.png" class="actor-img missing" alt="actor img">
            <span v-if="movie.name">{{movie.name}}</span>
            <span v-if="movie.title">{{movie.title}}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="container-bottom"></div>
  </div>
</template>

<script>
import requests from '~/helpers/api.js'
export default {
 async mounted (){
   try{
     const res = await this.$axios.get(requests.fetchActorById(this.$route.params.personId));
    this.image = this.appendUrl(res.data.profile_path);
    this.actor = res.data;
    this.fetchMoviesStarredIn();
    }
    catch(e){
      console.log(e);
    }
  },
data(){
  const image ='';
  return{actor:{}, image, movies:[]}
},
methods:{
  appendUrl(img){
    if(img){
    return 'https://image.tmdb.org/t/p/original/'+img
    }
  },
  async fetchMoviesStarredIn(){
      try{
     const res = await this.$axios.get(requests.fetchActorStarredIn(this.$route.params.personId));
    this.movies = res.data.cast;
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
.margin-bottom-100 {
  margin-bottom: 100px;
}
.margin-left-12 {
  margin-left: 12px;
}
p {
  color: #fff;
}
span {
  color: rgb(221, 212, 212);
}
.container {
  padding-top: 80px;
}
.overview-wrapper {
  display: flex;
}
.img-container {
  width: 400px;
}
.actor-info {
  width: 700px;
  margin-left: 40px;
  display: flex;
}
.title {
  font-size: 40px;
  color: #fff;
  margin-bottom: 12px;
}
.field-name {
  margin-top: 12px;
  p {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
  }
}
.left-side {
  width: 50%;
}
.right-side {
  width: 50%;
}
.add-favorite {
  width: calc(100% - 60px);
  padding: 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #ccc;
  text-align: center;
  background-color: rgb(189, 148, 12);
  cursor: pointer;
  margin: 20px;
}
.list-container {
  width: 100%;
  border: 1px solid #ccc;
  margin-top: 40px;
  background-color: rgba(255, 255, 255, 0.09);
}
.comments-container {
  width: 100%;
  border: 1px solid #ccc;
  margin-top: 40px;
  background-color: rgba(255, 255, 255, 0.09);
}
.display-flex {
  display: flex;
  flex-wrap: wrap;
}
.actor-slot {
  width: 100px;
  margin: 20px 12px;
  img {
    min-width: 100px;
    height: 150px;
    object-fit: cover;
  }
}
.production-slot {
  margin: 20px 12px;
  margin-top: 0;
}
.container-bottom {
  height: 100px;
}
.missing {
  background-color: #ccc;
}
.comment-slot {
  max-width: 600px;
  background-color: #ccc;
  border-radius: 12px;
  padding: 12px;
  margin: 12px;
  width: fit-content;
}
.user {
  font-size: 20px;
  font-weight: 700;
  color: #000;
}
.comment {
  color: #000;
}
textarea {
  width: 600px;
  height: 200px;
  align-self: center;
  border-radius: 8px;
  resize: none;
  padding: 12px;
}
.write-comment {
  display: flex;
  justify-content: center;
  border-top: 1px dotted #ccc;
  padding: 12px;
  margin: 0 20px;
  margin-bottom: 20px;
}
.button {
  padding: 12px 20px;
  width: fit-content;
  height: fit-content;
  border-radius: 36px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  align-self: flex-end;
  background-color: rgb(50, 135, 40);
  margin-left: 8px;
}
.align-middle {
  text-align: center;
  padding: 20px;
}
</style>
