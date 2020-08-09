<template>
  <div class="record">
    体重記録だよ
    <LineChart />
  </div>
</template>

<script>
import LineChart from '../components/Bar'

export default {
  name: 'Home',
  components: {
    LineChart
  }
}
</script>
