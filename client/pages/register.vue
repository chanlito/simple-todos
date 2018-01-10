<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
        <v-card>
          <v-container>
            <h1 class="display-1">Registration</h1>
            <v-divider></v-divider>
            <br>
            <form @submit.prevent="handleSubmit">
              <v-text-field required label="Email"></v-text-field>
              <v-text-field required label="Password"></v-text-field>
              <v-text-field required label="First Name"></v-text-field>
              <v-text-field label="Last Name"></v-text-field>
              <v-btn color="primary" type="submit">Submit</v-btn>
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
      console.log('Registering...');
    }
  }
};
</script>
