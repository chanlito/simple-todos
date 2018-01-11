<template>
  <div>

    <auth-form title="Register"
               :alert-message="alertMessage">
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
    </auth-form>
  </div>
</template>

<script>
import Vue from 'vue';
import AuthForm from '../components/auth-form.vue';
import { handleError, validateSubmit } from '~/utils';
import Component, { Action, State, namespace } from 'nuxt-class-component';

const AuthModuleAction = namespace('auth', Action);
const AuthModuleState = namespace('auth', State);

@Component({
  components: {
    'auth-form': AuthForm
  }
})
export default class Register extends Vue {
  alertMessage = '';
  email = '';
  password = '';
  firstName = '';
  lastName = '';

  @AuthModuleAction register;
  @AuthModuleState loading;

  async handleSubmit() {
    this.alertMessage = '';
    await validateSubmit(this.$validator);
    try {
      await this.register({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });
      this.$router.push('/login');
    } catch (e) {
      this.alertMessage = handleError(this.errors, e);
    }
  }
}
</script>
