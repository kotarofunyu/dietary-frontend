<template>
  <div class="record">
    ユーザー
    {{ user.name }}
  </div>
</template>

<script>
// import checkLoggedIn from '@/plugins/check-logged-in'
export default {
  name: 'User',
  computed: {
    user() {
      return this.$store.state.currentUser
    }
  },
  mounted: function() {
    console.log(this.$store.state)
  }
  // mounted: this.checkLoggedIn()
}
</script>
