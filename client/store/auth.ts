import { NuxtApp } from 'nuxt';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

import { RootState } from '../types/store';
import { AuthState, SignInPayload, SignUpPayload } from '../types/store/auth';
import {
  SIGN_IN,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_FAILED,
  SIGN_OUT_SUCCESS,
  SIGN_UP,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS
} from '../utils/mutation-types';

export const state = (): AuthState => ({
  loading: false,
  authUser: null,
  error: null
});

export const getters: GetterTree<AuthState, RootState> = {
  isSignedIn: state => !!state.authUser,
  firstName: state => (state.authUser ? state.authUser.profile.firstName : null),
  lastName: state => (state.authUser ? state.authUser.profile.lastName : null),
  accessToken: state => (state.authUser ? state.authUser.accessToken : null)
};

export const mutations: MutationTree<AuthState> = {
  [SIGN_IN](state) {
    state.loading = true;
    state.error = null;
  },
  [SIGN_IN_SUCCESS](state, payload) {
    state.loading = false;
    state.authUser = payload;
    state.error = null;
  },
  [SIGN_IN_FAILED](state, error) {
    state.loading = false;
    state.error = error;
  },
  [SIGN_OUT](state) {
    state.loading = true;
    state.error = null;
  },
  [SIGN_OUT_SUCCESS](state) {
    state.loading = false;
    state.authUser = null;
    state.error = null;
  },
  [SIGN_OUT_FAILED](state, error) {
    state.loading = false;
    state.error = error;
  },
  [SIGN_UP](state) {
    state.loading = true;
    state.error = null;
  },
  [SIGN_UP_SUCCESS](state) {
    state.loading = false;
    state.error = null;
  },
  [SIGN_UP_FAILED](state, error) {
    state.loading = false;
    state.error = error;
  }
};

export const actions: ActionTree<AuthState, RootState> = {
  async signIn(this: NuxtApp, { commit }, payload: SignInPayload) {
    try {
      commit(SIGN_IN);
      const authUser = await this.$axios.$post('/auth/sign-in', payload);
      commit(SIGN_IN_SUCCESS, authUser);
    } catch (e) {
      commit(SIGN_IN_FAILED, e.message);
      throw e;
    }
  },
  async signOut(this: NuxtApp, { commit }) {
    try {
      commit(SIGN_OUT);
      await this.$axios.$post('/auth/sign-out');
      commit(SIGN_OUT_SUCCESS);
    } catch (e) {
      commit(SIGN_OUT_FAILED, e.message);
      throw e;
    }
  },
  async signUp(this: NuxtApp, { commit }, payload: SignUpPayload) {
    try {
      commit(SIGN_UP);
      await this.$axios.$post('/auth/sign-up', payload);
      commit(SIGN_UP_SUCCESS);
    } catch (e) {
      commit(SIGN_UP_FAILED, e.message);
      throw e;
    }
  }
};
