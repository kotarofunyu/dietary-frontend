<template>
  <div class="record">
    <v-container>
      <v-tabs>
        <v-tab v-for="item in tabItems" :key="item">
          {{ item }}
        </v-tab>
        <v-tab-item> <RecordAll /> </v-tab-item>
        <v-tab-item> <RecordMonthly /> </v-tab-item>
        <v-tab-item> <RecordAnalytics /> </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
import RecordAll from "../components/RecordAll";
import RecordMonthly from "../components/RecordMonthly";
import RecordAnalytics from '../components/RecordAnalytics';

export default {
  name: "Home",
  components: {
    RecordAll,
    RecordMonthly,
    RecordAnalytics
  },
  data() {
    return {
      tabItems: ["全記録", "月別", "数値分析"],
    };
  },
};
</script>
