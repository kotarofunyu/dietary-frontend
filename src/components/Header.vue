<template>
  <div>
    <div id="test">
      <v-app-bar app clipped-left dark color="#039BE5">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        color="#039BE5"
        :mini-variant="miniVariant"
        :permanent="permanent"
        dark
        app
      >
        <v-list>
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>User</v-list-item-title>
              <v-list-item-subtitle>kotaro</v-list-item-subtitle>
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
          <FormModal />
          <LoginModal />
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import LoginModal from "@/components/Login"
import { mapState } from "vuex";
import authCheck from "@/plugins/auth-check";
import firebase from "@/plugins/firebase";
import FormModal from './FormModal';
export default {
  name: "Header",
  components: {
    LoginModal,
    FormModal
  },
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "ホーム",
          icon: "mdi-home",
          link: "/",
        },
        {
          title: "記録閲覧",
          icon: "mdi-align-vertical-bottom",
          link: "/record",
        },
        {
          title: "記録する",
          icon: "mdi-lead-pencil",
          link: "/create",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
  },
  mounted: authCheck(),
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
  },
};
</script>
