<template>
  <v-container>
    <v-layout>
      <v-flex xs12
              sm8
              offset-sm2
              md6
              offset-md3>
        <v-card>
          <v-card-text>
            <h1 class="display-1">Log In</h1>
            <v-divider />
            <br>
            <form @submit.prevent="handleSubmit">
              <v-text-field required
                            label="Email" />
              <v-text-field required
                            label="Password" />
              <v-btn color="primary"
                     type="submit">Log In</v-btn>
              <v-btn outline>Forgot Password?</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  methods: {
    handleSubmit() {
      console.log('Logging In...');
    }
  }
});
</script>
