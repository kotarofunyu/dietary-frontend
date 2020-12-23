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
        :items="items"
        item-key="id"
        :items-per-page="7"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            fab
            small
            class="mx-1"
            color="indigo"
            outlined
            @click="showItem(item)"
          >
            <v-icon>pageview</v-icon>
          </v-btn>
          <v-btn fab small color="indigo" outlined @click="editItem(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            fab
            small
            color="indigo"
            outlined
            class="mx-1"
            @click="deleteData(item.id)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
        <router-link to="/record/" + item.id>detail</router-link>
      </v-data-table>
      <FormModal
        :visible="dialog"
        httpMethod="put"
        :idData="editedItem.id"
        :dateData="editedItem.date"
        :weightData="editedItem.weight"
        :commentData="editedItem.comment"
        @close="dialog = false"
      />
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
  data() {
    return {
      detailDialog: false,
      dialog: false,
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
      items: this.$store.state.weightsDatas,
      editedItem: {
        id: 0,
        weight: 0,
        date: "",
        comment: "",
      },
      showingItem: {
        id: 0,
        weight: 0,
        date: "",
        comment: "",
      },
      editedIndex: -1,
    };
  },
  mounted() {
    this.$store.dispatch("getWeightsDatas");
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(this.editedItem);
    },
    showItem(item) {
      this.showingItem = Object.assign({}, item);
      this.detailDialog = true;
      console.log(this.showingItem);
    },
    deleteData(id) {
      if (confirm("このデータを削除しますか？")) {
        this.axios
          .delete("http://localhost:3000/weights/" + id, { data: { id: id } })
          .then((response) => {
            this.deleteItemFromItems(this.items, id);
            this.isDeleteDone = true;
          })
          .catch((errors) => {
            this.isError = true;
          });
      }
    },
    deleteItemFromItems(array, id) {
      array.forEach((item, index) => {
        if (item.id === id) {
          array.splice(index, 1);
        }
      });
    },
  },
};
</script>
