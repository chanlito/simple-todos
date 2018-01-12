<template>
  <AppAuthForm title="Login"
               :alert-message="alertMessage">
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
             :loading="loading"
             type="submit">Log In</v-btn>
      <v-btn outline>Forgot Password?</v-btn>
    </form>
  </AppAuthForm>
</template>

<script lang="ts">
import Component, { Action, State, Vue, namespace } from '@vue/ts';

import AppAuthForm from '../components/AppAuthForm.vue';
import { LoginPayload } from '../store/auth';
import { handleErrors, validate } from '../utils';

const AuthAction = namespace('auth', Action);
const AuthState = namespace('auth', State);

@Component({
  components: { AppAuthForm },
  middleware: ['guest']
})
export default class Login extends Vue {
  alertMessage = '';
  email = '';
  password = '';

  @AuthState loading: boolean;
  @AuthAction login: (payload: LoginPayload) => void;

  async handleSubmit() {
    this.alertMessage = '';
    await validate(this.$validator);
    try {
      await this.login({
        email: this.email,
        password: this.password
      });
      this.$router.push('/');
    } catch (e) {
      this.alertMessage = handleErrors(this.$validator.errors, e);
    }
  }
}
</script>
