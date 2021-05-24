<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "2021",
          "2020",
          "2019",
          "2018",
          "2017",
          "2016",
          "2015",
          "2014",
          "2013",
          "2012",
          "2011"
        ],
        datasets: [
          {
            label: "Revenue",
            data: [130423, 230423, 200423, 30423, 15423, 130423, 200423,29423,35423,290423, 201888],
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
          text: "Total Box Office"
        }
      }
    );
  }
};
</script>
