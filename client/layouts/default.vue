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
import Component, { Getter, Vue, Watch, namespace } from 'nuxtjs-extensions';
import * as io from 'socket.io-client';

import TheSidenav from '../components/TheSidenav.vue';

const AuthGetter = namespace('auth', Getter);

@Component({
  components: { TheSidenav },
  notifications: {
    displayNewTodo: {
      type: 'info',
      title: 'New Todo',
      timeout: 20000
    },
    displayConnected: {
      id: 'connected',
      icon: 'fas fa-wifi',
      type: 'success',
      title: 'Network',
      message: 'Connected.',
      timeout: 2000,
      toastOnce: true
    },
    displayReconnecting: {
      id: 'reconnecting',
      icon: 'fas fa-wifi',
      type: 'warn',
      title: 'Network',
      message: 'Reconnecting...',
      progressBar: true,
      toastOnce: true
    }
  }
})
export default class DefaultLayout extends Vue {
  socketHost: string = `localhost:${process.env.PORT}`;
  socket: SocketIOClient.Socket;
  socketAuth: SocketIOClient.Socket;
  drawer: boolean = false;
  @Getter appName: string;
  @AuthGetter accessToken: string;

  // notifications
  displayConnected: () => void;
  displayReconnecting: () => void;

  mounted() {
    // public connection
    this.createSocketConnection();
    // private connection
    if (this.accessToken) this.createSocketAuthConnection();
  }

  @Watch('accessToken')
  onAccessTokenChanged(newVal: string) {
    newVal ? this.createSocketAuthConnection() : this.socketAuth.disconnect();
  }

  createSocketConnection() {
    this.socket = io(`${this.socketHost}`, {
      reconnectionDelay: 5000,
      transports: ['websocket']
    });
    this.socket.on('connect', this.handleConnect);
    this.socket.on('reconnect', this.handleConnect);
    this.socket.on('reconnecting', this.handleReconnect);
  }

  createSocketAuthConnection() {
    this.socketAuth = io(`${this.socketHost}/auth`, {
      query: { accessToken: this.accessToken },
      reconnectionDelay: 5000,
      transports: ['websocket']
    });
    this.socketAuth.on('connect', this.handleConnect);
    this.socketAuth.on('reconnect', this.handleConnect);
    this.socketAuth.on('reconnecting', this.handleReconnect);
  }

  handleConnect() {
    this.displayConnected();
  }

  handleReconnect() {
    this.displayReconnecting();
  }
}
</script>

<style>
#default-layout {
  background-color: #d3d3d3;
}
</style>
