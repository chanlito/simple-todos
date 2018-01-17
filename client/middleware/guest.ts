import { NuxtContext } from 'nuxt';

export default function({ store, redirect }: NuxtContext) {
  if (store.getters['auth/isLoggedIn']) {
    redirect('/');
  }
}
