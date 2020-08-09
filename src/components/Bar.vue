<script>
  import { Line } from 'vue-chartjs'
  import axios from 'axios'
  export default {
    name: 'LineChart',
    extends: Line,
    // props: ['chartdata', 'options'],
    data () {
      return {
        data: {
          labels: [],
          datasets: [
            {
              label: "体重",
              data: [10, 20, 30, 60]
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
      axios.get('http://localhost:3000/weights')
      .then(response => {
        console.log("とれたぜ")
        this.data.labels = response.data.map(item => item.date)
        this.data.datasets[0].data = response.data.map(item => item.weight)
      })
      .catch(error => {
        if(error.response) {
          console.log(error)
        }
      })
      this.renderChart(this.data, this.options)
    }
  }
</script>

<style>
</style>
