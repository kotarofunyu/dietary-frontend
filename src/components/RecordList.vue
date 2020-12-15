<template>
  <v-container>
    <v-alert
    type="success"
    v-if="this.isDeleteDone"
    close-text="Close Alert"
    dismissible
    >削除しました</v-alert>
    <v-alert
    type="error"
    v-if="this.isError"
    close-text="Close Alert"
    dismissible
    >失敗しました</v-alert>
    <v-data-table :headers="headers" :items="items" :items-per-page="7">
      <template v-slot:item.action="{ item }">
        <v-btn small class="mx-1" :to="{ name: 'RecordDetail', params: { id: item.id, weight: item.weight, comment: item.comment, date: item.date } }">
          <v-icon>pageview</v-icon>詳細
        </v-btn>
        <v-btn
          :to="{ name: 'edit', params: { id: item.id, weight: item.weight, date: item.date, comment: item.comment } }"
        >
          編集
        </v-btn>
        <v-btn small class="mx-1" @click="deleteData(item.id)">
          <v-icon>pageview</v-icon>削除
        </v-btn>
      </template>
      <router-link to="/record/" + item.id>detail</router-link>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "RecordList",
  data() {
    return {
      isDeleteDone: false,
      isError: false,
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
        {
          text: "操作",
          value: "action",
        },
      ],
      items: this.$store.state.weightsDatas,
    };
  },
  mounted() {
    this.$store.dispatch("getWeightsDatas");
  },
  methods: {
    deleteData(id) {
      if (confirm("このデータを削除しますか？")) {
        axios
          .delete("http://localhost:3000/weights/" + id, { data: { id: id } })
          .then((response) => {
            console.log(response.data);
            this.deleteItemFromItems(this.items, id)
            this.isDeleteDone = true;
          })
          .catch((errors) => {
            this.isError = true;
          })
      }
    },
    deleteItemFromItems(array, id) {
      array.forEach((item, index) => {
        if (item.id === id) {
          array.splice(index, 1)
          console.log(array)
        }
      })
    }
  },
};
</script>
