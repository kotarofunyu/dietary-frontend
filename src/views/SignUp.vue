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
          alert("Create account!");
          const user = {
            uid: res.user.uid,
            email: this.email,
            name: this.name,
          };
          this.axios.post("/users", { user });
        })
        .catch((error) => {
          alert(error.message);
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
