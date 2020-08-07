<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo">dietary</router-link>
        <ul id="nav-mobile" class="right">
          <li><router-link to="/record">record</router-link></li>
          <li><router-link to="/create">create record</router-link></li>
          <li><router-link to="/user">user</router-link></li>
          <li><router-link to="/signup" v-if="!signedIn">Sign up</router-link></li>
          <li><router-link to="/signin" v-if="!signedIn">Sign in</router-link></li>
          <li><a href="/" v-if="signedIn" @click="signOut">Sign out</a></li>
        </ul>
      </div>
    </nav>
    <div id="test">
      <v-navigation-drawer
        app
        dark
        expand-on-hover
        floating
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
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
          { title: '体重記録', icon: 'account' },
          { title: '記録する', icon: 'account_box' },
          { title: 'ユーザー', icon: 'account_box' }
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
