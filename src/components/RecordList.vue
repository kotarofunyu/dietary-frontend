<template>
  <v-container>
    <v-alert
      type="success"
      v-if="this.isDeleteDone"
    >削除しました</v-alert>
    <v-data-table :headers="headers" :items="items" :items-per-page="7">
      <template v-slot:item.action="{ item }">
        <v-btn small class="mx-1" :to="'/record/' + item.id">
          <v-icon>pageview</v-icon>詳細
        </v-btn>
        <v-btn small class="mx-1" :to="'/record/' + item.id + '/edit'">
          <v-icon>pageview</v-icon>編集
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
            this.isDeleteDone = true;
          });
      }
    },
  },
};
</script>
