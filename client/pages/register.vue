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
            <h1 class="display-1">Registration</h1>
            <v-divider />
            <br>
            <form @submit.prevent="handleSubmit"
                  novalidate>
              <v-text-field required
                            label="Email"
                            name="email"
                            v-model="email"
                            v-validate="'required|email'"
                            :error-messages="errors.collect('email')" />
              <v-text-field required
                            label="Password"
                            name="password"
                            v-model="password"
                            v-validate="'required|min:6'"
                            :error-messages="errors.collect('password')" />
              <v-text-field required
                            label="First Name"
                            name="firstName"
                            v-model="firstName"
                            v-validate="'required|alpha_spaces'"
                            :error-messages="errors.collect('firstName')" />
              <v-text-field label="Last Name"
                            name="lastName"
                            v-model="lastName"
                            v-validate="'alpha_spaces'"
                            :error-messages="errors.collect('lastName')" />
              <v-btn color="primary"
                     :loading="loading"
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
import Component, { Action, State, namespace } from 'nuxt-class-component';

const AuthModuleAction = namespace('auth', Action);
const AuthModuleState = namespace('auth', State);

@Component
export default class Register extends Vue {
  alert = false;
  alertMessage = '';
  alertType = 'error';
  email = '';
  password = '';
  firstName = '';
  lastName = '';

  @AuthModuleAction register;
  @AuthModuleState loading;

  async handleSubmit() {
    this.resetAlert();
    await this.validateSubmit();
    try {
      await this.register({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });
      this.showAlert('Thank you for registering!', 'success');
      this.resetForm();
    } catch (e) {
      if (!e.response) {
        this.showAlert(e.message);
        throw e;
      }

      const { status, data } = e.response;
      const { message, errors } = data;
      if (status === 422) {
        errors.forEach(e => this.errors.add(e.field, e.message));
      } else {
        this.alert = true;
        this.alertMessage = message;
      }
    }
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
    this.firstName = '';
    this.lastName = '';
    this.$validator.reset();
  }
}
</script>
