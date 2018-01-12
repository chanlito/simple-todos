<template>
  <v-container fluid>
    <v-jumbotron gradient="to top, #000a12, #263238, #000a12"
                 dark>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">{{ appName }}</h3>
            <span class="subheading">Web application powered by Nuxt.js 💚 & Nest Framework 😻</span>
            <v-divider class="my-3" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </v-container>
</template>

<script lang="ts">
import Component, { Getter, Vue } from 'vue-class';

@Component
export default class Index extends Vue {
  @Getter appName: string;
}
</script>
