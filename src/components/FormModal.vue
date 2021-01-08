<template v-slot:append>
  <v-dialog v-model="dialog" persistent :retain-focus="false" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-row align="center">
        <v-btn absolute bottom right fab small dark color="red" v-on="on"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
      </v-row>
    </template>
    <v-card id="form">
      <v-card-title>フォーム</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-date-picker
            v-model="obj.date"
            label="記録日"
            :rules="[required]"
          ></v-date-picker>
          <v-text-field
            v-model.number="obj.weight"
            label="入力必須で文字数制限のあるテキストフィールド"
            placeholder="体重の数値"
            type="number"
            :rules="[required]"
          >
          </v-text-field>
          <v-textarea
            v-model="obj.comment"
            label="コメント"
            clearable
            filled
            shaped
            counter
          >
          </v-textarea>
          <p v-show="notNumber">数値ではありません</p>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn test @click="submit">送信する</v-btn>
            <span v-if="success">投稿しました!</span>
          </v-card-actions>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn color="grey" text @click.stop="dialog = false">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "@/plugins/firebase";
export default {
  name: "FormModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      dialog: false,
      success: false,
      obj: {
        date: "",
        weight: null,
        comment: "",
      },
      required: function (value) {
        if (this.success === true) {
          return;
        }
        return !!value || "必ず入力してください";
      }.bind(this),
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    notNumber() {
      const value = Number(this.weight);
      return Number.isNaN(value);
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.axios
          .post("/weights/", {
            weight: {
              date: this.obj.date,
              weight: parseFloat(this.obj.weight),
              comment: this.obj.comment,
            },
          })
          .then((response) => {
            this.obj = { date: "", weight: null, comment: "" };
            this.success = true;
            this.dialog = false;
          })
          .catch((error) => {
            this.success = false;
            console.log(error);
          });
      } else {
        this.success = false;
      }
    },
  },
};
</script>
