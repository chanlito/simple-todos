import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SET_AUTH_USER
} from '~/utils/mutation-types';

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

export const actions = {
  async login({ commit }, payload) {
    const { email, password } = payload;
    try {
      commit(LOGIN);
      const authUser = await this.$axios.$post('/auth/login', { email, password });
      window.localStorage.setItem('auth-user', JSON.stringify(authUser));
      commit(LOGIN_SUCCESS, authUser);
    } catch (e) {
      commit(LOGIN_FAILED, e.message);
      throw e;
    }
  },
  async register({ commit }, payload) {
    const { email, password, firstName, lastName } = payload;
    try {
      commit(REGISTER);
      await this.$axios.$post('/auth/register', { email, password, firstName, lastName });
      commit(REGISTER_SUCCESS);
    } catch (e) {
      commit(REGISTER_FAILED, e.message);
      throw e;
    }
  }
};
