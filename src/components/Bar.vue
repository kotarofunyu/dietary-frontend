<script>
  import { Line } from 'vue-chartjs'
  import axios from 'axios'
  import { mapState } from 'vuex'
  export default {
    name: 'LineChart',
    extends: Line,
    data () {
      return {
        data: {
          labels: [],
          datasets: [
            {
              label: "体重",
              data: []
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 10,
                min: 60
              }
            }]
          }
        }
      }
    },
    mounted () {
      this.$store.dispatch('getWeightsDatas')
      this.data.labels = this.$store.state.dates
      this.data.datasets[0].data = this.$store.state.weights
      this.renderChart(this.data, this.options)
    }
  }
</script>

<style>
</style>
