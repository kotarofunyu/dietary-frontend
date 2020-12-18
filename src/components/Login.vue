<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" @click="signOut" v-if="user">ログアウト</v-btn>
        <v-btn color="primary" dark v-bind="attrs" v-on="on" v-else>ログイン</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">ログイン</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <input type="email" placeholder="メールアドレス" v-model="email" />
            <input
              type="password"
              placeholder="パスワード"
              v-model="password"
            />
          </v-container>
          <p>
            登録はまだですか？
            <router-link to="/signin">新規登録する</router-link>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false; signIn();">
            ログイン
          </v-btn>
          <v-btn color="grey" text @click="dialog = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from '@/plugins/firebase'
import axios from '@/plugins/axios'
export default {
  name: "LoginModal",
  data() {
    return {
      dialog: false,
      email: '',
      password: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        console.log(res)
        this.$router.push('/')
      }, err => {
        this.error = "ログインに失敗しました  "
      })
    },
    signOut: function() {
      firebase.auth().signOut()
      .then(res => {
        this.$store.commit("setUser", null)
      })
      .catch((error) => {
        this.error = "ログアウトに失敗しました"
      })
    }
  }
}
</script>
