<script>
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, {responsive: true,
                                        maintainAspectRatio: true,
                                          animation: {
                                            duration: 0
                                          },
                                        legend: {
                                          display: false
                                        },
      tooltips: {enabled: false},
      showScale: false
    })
  },
};
</script>
