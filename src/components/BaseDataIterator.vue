<template lang="">
  <div>
    <v-data-iterator
        :items="weekly"
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
              v-for="(value, index) in weekly"
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
                  Average {{ averages[index] }}kg
                </v-card-subtitle>
                <v-card-subtitle v-if="comparison">
                  前週比較 -0.5kg
                </v-card-subtitle>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item
                    v-for="item in value"
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

            <span
              class="mr-4
              grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
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
      monthsArray: Array(12)
        .fill(null)
        .map((_, i) => i + 1)
        .map((x) => `${x}月`),
      selectedMonth: null,
      monthly: null,
      averages: [],
      weekAverage: false,
      comparison: false
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.weekly.length / this.itemsPerPage);
    },
    weekly() {
      const weekly = [[], [], [], [], []];
      if (!this.monthly) {
        return weekly;
      }
      const weightsData = this.monthly;
      const amount = weightsData.length;
      let i = 0;
      weightsData.forEach((element) => {
        if (i > amount) {
          return;
        }
        if (i <= 6) {
          weekly[0].push({
            date: element.date,
            weight: element.weight,
          });
        } else if (i <= 13) {
          weekly[1].push({
            date: element.date,
            weight: element.weight,
          });
        } else if (i <= 20) {
          weekly[2].push({
            date: element.date,
            weight: element.weight,
          });
        } else if (i <= 27) {
          weekly[3].push({
            date: element.date,
            weight: element.weight,
          });
        } else if (i <= 31) {
          weekly[4].push({
            date: element.date,
            weight: element.weight,
          });
        }
        i += 1;
      });
      this.averages = [];
      weekly.forEach((arr) => {
        let weekWeights = arr.map((x) => x.weight);
        let sum = weekWeights.reduce((sum, element) => sum + element, 0);
        let av = sum / weekWeights.length;
        this.averages.push(Math.round(av * Math.pow(10, 2)) / Math.pow(10, 2));
      });
      console.log(this.averages);
      console.log(weekly);
      return weekly;
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    getMonthly() {
      this.axios
        .get(`http://localhost:3000/monthly?month=${this.selectedMonth}`)
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
