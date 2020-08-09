<script>
  import { Bar } from 'vue-chartjs'
  import axios from 'axios'
  export default {
    name: 'Bar',
    extends: Bar,
    // props: ['chartdata', 'options'],
    data () {
      return {
      data: {
        labels: [],
        data: []
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
            }
          }]
        }
      }
    }
    },
    mounted () {
      console.log(this.data.labels)
      axios.get('http://localhost:3000/weights')
      .then(response => {
        console.log("とれたぜ")
        console.log(response.data)
        this.data.labels = response.data.map(item => item.date)
        this.data.data = response.data.map(item => item.weight)
        console.log(this.data.labels)
        console.log(this.data.data)
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
