<template>
  <div>
    <div id="test">
      <v-navigation-drawer
        app
        dark
        floating
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <router-link to="/signup" v-if="!signedIn">新規登録</router-link>
        <router-link to="/signin" v-if="!signedIn">ログイン</router-link>
        <a href="/" v-if="signedIn" @click="signOut">Sign out</a>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Header',
    data () {
      return {
        items: [
          {
            title: 'ホーム',
            icon: 'mdi-home',
            link: '/'
          },
          {
            title: '記録閲覧',
            icon: 'mdi-align-vertical-bottom',
            link: '/record'
          },
          {
            title: '記録する',
            icon: 'mdi-lead-pencil',
            link: '/create'
          },
          {
            title: 'ユーザー',
            icon: 'mdi-account',
            link: '/user'
          }
        ]
      }
    },
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
        this.$http.secured.delete(`/api/signin`)
          .then(response => {
            delete localStorage.csrf
            delete localStorage.signedIn
          })
          .catch(error => this.setError(error, 'Cannot sign out'))
      }
    }
  }
</script>
