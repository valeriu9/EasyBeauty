<template>
  <div>
    <div class="card">
      <img v-if="cardObject.favorit" src="~assets/images/bookmark.svg" alt="favourit" @click="addToFavorite(cardObject.id)" class="bookmark">
      <img v-else src="~assets/images/bookmark-2.svg" alt="favourit" class="bookmark">
      <img :src="cardObject.image" alt="card image">
      <div class="card-details">
      </div>
      <div class="card-text">
        <p class="title">{{cardObject.name}} </p>
      </div>
    </div>
    <div v-if="enableDelete" class="delete-button" @click="removeFavorite()">Remove</div>
  </div>
</template>
<script>

export default {
    props:{
    enableDelete:{
      type: Boolean,
      default: false
    },
    cardObject:{
      type: Object,
      default: () => { }
    }
  },
methods:{
  removeFavorite(){
    //post function here
    this.$emit('favoriteRemoved',this.cardObject);
  },
  addToFavorite(id){

  }
}
}
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  cursor: pointer;
  width: 200px;
  min-width: 200px;
  height: auto;
  margin-right: 20px;
  @include from($mobile) {
    width: 150px;
    min-width: 150px;
  }
}

.delete-button {
  padding: 8px 30px;
  border: 1px solid #fff;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  margin-right: 20px;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(221, 71, 71, 0.9);
  }
}
.bookmark {
  width: 50px;
  height: auto;
  position: absolute;
  top: 0;
}
.card-details {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
}
.card-text {
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  text-align: center;
  align-items: center;
  overflow: hidden;
}
p {
  position: absolute;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
