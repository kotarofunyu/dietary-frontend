<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/page1">Page1</router-link>
      <router-link to="/page2">Page2</router-link>
      <router-link to="/page3">Page3</router-link>
      <router-link to="/signIn" v-if="!signedIn">ログイン</router-link>
      <router-link to="mypage" v-if="signedIn">マイページ</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Header',
    computed: mapState([
      'signedIn'
    ]),
    mounted: function() {
      this.$store.dispatch('doFetchSignedIn')
    },
    methods: {
      setError(error, text) {
        this.error = (error.response && error.response.data && error.response.data.error) || text
      },
      signOut() {
        this.$http.secured.delete(`/signin`)
          .then(response => {
            delete localStorage.csrf
            delete localStorage.signedIn
          })
          .catch(error => this.setError(error, 'Cannot sign out'))
      }
    }
  }
</script>
