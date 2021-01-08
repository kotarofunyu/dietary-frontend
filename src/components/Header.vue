<template>
  <div>
    <div id="test">
      <v-app-bar app clipped-left dark color="#039BE5">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        color="#039BE5"
        permanent="permanent"
        dark
        app
      >
        <v-list>
          <v-list-item two-line class="px-0" v-if="user">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-for="item in items" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <p></p>
          <FormModal />
          <LoginModal />
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import LoginModal from "@/components/Login";
import { mapState } from "vuex";
import firebase from "@/plugins/firebase";
import FormModal from "./FormModal";
import plainAxios from "axios";
export default {
  name: "Header",
  components: {
    LoginModal,
    FormModal,
  },
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "記録閲覧",
          icon: "mdi-align-vertical-bottom",
          link: "/record",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
  },
  mounted: function () {
    this.checkSignedIn();
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkSignedIn() {
      firebase.auth().onAuthStateChanged(
        function (user) {
          if (user) {
            const refresh_token = user.refreshToken;
            console.log(`リフレッシュトークン: ${refresh_token}`);
            plainAxios
              .post(
                `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`,
                { grant_type: "refresh_token", refresh_token: refresh_token }
              )
              .then((res) => {
                console.log(`authToken: ${res.data.access_token}`);
                this.$store.commit("setAuthToken", res.data.access_token);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("有効期限が切れているか、ログインしていません。");
          }
        }.bind(this)
      );
    },
  },
};
</script>
