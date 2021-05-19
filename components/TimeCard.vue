<template>
  <div class="card">
    <p class="title">{{timeRange}} </p>
  </div>
</template>

<script>

export default {
    props:{
    timeRange:{
      type: String,
      default:''
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
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
