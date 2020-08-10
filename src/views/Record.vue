<template>
  <div class="record">
    体重記録だよ
    <v-container>
      <v-row>
        <LineChart :width="800" :height="500" />
      </v-row>
      <v-row>
        <RecordList />
      </v-row>
    </v-container>
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
