import { ActionTree } from 'vuex';

import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  SET_AUTH_USER
} from '../utils/mutation-types';
import { RootState, State } from './';

export const state = () => ({
  loading: false,
  authUser: null,
  error: null
});

export const getters = {
  isLoggedIn(state) {
    return !!state.authUser;
  }
};

export const mutations = {
  [LOGIN](state) {
    state.loading = true;
    state.error = null;
  },
  [LOGIN_SUCCESS](state, payload) {
    state.loading = false;
    state.authUser = payload;
    state.error = null;
  },
  [LOGIN_FAILED](state, error) {
    state.loading = false;
    state.error = error;
  },
  [REGISTER](state) {
    state.loading = true;
    state.error = null;
  },
  [REGISTER_SUCCESS](state) {
    state.loading = false;
    state.error = null;
  },
  [REGISTER_FAILED](state, error) {
    state.loading = false;
    state.error = error;
  },
  [SET_AUTH_USER](state, authUser) {
    state.authUser = authUser;
  }
};

export const actions: ActionTree<State, RootState> = {
  async login({ commit }, payload: LoginPayload) {
    try {
      commit(LOGIN);
      const authUser = await this.$axios.$post('/auth/login', payload);
      commit(LOGIN_SUCCESS, authUser);
    } catch (e) {
      commit(LOGIN_FAILED, e.message);
      throw e;
    }
  },
  async register({ commit }, payload: RegisterPayload) {
    try {
      commit(REGISTER);
      await this.$axios.$post('/auth/register', payload);
      commit(REGISTER_SUCCESS);
    } catch (e) {
      commit(REGISTER_FAILED, e.message);
      throw e;
    }
  }
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}
