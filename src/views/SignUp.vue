<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="text" placeholder="Name" v-model="name" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="signUp">Register</button>
    <p>
      Do you have an account?
      <router-link to="/signin">sign in now!!~~</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
import axios from "@/plugins/axios";
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      user: null,
      uid: null,
    };
  },
  created: function () {
    if (this.$store.state.currentUser) {
      this.$router.push("/");
    }
  },
  methods: {
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          this.uid = res.user.uid;
          this.email = res.user.email;
          this.getIdToken();
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    getIdToken: async function () {
      const token = await firebase.auth().currentUser.getIdToken(true);
      const data = { token };
      const params = {};
      this.axios
        .post(
          "/auth",
          {
            user: {
              name: this.name,
              email: this.email,
              uid: this.uid,
              hoge: "hogehoge",
            },
          },
          { headers: { Authorization: data.token } }
        )
        .then((res) => {
          this.$store.commit("setUser", res.data);
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
h1,
h2 {
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
.signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
