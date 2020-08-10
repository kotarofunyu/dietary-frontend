<template>
  <div class="record">
    体重記録だよ
    <LineChart />
    <RecordList />
  </div>
</template>

<script>
import LineChart from '../components/Bar'
import RecordList from '../components/RecordList'

export default {
  name: 'Home',
  components: {
    LineChart,
    RecordList
  }
}
</script>
