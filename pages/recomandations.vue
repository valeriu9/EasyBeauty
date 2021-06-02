<template>
  <div class="container">
    <p class="header-text">Based on your favorites...</p>
    <div class="card-wrapper">
      <div v-for="data of cardObject" :key="data.index" class="card-place">
        <Card :cardObject="data" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    const categoryName = this.$route.params.category;
    return{ cardObject, categoryName}
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
