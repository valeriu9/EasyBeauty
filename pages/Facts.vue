<template>
  <div class="container">
    <Linechart v-if="getRating" :chartdata="getRating" :options="options" />

  </div>
</template>

<script>

export default {
 mounted(){
   this.fetchData();

  },
  data(){
    const options ={
				responsive: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							callback: (value) => {
								return value + units[i];
							}
						}
					}]
				}
			}
    return{getRating:null, options}
  },
  methods:{
   async fetchData(){
        try{
     const res = await this.$axios.get('https://europe-west1-sep6-314214.cloudfunctions.net/getRating');
     this.transform(res.data)
     console.log(this.getRating);
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
