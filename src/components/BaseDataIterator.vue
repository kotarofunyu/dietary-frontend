<template lang="">
  <div>
    <v-data-iterator
        :items="weekObject"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="selectedYear"
                flat
                solo-inverted
                hide-details
                :items="yearsArray"
                prepend-inner-icon="mdi-magnify"
                label="年を選択"
              ></v-select>
              <v-select
                v-model="selectedMonth"
                flat
                solo-inverted
                hide-details
                :items="monthsArray"
                prepend-inner-icon="mdi-magnify"
                label="月を選択"
                @change="getMonthly"
              ></v-select>
              <v-spacer></v-spacer>
              <v-switch
                v-model="weekAverage"
                label="週平均"
                color="indigo darken-3"
                value="indigo darken-3"
              ></v-switch>
              <v-spacer></v-spacer>
              <v-switch
                v-model="comparison"
                label="前週比較"
                color="indigo darken-3"
                value="indigo darken-3"
              ></v-switch>
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-model="sortDesc"
                mandatory
              >
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
                >
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
                >
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="(value, index) in weekObject"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  WEEK{{ index+1 }}
                </v-card-title>
                <v-card-subtitle v-if="weekAverage">
                  Average {{ value.average }}kg
                </v-card-subtitle>
                <v-card-subtitle v-if="comparison">
                  前週比較 {{ averageDiffs[index] }}
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item
                    v-for="item in value.week"
                    :key="item.date"
                  >
                    <v-list-item-content>
                      {{ item.date }}
                    </v-list-item-content>
                    <v-list-item-content>
                      {{ item.weight }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row
            class="mt-2"
            align="center"
            justify="center"
          >
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
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
          </v-row>
        </template>
      </v-data-iterator>
  </div>
</template>
<script>
export default {
  name: "BaseDataIterator",
  props: {
    weightsData: {
      type: Array,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      yearsArray: [2020, 2021],
      monthsArray: Array(12)
        .fill(null)
        .map((_, i) => i + 1),
      selectedMonth: null,
      selectedYear: null,
      monthly: null,
      averages: [],
      averageDiffs: [],
      weekAverage: false,
      comparison: false,
    };
  },
  computed: {
    // numberOfPages() {
    //   return Math.ceil(this.weekly.length / this.itemsPerPage);
    // },
    weekObject() {
      if (!this.monthly) {
        return [];
      }
      const weekObject = this.createWeekObjectFromMonthObject(this.monthly);

      return this.setAverageToWeekObject(weekObject);
    },
    getAverageDiffs() {
      this.averageDiffs = [];
      for (let i = 0; i < this.averages.length; i++) {
        if ((i = 0)) {
          this.averageDiffs.push(this.averages[i]);
        } else {
          this.averageDiffs.push(this.averages[i] - this.averages[i - 1]);
        }
      }
      console.log(this.averageDiffs);
    },
  },
  methods: {
    // nextPage() {
    //   if (this.page + 1 <= this.numberOfPages) this.page += 1;
    // },
    // formerPage() {
    //   if (this.page - 1 >= 1) this.page -= 1;
    // },
    calcSum(array) {
      return array.reduce((sum, element) => sum + element, 0);
    },
    calcAverage(array) {
      let average = this.calcSum(array) / array.length;
      return (average =
        Math.round(average * Math.pow(10, 2)) / Math.pow(10, 2));
    },
    createWeightArrayFromObject(object) {
      return object.week.map((x) => x.weight);
    },
    createWeekObjectFromMonthObject(monthObject) {
      const arr = [0, 7, 14, 21, 28];
      const weekObject = [];

      arr.forEach((num) => {
        let week = monthObject.slice(num, num + 7);
        if (week.length) {
          const weekItem = { week: week, average: null };
          weekObject.push(weekItem);
        }
      });

      return weekObject;
    },
    setAverageToWeekObject(weekObject) {
      weekObject.forEach((element) => {
        element.average = this.calcAverage(
          this.createWeightArrayFromObject(element)
        );
      });

      return weekObject;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    getMonthly() {
      this.axios
        .get("/monthly", {
          params: { year: this.selectedYear, month: this.selectedMonth },
        })
        .then((response) => {
          this.monthly = response.data;
        })
        .catch((error) => {
          this.monthly = [];
        });
    },
  },
};
</script>
<style lang="">
</style>
