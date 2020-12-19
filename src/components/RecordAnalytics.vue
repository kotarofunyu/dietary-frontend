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
    <v-data-iterator
      content-tag="tag"
      row
      wrap
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      items-per-page-options="rowsPerPageItems"
      pagination.sync="pagination"
    >
      <template>
       <v-row>
         <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
         >
          <v-card>
            <v-card-title>
              {{ item.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item
                v-for="(key, index) in filteredKeys"
                :key="index"
              >
                <v-list-item-content
                  class="align-end"
                  :class="{ 'blue--text': sortBy === key }"
                >
                 {{ item[key.toLowerCase()] }}
                </v-list-item-content>

              </v-list-item>
            </v-list>
          </v-card>
         </v-col>
       </v-row>
      </template>
      <template v-slot:footer>
  <v-row class="mt-2" align="center" justify="center">
    <span class="grey--text">Items per page</span>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
          {{ itemsPerPage }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(number, index) in itemsPerPageArray"
          :key="index"
          @click="updateItemsPerPage(number)"
        >
          <v-list-item-title>{{ number }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>

    <span class="mr-4 grey--text">
      Page {{ page }} of {{ numberOfPages }}
    </span>
    <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-row>
</template>
    </v-data-iterator>
  </div>
</template>
<script>
export default {
  name: "RecordAnalytics",
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
      value: "",
      events: [],
      weightsData: this.$store.state.weightsDatas,
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: [
        'Name',
        'Calories',
        'Fat',
        'Carbs',
        'Protein',
        'Sodium',
        'Calcium',
        'Iron',
      ],
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
        },
      ],
    };
  },
  mounted: function () {
    const events = [];
    this.weightsData.forEach((element) => {
      console.log(element);
      events.push({
        name: String(element.weight),
        start: new Date(element.date),
        end: new Date(element.date),
        color: "blue",
        timed: false,
      });
    });
    this.events = events;
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    }
  }
};
</script>
<style lang="">
</style>
