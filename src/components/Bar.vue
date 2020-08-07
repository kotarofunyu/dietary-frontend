<script>
  import { Bar } from 'vue-chartjs'
  export default {
    name: 'Bar',
    extends: Bar,
    props: ['chartdata', 'options'],
    mounted () {
      this.renderChart(this.data, this.options)
    }
  }
</script>

<style>
</style>
