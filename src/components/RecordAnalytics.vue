<template lang="">
  <div>
    <BaseCalendar :weights-data="weightsData" />
    <BaseDataIterator :weights-data="weightsData" />
  </div>
</template>
<script>
import BaseCalendar from './BaseCalendar'
import BaseDataIterator from './BaseDataIterator'
export default {
  name: "RecordAnalytics",
  components: {
    BaseCalendar,
    BaseDataIterator
  },
  data() {
    return {
      weightsData: this.$store.state.weightsDatas,
    }
  },
  mounted: function() {
    this.$store.dispatch("getWeightsDatas");
  }
};
</script>
<style lang="">
</style>
