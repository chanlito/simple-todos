<template>
  <v-container>
    <v-layout>
      <v-flex xs12
              sm8
              offset-sm2
              md6
              offset-md3>
        <v-alert type="error"
                 :value="!!alertMessage"
                 dismissible
                 transition="scale-transition">{{ alertMessage }}</v-alert>
        <v-card>
          <v-card-text>
            <h1 class="display-1">{{ title }}</h1>
            <v-divider />
            <br>
            <slot />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script lang="ts">
import Component, { Prop, Vue } from 'nuxtjs-extensions';

@Component
export default class AuthForm extends Vue {
  @Prop(String) title: string;
  @Prop(String) alertMessage: string;
}
</script>
