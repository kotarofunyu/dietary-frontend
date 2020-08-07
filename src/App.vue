<template>
  <v-app>
    <Header/>
    <!-- <v-main>
      <Home/>
    </v-main> -->
    <router-view/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Header from './components/Header';
import Home from './components/page1';

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
