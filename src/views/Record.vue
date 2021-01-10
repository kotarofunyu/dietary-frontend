<template>
  <div class="record">
    <v-container>
      <v-btn @click="reloadData" style="margin: 20px 0"
        >データ手動更新（通信が発生します）</v-btn
      >
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
import RecordAnalytics from "../components/RecordAnalytics";

export default {
  name: "Home",
  components: {
    RecordAll,
    RecordMonthly,
    RecordAnalytics,
  },
  data() {
    return {
      tabItems: ["全記録", "月別", "数値分析"],
    };
  },
  methods: {
    reloadData() {
      this.$store.dispatch("getWeightsDatas");
    },
  },
};
</script>
