<template>
  <div class="container">
    <Linechart v-if="getRating" :chartdata="getRating" />
    <BarChart v-if="getYears" :chartdata="getYears" />

  </div>
</template>

<script>

export default {
 mounted(){
   this.fetchData();

  },
  data(){
    return{
      getRating:null,
      getYears:null
      }
  },
  methods:{
   async fetchData(){
        try{
     const res = await this.$axios.get('https://europe-west1-sep6-314214.cloudfunctions.net/getRating');
     const res2 = await this.$axios.get('https://europe-west1-sep6-314214.cloudfunctions.net/get_last20Years');

     this.transform(res.data)
     this.transform2(res2.data)
   }
   catch(e){
     console.log(e);
   }
    },
    transform(res){
      let label = [];
      let data = [];
      for(let i = 0; i < res.length; i++){
        label.push(res[i].year)
        data.push(res[i].rating)
      }
      this.getRating = {labels: label, datasets: data}
    },
    transform2(res2){
      let label = [];
      let data = [];
      for(let i = 0; i < res2.length; i++){
        label.push(res2[i].year)
        data.push(res2[i].movies)
      }
      this.getYears = {labels: label, datasets: data}
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
