export default function({ store, redirect, req }) {
  store.dispatch(`auth/logout`);
  redirect('/login');
}
