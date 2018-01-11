<template>
  <auth-form title="Login"
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
      <v-btn outline
             type="reset">Forgot Password?</v-btn>
    </form>
  </auth-form>

</template>

<script>
import Component, { Action, State, Vue, namespace } from 'vue-class';

import { AuthForm } from '~/components';
import { handleError, validateSubmit } from '~/utils';

const AuthModuleAction = namespace('auth', Action);
const AuthModuleState = namespace('auth', State);

@Component({
  components: { AuthForm },
  middleware: ['guest']
})
export default class Login extends Vue {
  alertMessage = '';
  email = '';
  password = '';

  @AuthModuleAction login;
  @AuthModuleState loading;

  async handleSubmit() {
    this.alertMessage = '';
    await validateSubmit(this.$validator);
    try {
      await this.login({ email: this.email, password: this.password });
      this.$router.push('/');
    } catch (e) {
      this.alertMessage = handleError(this.errors, e);
    }
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.$validator.reset();
  }
}
</script>
