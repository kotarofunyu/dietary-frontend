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
            v-model="weight"
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
  export default {
    name: 'Form',
    data () {
      return {
        date: "",
        weight: "",
        comment: "",
        success: false,
        required: value => !!value || "必ず入力してください",
      }
    },
    methods: {
      submit () {
        this.success = true;
        if (this.$refs.form.validate()) {
          this.success = true;
        } else {
          this.success = false
        }
      }
    }
  }
</script>
