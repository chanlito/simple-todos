<template>
  <v-app id="default-layout">
    <v-navigation-drawer app
                         fixed
                         v-model="drawer">
      <TheSideNav />
    </v-navigation-drawer>
    <v-toolbar app
               color="primary"
               dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ appName }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Component, { Getter, Vue } from '@vue/ts';

import TheSideNav from '../components/TheSideNav.vue';

@Component({
  components: { TheSideNav }
})
export default class DefaultLayout extends Vue {
  drawer: boolean = false;
  @Getter appName: string;
}
</script>

<style>
#default-layout {
  background-color: #d3d3d3;
}
</style>
