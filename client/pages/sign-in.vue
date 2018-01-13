<template>
  <AppAuthForm title="Sign In">
    <form @submit.prevent="handleSubmit"
          novalidate>
      <v-text-field required
                    label="Email"
                    name="email"
                    v-model="email"
                    v-validate="'required'"
                    :error-messages="errors.collect('email')" />
      <v-text-field required
                    type="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    v-validate="'required'"
                    :error-messages="errors.collect('password')" />
      <v-btn color="primary"
             light
             :loading="loading"
             type="submit">Sign In</v-btn>
      <v-btn outline>Forgot Password?</v-btn>
    </form>
  </AppAuthForm>
</template>

<script lang="ts">
import Component, { Action, State, Vue, namespace } from 'nuxtjs-extensions';

import AppAuthForm from '../components/AppAuthForm.vue';
import { SignInPayload } from '../store/auth';
import { handleErrors, validate } from '../utils';

const AuthAction = namespace('auth', Action);
const AuthState = namespace('auth', State);

@Component({
  components: { AppAuthForm },
  middleware: ['guest'],
  notifications: {
    displaySignInError: {
      icon: 'fas fa-exclamation-triangle',
      position: 'bottomCenter',
      title: 'Sign In Failed',
      toastOnce: true,
      type: 'error'
    }
  }
})
export default class SignInPage extends Vue {
  email: string = '';
  password: string = '';
  displaySignInError: ({ message: string }) => void;

  @AuthState loading: boolean;
  @AuthAction signIn: (payload: SignInPayload) => void;

  async handleSubmit() {
    await validate(this.$validator);
    try {
      await this.signIn({
        email: this.email,
        password: this.password
      });
      this.$router.push('/');
    } catch (e) {
      const message = handleErrors(this.$validator.errors, e);
      this.displaySignInError({ message });
    }
  }
}
</script>
