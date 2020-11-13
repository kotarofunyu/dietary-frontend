<template>
  <div class="signin">
    <h2>Sign up</h2>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">ログイン</button>
    <p>登録はまだですか？
      <router-link to="/signin">新規登録する</router-link>
    </p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import axios from '@/plugins/axios'
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: '',
      user: null,
      error: ''
    }
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          
          this.$router.push("/")
        }, err => {
          this.error = "メールアドレスかパスワードに誤りがあります。"
        });
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signin {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
