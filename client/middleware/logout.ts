import * as Cookie from 'js-cookie';

import { SET_AUTH_USER } from '../utils/mutation-types';

export default function({ store, redirect }) {
  store.commit(`auth/${SET_AUTH_USER}`, null);
  Cookie.remove('auth-user');
  redirect('/login');
}
