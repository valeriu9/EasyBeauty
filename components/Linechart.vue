<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
    props: {
        label: {
          type: String
        },
    chartdata: {
      type: Array | Object,
      default: 0
    }
  },
  data(){
    console.log(this.chartdata);
    return{aaaa:'s'}
  },
 async mounted () {
    if(this.chartdata){
   this.renderChart(
      {
        labels: this.chartdata.labels,
        datasets: [
          {
            label: "ratings",
            data: this.chartdata.datasets,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Average movie ratings per year"
        }
      }
    );
    }
  }
};
</script>
