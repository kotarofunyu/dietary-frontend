<template>
  <v-card id="form">
    <v-card-title>フォーム</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-date-picker
          v-model="date"
          label="記録日"
          :rules="[required]"
        ></v-date-picker>
        <v-text-field
          v-model.number="weight"
          label="入力必須で文字数制限のあるテキストフィールド"
          placeholder="体重の数値"
          type="number"
          :rules="[required]"
        >
        </v-text-field>
        <v-textarea
          v-model="comment"
          label="コメント"
          clearable
          filled
          shaped
          counter
        >
        </v-textarea>
        <p>
          {{ this.weight }}
        </p>
        <p v-show="notNumber">数値ではありません</p>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn test v-on:click="submit">送信する</v-btn>
          <span v-if="success">投稿しました!</span>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Form",
  props: {
    httpMethod: {
      type: String,
      default: "post",
      required: true,
    },
    addParams: {
      type: Number,
      default: "",
      required: false,
    },
    dateData: {
      type: String,
      default: "",
      required: false,
    },
    weightData: {
      type: Number,
      default: null,
      reqiured: false,
    },
    commentData: {
      type: String,
      default: "",
      required: false,
    },
  },
  data() {
    return {
      date: this.$props.dateData,
      weight: this.$props.weightData,
      comment: this.$props.commentData,
      success: false,
      required: function (value) {
        if (this.success === true) {
          return;
        }
        return !!value || "必ず入力してください";
      }.bind(this),
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios({
          method: this.$props.httpMethod,
          url: "http://localhost:3000/weights/" + this.$props.addParams,
          params: {
            date: this.date,
            weight: parseFloat(this.weight),
            comment: this.comment,
          },
        })
          .then(
            function (response) {
              this.success = true;
              this.date = "";
              this.weight = null;
              this.comment = "";
              this.$router.push("/record");
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error);
              this.success = false;
            }.bind(this)
          );
      } else {
        this.success = false;
      }
    },
  },
  computed: {
    notNumber() {
      const value = Number(this.weight);
      return Number.isNaN(value);
    },
  },
};
</script>
