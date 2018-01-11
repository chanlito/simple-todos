<template>
  <v-app id="default-layout">
    <v-navigation-drawer app
                         fixed
                         v-model="drawer">
      <v-toolbar color="secondary"
                 dark
                 flat>
        <v-container>
          <v-layout>
            Your IP: {{ ip }}
          </v-layout>
        </v-container>
      </v-toolbar>

      <v-toolbar flat
                 class="transparent">
        <v-list class="pa-0" two-lines>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider />
      <v-list dense>
        <template v-for="{ icon, title, path, sub } in navLinks">
          <v-list-group v-if="sub && sub.length"
                        :key="title"
                        :prepend-icon="icon">

            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-for="{ icon, title, path } in sub"
                         style="padding-left: 20px;"
                         :key="title"
                         :to="path">
              <v-list-tile-action>
                <v-icon>{{ icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>

          <v-list-tile v-else
                       :key="title"
                       :to="path">
            <v-list-tile-action>
              <v-icon>{{ icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app
               color="primary"
               dark>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      drawer: false,
      allNavLinks: [
        { icon: 'fa-home', title: 'Home', path: '/', type: 'both' },
        { icon: 'fa-user-plus', title: 'Register', path: '/register', type: 'guest' },
        { icon: 'fa-sign-in-alt', title: 'Log In', path: '/login', type: 'guest' },
        {
          icon: 'fa-list',
          title: 'Todos',
          path: '/todos',
          type: 'auth',
          sub: [
            { icon: 'fa-save', title: 'Add Todos', path: '/todos/add', type: 'auth' },
            { icon: 'fa-trash', title: 'Remove Todos', path: '/todos/remove', type: 'auth' }
          ]
        },
        { icon: 'fa-sign-out-alt', title: 'Log Out', path: '/logout', type: 'auth' }
      ]
    };
  },
  computed: {
    ...mapState(['appTitle', 'ip']),
    ...mapGetters('auth', ['isLoggedIn']),
    navLinks() {
      return this.allNavLinks.filter(x => x.type === 'both' || x.type === (this.isLoggedIn ? 'auth' : 'guest'));
    }
  }
};
</script>

<style>
#default-layout {
  background-color: #d3d3d3;
}
</style>
