import { Validator } from 'vee-validate';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $socket: SocketIOClient.Socket;
    $validator: Validator;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: string;
    middleware?: string[];
    notifications?: { [key: string]: { [key: string]: any } };
  }
}
