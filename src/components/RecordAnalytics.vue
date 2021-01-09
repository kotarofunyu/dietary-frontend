<template lang="">
  <div>
    <BaseCalendar :weights-data="weights" />
    <BaseDataIterator :weights-data="weights" />
  </div>
</template>
<script>
import BaseCalendar from "./BaseCalendar";
import BaseDataIterator from "./BaseDataIterator";
export default {
  name: "RecordAnalytics",
  components: {
    BaseCalendar,
    BaseDataIterator,
  },
  computed: {
    weights() {
      return this.$store.state.weightsDatas;
    },
  },
};
</script>
<style lang="">
</style>
