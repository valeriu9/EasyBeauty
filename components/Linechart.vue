<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
    props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  data(){
    console.log(this.chartdata);
    return{aaaa:''}
  },
  mounted () {
    if(this.chartdata){
    this.renderChart(this.chartdata, this.options)
    }

  }
};
</script>
