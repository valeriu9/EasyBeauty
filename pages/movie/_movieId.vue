<template>
  <div class="container">
    <div class="overview-wrapper">
      <div class="img-container">
        <img v-if="image" :src="image" alt="movie img">
        <img v-else src="~assets/images/no-image.png" alt="card image" class="image lazyload">
      </div>
      <div class="movie-info">
        <div class="right-side">
          <p v-if="movie.title" class="title">{{movie.title}}</p>
          <p v-else class="title">{{movie.name}}</p>
          <div v-if="movie.vote_average" class="field-name">
            <p>Rating</p>
            <span>{{movie.vote_average}} out of {{movie.vote_count}} ratings</span>
          </div>
          <div v-if="movie.genres" class="field-name">
            <p>Genre:</p>
            <span v-for="genre in movie.genres" :key="genre.index"> {{genre.name}}</span>
          </div>
          <div v-if="movie.status" class="field-name">
            <p>Status:</p>
            <span>{{movie.status}}</span>
          </div>
          <div v-if="movie.release_date" class="field-name">
            <p>Release date:</p>
            <span>{{movie.release_date}}</span>
          </div>
          <div v-if="movie.budget" class="field-name">
            <p>Budget:</p>
            <span>{{movie.budget}}</span>
          </div>
          <div v-if="movie.revenue" class="field-name">
            <p>Revenue:</p>
            <span>{{movie.revenue}}</span>
          </div>
          <div v-if="credits.crew" class="field-name">
            <p>Director:</p>
            <span v-for="(director, index) in filteredItems" :key="index">{{director.name}}<span v-if="index+1 < filteredItems.length">, </span></span>
          </div>
        </div>

        <div class="left-side">
          <p class="title">Description:</p>
          <span class="subtext">{{movie.overview}}</span>
          <div v-if="movieExists && loggedIn" class="add-favorite" @click="saveFav($route.params.movieId)">
            Add to favorite
          </div>
        </div>
      </div>
    </div>
    <div class="list-container">
      <p class="title margin-left-12">Stars:</p>
      <div class="display-flex">
        <div v-for="actor in credits.cast" :key="actor.index" class="actor-slot">
          <nuxt-link :to="`/persons/`+actor.id">
            <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/original/`+actor.profile_path" class="actor-img" alt="actor img">
            <img v-else src="~/assets/images/actor-img.png" class="actor-img missing" alt="actor img">
            <span>{{actor.name}}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="list-container ">
      <p class="title margin-left-12">Production companie(s):</p>
      <div class="display-flex">
        <div v-for="production in movie.production_companies" :key="production.index" class="production-slot">
          <span>{{production.name}}</span>
        </div>
      </div>
    </div>
    <div class="comments-container">
      <p class="title margin-left-12">Comments</p>
      <div class="comments">
        <div v-if="comments.length != 0">
          <div v-for="comment in comments" :key="comment.index" class="comment-slot">
            <p class="user">{{comment.user}}</p>
            <p class="comment">{{comment.name}}</p>
          </div>
        </div>
        <div v-else class="align-middle">
          <p>There are no comments yet. Be first to comment this movie!</p>
        </div>
      </div>
      <div v-if="this.$store.state.user.name" class="write-comment">
        <textarea v-model="message" />
        <div class="button" @click="addComment(message)">Add comment</div>
      </div>
    </div>
    <div class="container-bottom"></div>
  </div>
</template>

<script>
import requests from '~/helpers/api.js'
export default {
 async mounted (){
   this.getFavorites();
    try{
    const res = await this.$axios.get(requests.fetchMovieById(this.$route.params.movieId));
    this.image = this.appendUrl(res.data.poster_path);
    Object.assign(this.movie,res.data);
    }
    catch(e){
      console.log(e);
    }
    this.fetchCredits();
    this.getComments();
  },
  computed: {
    filteredItems() {
      return this.credits.crew.filter(item => {
         return item.job.toLowerCase().indexOf('director') > -1
      })
    }
    // isFavorited(){
    //   console.log(this.favorites.movieId +'computed');
    //   return this.favorites.includes((movieId)=>{movieId.includes(this.movie.id)})
    // }
  },
data(){
  const credits={}
  const comments=[]
  const message= '';
  const loggedIn = !!this.$store.state.user.name;
  return{ movie:{}, credits, comments, message, image:'', clicked: false, favorites:[], movieExists: false, loggedIn}
},
methods:{
  addComment(message){
    const object = {user: this.$store.state.user.name, name:message};
    this.comments.push(object)
    this.message = ''
    this.writeComment(message)
  },
  async saveFav(id) {
    const movieTitle = this.movie.title || this.movie.name
    const user = this.$fire.auth.currentUser
        const ref = this.$fire.firestore.collection('users')
        .doc(user.uid).collection('movieList').doc(movieTitle)
        const value = {
          movieId: id
        }
        try {
          await ref.set(value)
          this.movieExists = false;
        } catch (e) {
          console.error(e)
        }
        this.writeSuccessful = true
      },
  async writeComment(message){
        const ref = this.$fire.firestore.collection('comments').doc(this.movie.id.toString())
        .collection('commentList')
        const value = {
          user: this.$store.state.user.name,
          name: message
        }
        try {
          await ref.add(value)
        } catch (e) {
          console.error(e)
        }
        this.writeSuccessful = true

      },
  appendUrl(img){
    if(img){
    return 'https://image.tmdb.org/t/p/original/'+img
    }
  },
  async fetchCredits(){
    const res = await this.$axios.get(requests.fetchMovieCredits(this.$route.params.movieId));
    this.credits = res.data
  },
  async getComments(){
    try{
     setTimeout(() => {
       this.$fire.firestore.collection("comments").doc(this.movie.id.toString()).collection('commentList').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc);
          this.comments.push(doc.data());
        });
      })
     }, 1000);
     }
     catch(e){
       console.log(e);
     }
  },
  async getFavorites(){
    try{
     setTimeout(() => {
        const user = this.$fire.auth.currentUser;
        if(user){
       this.$fire.firestore.collection("users").doc(user.uid).collection('movieList').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.favorites.push(doc.data());
        });
         this.checkFavorite(this.favorites);
      })
         }
     }, 2000);
     }
     catch(e){
       console.log(e);
     }
  },
  checkFavorite(list){
     const user = this.$fire.auth.currentUser;
        if(user.uid){
          if(list.length !== 0){
      for(let i = 0; i < list.length; i++){
        if(list[i].movieId === this.movie.id.toString()){
          this.movieExists = false;
        }
        else{
          this.movieExists = true;
        }
      }
    }
    else{
      this.movieExists = true
    }
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
.movie-info {
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
  width: 30%;
}
.right-side {
  width: 70%;
}
.add-favorite {
  padding: 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #ccc;
  text-align: center;
  background-color: rgb(189, 148, 12);
  cursor: pointer;
  margin: 20px;
  &:disabled {
    pointer-events: none;
    background-color: #ccc;
  }
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
