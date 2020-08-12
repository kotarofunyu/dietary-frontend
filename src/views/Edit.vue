<template>
  <div>
    編集
    <Form
      http-method="put"
      :comment-data="$route.params.comment"
      :weight-data="$route.params.weight"
      :date-data="$route.params.date"
      :add-params="$route.params.id"
    />
  </div>
</template>

<script>
import Form from '../components/Form'

export default {
  name: 'Edit',
  components: {
    Form,
  },
  data () {
    return {
      // comment: $route.params.comment
    }
  }
}
</script>
