<template>
  <div class="record">
    <v-container>
      <v-row>
        <LineChart :width="800" :height="500" />
      </v-row>
      <v-row>
        <RecordList />
      </v-row>
    </v-container>
    <v-container>
      <Monthly />
    </v-container>
  </div>
</template>

<script>
import LineChart from '../components/Bar'
import RecordList from '../components/RecordList'
import Monthly from '../components/Monthly'

export default {
  name: 'Home',
  components: {
    LineChart,
    RecordList,
    Monthly
  }
}
</script>
