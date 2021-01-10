<template v-slot:append>
  <v-dialog
    id="formModal"
    v-model="dialog"
    persistent
    :retain-focus="false"
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-row align="center">
        <v-btn
          fixed
          bottom
          right
          fab
          small
          dark
          color="red"
          v-on="on"
          v-if="user"
          id="floatingBtn"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
      </v-row>
    </template>
    <v-card id="form">
      <v-row id="title">
        <v-card-title> フォーム </v-card-title>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="white" text @click.stop="dialog = false">
            <v-icon>mdi-close-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-row>

      <v-card-text>
        <v-form ref="form">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="obj.date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[required]"
              >
              </v-text-field>
            </template>
            <v-date-picker v-model="obj.date" @input="menu2 = false">
            </v-date-picker>
          </v-menu>
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
            <v-btn color="blue" large dark @click="submit"
              ><v-icon>mdi-check-outline</v-icon>記録する</v-btn
            >
            <span v-if="success">投稿しました!</span>
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
      menu2: false,
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
      const value = Number(this.obj.weight);
      return Number.isNaN(value);
    },
    user() {
      return this.$store.state.currentUser;
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
            this.$store.dispatch("getWeightsDatas");
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
<style>
#form {
  padding: 10px;
}
#title {
  background: rgb(3, 155, 229);
  color: white;
}
#floatingBtn {
  bottom: 35px;
  right: 35px;
}
</style>
