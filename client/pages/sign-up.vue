<template>
  <div>
    <AppAuthForm title="Sign Up"
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
                      type="password"
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
               light
               :loading="loading"
               type="submit">Sign Up Now</v-btn>
      </form>
    </AppAuthForm>
  </div>
</template>

<script lang="ts">
import Component, { Action, State, Vue, namespace } from 'nuxtjs-extensions';

import AppAuthForm from '../components/AppAuthForm.vue';
import { SignUpPayload } from '../store/auth';
import { handleErrors, validate } from '../utils';

const AuthAction = namespace('auth', Action);
const AuthState = namespace('auth', State);

@Component({
  components: { AppAuthForm }
})
export default class SignUpPage extends Vue {
  alertMessage = '';
  email = '';
  password = '';
  firstName = '';
  lastName = '';

  @AuthState loading: boolean;
  @AuthAction signUp: (payload: SignUpPayload) => void;

  async handleSubmit() {
    this.alertMessage = '';
    await validate(this.$validator);
    try {
      await this.signUp({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });
      this.$router.push('/sign-in');
    } catch (e) {
      this.alertMessage = handleErrors(this.$validator.errors, e);
    }
  }
}
</script>
