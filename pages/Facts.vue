<template>
  <div class="container">
    <Linechart />

  </div>
</template>

<script>

export default {
 mounted(){
   this.fetchData();
  },
  methods:{
   async fetchData(){
        try{
     const res = await this.$axios.get('https://europe-west1-sep6-314214.cloudfunctions.net/getRating');
     console.log(res.data.result);
   }
   catch(e){
     console.log(e);
   }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: rgba(235, 235, 235, 0.905);
  margin-top: 30px;
}
</style>
