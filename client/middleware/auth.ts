import { NuxtContext } from 'nuxt';

export default function({ app, store, redirect }: NuxtContext) {
  if (!store.getters['auth/isLoggedIn']) {
    redirect('/login');
  }
}
