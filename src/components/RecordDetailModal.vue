<template v-slot:append>
<v-dialog
  v-model="show"
  persistent
  :retain-focus="false"
  max-width="600px"
>
  <div>
    <p>{{ this.$props.id }}</p>
    <p>{{ this.$props.date }}</p>
    <p>{{ this.$props.weight }}</p>
    <p>{{ this.$props.comment }}</p>
  </div>
  <p @click.stop="show=false">閉じる</p>
</v-dialog>

</template>

<script>
export default {
  name: "RecordDetailModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: false
    },
    id: {
      type: Number,
      default: null,
      required: false
    },
    date: {
      type: String,
      default: '',
      required: false
    },
    weight: {
      type: Number,
      default: null,
      reqiured: false
    },
    comment: {
      type: String,
      default: '',
      required: false
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
      }
    }
};
</script>
