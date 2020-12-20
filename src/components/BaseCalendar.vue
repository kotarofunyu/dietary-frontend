<template lang="">
  <div>
    <v-sheet tile height="54" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
      <v-toolbar-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-threshold="30"
      ></v-calendar>
    </v-sheet>
  </div>
</template>
<script>
export default {
  name: "BaseCalendar",
  props: {
    weightsData: {
      type: Array,
      default: null,
      required: true
    }
  },
  data() {
    return {
      type: "month",
      types: ["month", "week", "day", "4day"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: "日曜 - 土曜", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "月曜 - 日曜", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "月曜 - 金曜", value: [1, 2, 3, 4, 5] },
      ],
      events: [],
      value: "",
    }
  },
  mounted: function() {
    const events = []
    this.$options.propsData.weightsData.forEach((element) => {
      events.push({
        name: String(element.weight),
        start: new Date(element.date),
        end: new Date(element.date),
        color: "blue",
        timed: false
      })
      this.events = events
    })
  }
}
</script>
<style lang="">
  
</style>
