<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
        <v-card>
          <v-container>
            <h1 class="display-1">Log In</h1>
            <v-divider></v-divider>
            <br>
            <form @submit.prevent="handleSubmit">
              <v-text-field label="Email"></v-text-field>
              <v-text-field label="Password"></v-text-field>
              <v-btn color="primary" type="submit">Log In</v-btn>
              <v-btn outline>Forgot Password?</v-btn>
            </form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      console.log('Logging In...');
    }
  }
};
</script>
