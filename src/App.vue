<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import router from "./router/index.js";
import store from "./store";

export default {
  name: "App",

  components: {
    Header,
  },

  data: () => ({
    //
  }),
};
</script>
