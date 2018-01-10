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
            <h1 class="display-1">Registration</h1>
            <v-divider />
            <br>
            <form @submit.prevent="handleSubmit">
              <v-text-field required
                            label="Email" />
              <v-text-field required
                            label="Password" />
              <v-text-field required
                            label="First Name" />
              <v-text-field label="Last Name" />
              <v-btn color="primary"
                     type="submit">Submit</v-btn>
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
      console.log('Registering...');
    }
  }
});
</script>
