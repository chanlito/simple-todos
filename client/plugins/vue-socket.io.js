import * as io from 'socket.io-client';
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';

Vue.use(
  VueSocketio,
  io({
    transports: ['websocket']
  })
);

Vue.use(
  VueSocketio,
  io('localhost:4200/auth', {
    transports: ['websocket']
  })
);
