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
      <v-data-table :headers="headers" :items="items" :items-per-page="7">
        <template v-slot:item.action="{ item }">
          <v-btn
            fab
            small
            class="mx-1"
            color="indigo"
            outlined
            :to="{
              name: 'RecordDetail',
              params: {
                id: item.id,
                weight: item.weight,
                comment: item.comment,
                date: item.date,
              },
            }"
          >
            <v-icon>pageview</v-icon>
          </v-btn>
          <v-btn
            fab
            small
            color="indigo"
            outlined
            @click="dialog=true"
          >
          <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <p>{{ item }}</p>
          <FormModal
            :visible="dialog"
            httpMethod="put"
            :idData="item.id"
            :dateData="item.date"
            :weightData="item.weight"
            :commentData="item.comment"
            @close="dialog=false"
          />
          <v-btn
            fab
            small
            color="indigo"
            outlined
            class="mx-1"
            @click="deleteData(item.id)">
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
import FormModal from './FormModal'
export default {
  name: "RecordList",
  components: {
    FormModal
  },
  data() {
    return {
      dialog: false,
      isDeleteDone: false,
      isError: false,
      tabItems: ['全記録', '月別', '数値分析'],
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
