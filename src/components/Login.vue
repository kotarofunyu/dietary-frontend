<template v-slot:append>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-row align="center">
        <v-btn
          color="primary"
          align="center"
          dark
          v-bind="attrs"
          @click="signOut"
          v-if="user"
          >ログアウト</v-btn
        >
        <v-btn
          color="primary"
          align="center"
          dark
          v-bind="attrs"
          v-on="on"
          v-else
          >ログイン</v-btn
        >
      </v-row>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">ログイン</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <input type="email" placeholder="メールアドレス" v-model="email" />
          <input type="password" placeholder="パスワード" v-model="password" />
        </v-container>
        <p>
          登録はまだですか？
          <router-link to="/signin">新規登録する</router-link>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="
            dialog = false;
            signIn();
          "
        >
          ログイン
        </v-btn>
        <v-btn color="grey" text @click="dialog = false"> 閉じる </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "@/plugins/firebase";
export default {
  name: "LoginModal",
  data() {
    return {
      dialog: false,
      email: "",
      password: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    signIn: async function () {
      await this.connectFirebase();
      await this.getIdToken();
      this.checkAuthToken();
    },
    connectFirebase: async function () {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password);
    },
    getIdToken: async function () {
      const token = await firebase.auth().currentUser.getIdToken(true);
      const data = { token };
      this.$store.commit("setAuthToken", data.token);
    },
    checkAuthToken: function () {
      this.axios
        .post("/auth", { user: { email: this.email } })
        .then((res) => {
          this.$store.commit("setUser", res.data);
          this.$store.dispatch("getWeightsDatas");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then((res) => {
          this.$store.commit("setUser", null);
          this.$store.commit("setAuthToken", "");
          this.$store.commit("setWeightsDatas", []);
          this.$router.push("/");
        })
        .catch((error) => {
          this.error = "ログアウトに失敗しました";
        });
    },
  },
};
</script>
