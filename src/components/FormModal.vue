<template v-slot:append>
  <v-dialog v-model="show" persistent :retain-focus="false" max-width="600px">
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
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn color="grey" text @click.stop="show = false"> 閉じる </v-btn>
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
      required: false
    },
    httpMethod: {
      type: String,
      default: 'post',
      required: false
    },
    addParams: {
      type: Number,
      default: null,
      required: false
    },
    idData: {
      type: Number,
      default: null,
      required: false
    },
    dateData: {
      type: String,
      default: '',
      required: false
    },
    weightData: {
      type: Number,
      default: null,
      reqiured: false
    },
    commentData: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      id: this.$props.idData,
      date: this.$props.dateData,
      weight: this.$props.weightData,
      comment: this.$props.commentData,
      success: false,
      required: function(value) {
        if (this.success === true) { return }
        return !!value || "必ず入力してください"
      }.bind(this)
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.axios({
          method: this.$props.httpMethod,
          url: 'http://localhost:3000/weights/' + this.id,
          params: {
            date: this.date,
            weight: parseFloat(this.weight),
            comment: this.comment
          }
        })
        .then(function (response) {
          console.log(response.statusText)
          this.success = true
          this.date = ''
          this.weight = null
          this.comment = ''
          this.$emit('close')
        }.bind(this))
        .catch(function (error) {
          this.success = false
        }.bind(this))
      } else {
        this.success = false
      }
    }
  },
  computed: {
      show: {
        get () {
          return this.visible
        },
        set (value) {
          if (!value) {
            this.$emit('close')
          }
        }
      },
      notNumber() {
        const value = Number(this.weight);
        return Number.isNaN(value);
      }
    }
};
</script>
