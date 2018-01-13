<template>
  <v-app id="default-layout">
    <v-navigation-drawer app
                         fixed
                         dark
                         v-model="drawer">
      <TheSidenav />
    </v-navigation-drawer>
    <v-toolbar app
               color="primary">
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
import Component, { Getter, Vue } from 'nuxtjs-extensions';

import TheSidenav from '../components/TheSidenav.vue';

@Component({
  components: { TheSidenav },
  notifications: {
    notifyNewTodo: {
      type: 'info',
      title: 'New Todo',
      timeout: 20000
    }
  },
  sockets: {
    connect() {
      console.log('Connected!');
    },
    disconnect() {
      console.log('Disconnected!');
    },
    error(e: Error) {
      console.error('SocketIO Error:', e);
    },
    reconnecting() {
      console.log('Reconnecting!');
    },
    todoCreated(payload) {
      console.log('New Todo:', payload);
      this.notifyNewTodo({ icon: 'far fa-check-circle', message: `Created by ${payload.createdBy}` });
    }
  }
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
