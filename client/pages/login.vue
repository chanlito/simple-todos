<template>
  <v-container>
    <v-layout>
      <v-flex xs12
              sm8
              offset-sm2
              md6
              offset-md3>
        <v-alert :type="alertType"
                 :value="alert"
                 dismissible
                 transition="scale-transition">
          {{ alertMessage }}
        </v-alert>
        <v-card>
          <v-card-text>
            <h1 class="display-1">Log In</h1>
            <v-divider />
            <br>
            <form @submit.prevent="handleSubmit"
                  novalidate>
              <v-text-field required
                            label="Email"
                            name="email"
                            v-model="email"
                            v-validate="'required'"
                            :error-messages="errors.collect('email')" />
              <v-text-field required
                            label="Password"
                            name="password"
                            v-model="password"
                            v-validate="'required'"
                            :error-messages="errors.collect('password')" />
              <v-btn color="primary"
                     type="submit">Log In</v-btn>
              <v-btn outline
                     type="reset">Forgot Password?</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';
import Component from 'nuxt-class-component';

@Component
export default class Login extends Vue {
  alert = false;
  alertMessage = '';
  alertType = 'error';
  email = '';
  password = '';

  async handleSubmit() {
    this.resetAlert();
    await this.validateSubmit();
    console.log('Logging In...');
  }

  async validateSubmit() {
    try {
      const pass = await this.$validator.validateAll();
      if (!pass) throw new Error('Form Validation Failed');
    } catch (e) {
      throw e.message;
    }
  }

  showAlert(message, type = 'error') {
    this.alert = true;
    this.alertMessage = message;
    this.alertType = type;
  }

  resetAlert() {
    this.alert = false;
    this.alertMessage = '';
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.$validator.reset();
  }
}
</script>
