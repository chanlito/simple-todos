<template>
  <v-container class="ma-0">
    <v-layout>
      <AppTodoList />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Component, { Vue } from 'nuxtjs-extensions';

import AppTodoList from '../components/AppTodoList.vue';

@Component({
  components: { AppTodoList }
})
export default class Todos extends Vue {}
</script>
