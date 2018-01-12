<template>
  <div>
    <AppAuthForm title="Register"
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
    </AppAuthForm>
  </div>
</template>

<script lang="ts">
import Component, { Action, State, Vue, namespace } from '@vue/ts';

import AppAuthForm from '../components/AppAuthForm.vue';
import { RegisterPayload } from '../store/auth';
import { handleErrors, validate } from '../utils';

const AuthAction = namespace('auth', Action);
const AuthState = namespace('auth', State);

@Component({
  components: { AppAuthForm }
})
export default class Register extends Vue {
  alertMessage = '';
  email = '';
  password = '';
  firstName = '';
  lastName = '';

  @AuthState loading: boolean;
  @AuthAction register: (payload: RegisterPayload) => void;

  async handleSubmit() {
    this.alertMessage = '';
    await validate(this.$validator);
    try {
      await this.register({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });
      this.$router.push('/login');
    } catch (e) {
      this.alertMessage = handleErrors(this.$validator.errors, e);
    }
  }
}
</script>
