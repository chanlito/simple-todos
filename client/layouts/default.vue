<template>
  <v-app id="default-layout">
    <v-navigation-drawer app
                         fixed
                         v-model="drawer">
      <TheSidenav />
    </v-navigation-drawer>
    <v-toolbar app
               color="primary"
               dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Component, { Getter, State, Vue, namespace } from 'vue-class';

import { TheSidenav } from '~/components';

const AuthGetter = namespace('auth', Getter);

@Component({
  components: { TheSidenav }
})
export default class DefaultLayout extends Vue {
  @AuthGetter isLoggedIn;
  @State appTitle;
  @State ip;

  drawer = false;
}
</script>

<style>
#default-layout {
  background-color: #d3d3d3;
}
</style>
