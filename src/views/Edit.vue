<template>
  <div>
    編集だよ
    <p>{{ $route.params.id }}</p>
    <Form />
  </div>
</template>

<script>
import Form from '../components/Form'

export default {
  name: 'Edit',
  components: {
    Form,
  }
}
</script>
