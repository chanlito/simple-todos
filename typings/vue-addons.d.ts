import { Validator } from 'vee-validate';
import Vue, { VueConstructor } from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $validator: Validator;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: string;
    /**
     * Middleware lets you define custom functions that can be run before rendering either a page or a group of pages.
     */
    middleware?: string[];
  }
}
