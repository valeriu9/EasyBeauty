<template>
  <div class="container">
    <div class="overview-wrapper">
      <div class="img-container">
        <img :src="movie.img" alt="movie img">
      </div>
      <div class="movie-info">
        <div class="right-side">
          <p class="title">{{movie.name}}</p>
          <div v-if="movie.vote_average" class="field-name">
            <p>Rating</p>
            <span>{{movie.vote_average}} out of {{movie.vote_count}} ratings</span>
          </div>
          <div v-if="movie.genre" class="field-name">
            <p>Genre:</p>
            <span>{{movie.genre}}</span>
          </div>
          <div v-if="movie.status" class="field-name">
            <p>Status:</p>
            <span>{{movie.status}}</span>
          </div>
          <div v-if="movie.releaseDate" class="field-name">
            <p>Release date:</p>
            <span>{{movie.releaseDate}}</span>
          </div>
          <div v-if="movie.budget" class="field-name">
            <p>Budget:</p>
            <span>{{movie.budget}}</span>
          </div>
          <div v-if="movie.director" class="field-name">
            <p>Director:</p>
            <span>{{movie.director}}</span>
          </div>
        </div>

        <div class="left-side">
          <p class="title">Description:</p>
          <span class="subtext">{{movie.overview}}</span>
        </div>
      </div>
    </div>
    <div class="list-container">
      <p class="title margin-left-12">Stars:</p>
      <div class="display-flex">
        <div v-for="actor in actors" :key="actor.index" class="actor-slot">
          <img v-if="actor.img" :src="actor.img" class="actor-img" alt="actor img">
          <img v-else src="~/assets/images/actor-img.png" class="actor-img missing" alt="actor img">
          <span>{{actor.name}}</span>
        </div>
      </div>
    </div>
    <div class="list-container ">
      <p class="title margin-left-12">Production companie(s):</p>
      <div class="display-flex">

        <div v-for="production in productions" :key="production.index" class="production-slot">
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
export default {
data(){
  const movie = {img:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9TvWJmXYuiq0Zf50Sc5wk3DODvW.jpg',
  name:'Sexy Dhoban',
  overview:'She was sexy and hot. She came to him to get some clothes done. But it turned steamy. Later he found out Sexy Dhoban was a ghost! A weird story of revengeful horny Dhoban!',
  vote_count:300,
  vote_average: 7.5,
  genre:'comedy',
  status:'Returning Series',
  budget:200000,
  releaseDate:'2029/10/22',
  director:'Fredie Cumbey',
  }
  const actors=[
    {name:'Mark Zukemberg', img:'https://i.pinimg.com/originals/0d/a9/38/0da938e0005e17ef19dbe2a3886ffcd9.jpg'},
    {name:'Tim Cook', img:'https://i.pinimg.com/originals/9b/ec/89/9bec89b127f1d16a2c0eea4a2d63902a.jpg'},
    {name:'Johy Davis', img:'https://i.pinimg.com/originals/0b/30/43/0b30437521851217009a8818c24ada70.jpg'},
    {name:'Maria Biesu'} ]
  const productions=[
    {name:'Fox 2000 Pictures'},
    {name:'Taurus Film'},
    {name:'Linson Films'},
    {name:'Atman Entertainment'} ]
  const comments=[{user:'vanea', name:'good film'}, {user:'vanea', name:'nah, could be better'}, {user:'vanea', name:'the worst film ever what the fuck fuckfuckfuckfuckfuckfuckfuckfuckfuckfuckfuckfuckfuckv fuckfuck fuckfuckfuckfuckfuckfuck fuckfuck'}]
  const message= '';
  return{movie, actors, productions, comments, message}
},
methods:{
  addComment(message){
    const object = {user: this.$store.state.user.name, name:message};
    this.comments.push(object)
    this.message = ''
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
  width: 50%;
}
.right-side {
  width: 50%;
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
}
.actor-slot {
  width: 100px;
  margin: 20px 12px;
  img {
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
