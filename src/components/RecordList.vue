<template>
  <div>
    <v-container>
      <v-alert
        type="success"
        v-if="this.isDeleteDone"
        close-text="Close Alert"
        dismissible
        >削除しました</v-alert
      >
      <v-alert
        type="error"
        v-if="this.isError"
        close-text="Close Alert"
        dismissible
        >失敗しました</v-alert
      >
      <v-data-table
        :headers="headers"
        :items="weights"
        item-key="id"
        :items-per-page="7"
      >
        <template v-slot:item.action="{ item }">
          <v-btn fab small color="blue" outlined @click="editItem(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            fab
            small
            color="blue"
            outlined
            class="mx-1"
            @click="deleteData(item.id)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
        <router-link to="/record/" + item.id>detail</router-link>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FormModal from "./FormModal";
export default {
  name: "RecordList",
  components: {
    FormModal,
  },
  props: {
    weights: null,
  },
  data() {
    return {
      isDeleteDone: false,
      isError: false,
      tabItems: ["全記録", "月別", "数値分析"],
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
    };
  },
  methods: {
    deleteData(id) {
      if (confirm("このデータを削除しますか？")) {
        this.axios
          .delete("/weights/" + id, { data: { id: id } })
          .then((response) => {
            this.$store.dispatch("getWeightsDatas");
            this.isDeleteDone = true;
          })
          .catch((errors) => {
            this.isError = true;
            console.log(errors);
          });
      }
    },
  },
};
</script>
