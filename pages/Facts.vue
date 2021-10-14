<template>
  <div>
    <div v-if="loading" class="loader"></div>
    <div class="container">
      <Linechart v-if="getRating" :chartdata="getRating" />
      <BarChart v-if="getYears" :chartdata="getYears" />

    </div>
  </div>
</template>

<script>

export default {
 mounted(){
   this.fetchData();

  },
  data(){
    return{
      loading: false,
      getRating:null,
      getYears:null
      }
  },
  methods:{
   async fetchData(){
      this.loading = true
        try{
     const res = await this.$axios.get('https://europe-west1-sep6-314214.cloudfunctions.net/getRating');
     const res2 = await this.$axios.get('https://europe-west1-sep6-314214.cloudfunctions.net/get_last20Years');

     this.transform(res.data)
     this.transform2(res2.data)
     this.loading = false
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
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
