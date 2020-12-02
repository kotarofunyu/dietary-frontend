<template>
  <v-app>
    <Header/>
    <!-- <v-main>
      <Home/>
    </v-main> -->
    <v-main>
      <router-view/>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Header from './components/Header';
import Home from './components/page1';
import router from './router/index.js'
import store from './store'

export default {
  name: 'App',

  components: {
    HelloWorld,
    Header,
    Home
  },

  data: () => ({
    //
  }),
};
</script>
