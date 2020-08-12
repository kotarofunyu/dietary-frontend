<template>
  <div class="create_record">
    記録する
    <Form httpMethod="post" />
  </div>
</template>

<script>
import Form from '../components/Form';
export default {
  name: 'CreateView',
  components: {
    Form
  }
}
</script>
