<template lang="">
  <div>
    <v-row>
      <LineChart :data="chartData" :options="chartOptions" :width="800" :height="500" />
    </v-row>
    <v-row>
      <RecordList />
    </v-row>
  </div>
</template>
<script>
import LineChart from "./Bar";
import RecordList from "./RecordList";
export default {
  name: "RecordAll",
  components: {
    LineChart,
    RecordList,
  },
  computed: {
    chartData() {
      const data = {
        labels: this.$store.state.dates,
        datasets: [
          {
            label: "データ",
            data: this.$store.state.weights,
          },
        ],
      };
      return data;
    },
    chartOptions() {
      const options = {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                stepSize: 5,
                min: 85,
              },
            },
          ],
        },
      };
      return options;
    },
  },
};
</script>
<style lang="">
</style>
