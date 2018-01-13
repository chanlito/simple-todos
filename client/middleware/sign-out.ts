export default function({ store, redirect }) {
  store.dispatch(`auth/signOut`);
  redirect('/sign-in');
}
