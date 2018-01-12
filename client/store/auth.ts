import { ActionTree, GetterTree } from 'vuex';

import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  REGISTER,
  REGISTER_FAILED,
  REGISTER_SUCCESS
} from '../utils/mutation-types';
import { RootState, State } from './';

export const state = (): AuthState => ({
  loading: false,
  authUser: null,
  error: null
});

export const getters: GetterTree<AuthState, RootState> = {
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
  [LOGOUT](state) {
    state.loading = true;
    state.error = null;
  },
  [LOGOUT_SUCCESS](state) {
    state.loading = false;
    state.authUser = null;
    state.error = null;
  },
  [LOGOUT_FAILED](state, error) {
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
  async logout({ commit }) {
    try {
      commit(LOGOUT);
      await this.$axios.$post('/auth/logout');
      commit(LOGOUT_SUCCESS);
    } catch (e) {
      commit(LOGOUT_FAILED, e.message);
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

export interface AuthState {
  loading: boolean;
  authUser?: AuthUser;
  error?: any;
}

export interface AuthUser {
  id: number;
  email: string;
  createdDate: string;
  updatedDate: string;
  profile: Profile;
  role: Role;
  accessToken: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName?: string;
}

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
