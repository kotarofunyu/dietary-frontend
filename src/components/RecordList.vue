<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="5"></v-data-table>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "RecordList",
  data() {
    return {
      headers: [
        {
          text: "Date",
          align: "start",
          value: "date",
        },
        {
          text: "体重(kg)",
          value: "weight",
        },
        {
          text: "コメント",
          value: "comment",
        },
      ],
      items: this.$store.state.weightsDatas
    };
  },
  mounted () {
    this.$store.dispatch('getWeightsDatas')
    console.log(this.$store.state.weightsDatas)
  }
};
</script>
