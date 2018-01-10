<template>
  <v-container class="ma-0">
    <v-layout>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch('todos/fetchTodos');
  }
};
</script>
