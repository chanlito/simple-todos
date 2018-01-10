<template>
  <v-app id="default-layout">
    <v-navigation-drawer app fixed v-model="drawer">
      <v-toolbar flat>
        <v-container>
          <v-layout>
            Your IP: {{ ip }}
          </v-layout>
        </v-container>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense>
          <v-list-tile v-for="{ icon, title, path } in navLinks" :key="title" :to="path">
            <v-list-tile-action>
              <v-icon>{{ icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['appTitle', 'ip'])
  },
  data() {
    return {
      drawer: false,
      navLinks: [
        { icon: 'fa-home', title: 'Home', path: '/' },
        { icon: 'fa-list', title: 'Todos', path: '/todos' },
        { icon: 'fa-user-plus', title: 'Register', path: '/register' },
        { icon: 'fa-sign-in-alt', title: 'Log In', path: '/login' },
        { icon: 'fa-sign-out-alt', title: 'Log Out', path: '/logout' }
      ]
    };
  }
};
</script>

<style>
#default-layout {
  background-color: #d3d3d3;
}
</style>
