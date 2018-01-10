<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="drawer">
      <v-toolbar flat>
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
      <v-toolbar-title>
        Simple Todos
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    navLinks: [
      { icon: 'fa-home', title: 'Home', path: '/' },
      { icon: 'fa-list', title: 'Todos', path: '/todos' },
      { icon: 'fa-sign-out-alt', title: 'Sign Out', path: '/sign-out' }
    ]
  })
};
</script>
