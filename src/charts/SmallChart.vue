<script>
/**
 * Small chart for home table
 */
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
const options = {
    responsive: false,
    maintainAspectRatio: false,
    events: [],
    animation:{
      duration: 0
    },
    legend:{
      display: false,
    },
    tooltips:{
      enabled: false,
    },
    scales: {
      yAxes: [{
        display: false,
      }],
      xAxes: [{
        display: false,
      }]
    },

  };
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData,options);
  },
};
</script>
