<template>
  <div class="home">
    <p>ホームですよ！！</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Form from '../components/Form'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Form
  }
}
</script>
