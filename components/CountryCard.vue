<template>
  <div class="card">
    <img :src="cardObject.image" alt="card image">
    <div class="card-text">
      <p class="title">{{countryName(cardObject.name)}} </p>
    </div>
  </div>
</template>

<script>

export default {
    props:{
    cardObject:{
      type: Object,
      default: () => { }
    }
  },
methods:{
  countryName(country){
    if(country === 'MD'){
      return 'Moldova'
    }
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
  height: 283.89px;
  margin-right: 20px;
  box-shadow: inset 0 0 2000px rgba(0, 0, 0);
  @include from($mobile) {
    width: 150px;
    min-width: 150px;
  }
  img {
    width: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
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
  color: rgb(217, 215, 215);
  height: 80px;
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
