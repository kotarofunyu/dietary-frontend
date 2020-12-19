<template lang="">
  <div>
    <v-row>
      <LineChart :width="800" :height="500" />
    </v-row>
    <v-row>
      <RecordList />
    </v-row>
  </div>
</template>
<script>
import LineChart from './Bar'
import RecordList from './RecordList'
export default {
  name: 'RecordAll',
  components: {
    LineChart,
    RecordList
  }
}
</script>
<style lang="">
  
</style>
