<template>
  <v-app id="default-layout">
    <TheSidenav />
    <v-toolbar app
               color="primary"
               dark>
      <v-toolbar-side-icon @click="toggleSidenav" />
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-content>
      {{ isSidenavOpened }}
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Component, { Action, Getter, State, Vue, namespace } from 'vue-class';

import { TheSidenav } from '~/components';

const AuthGetter = namespace('auth', Getter);
const UIAction = namespace('ui', Action);
const UIState = namespace('ui', State);

@Component({
  components: { TheSidenav }
})
export default class DefaultLayout extends Vue {
  @State appTitle;
  @State ip;
  @AuthGetter isLoggedIn;
  @UIAction toggleSidenav;
  @UIState isSidenavOpened;
}
</script>

<style>
#default-layout {
  background-color: #d3d3d3;
}
</style>
