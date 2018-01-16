import { NuxtContext } from 'nuxt';

export default function({ store, redirect }: NuxtContext) {
  store.dispatch(`auth/signOut`);
  redirect('/sign-in');
}
