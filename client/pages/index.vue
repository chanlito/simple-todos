<template>
  <v-container fluid>
    <v-jumbotron color="grey lighten-2">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome to the {{ appTitle }}!</h3>
          <span class="subheading">Powered by Nuxt.js 💚 & Nest Framework 😻</span>
          <v-divider class="my-3"></v-divider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['appTitle'])
  }
};
</script>
