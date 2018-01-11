import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILED } from '~/utils/mutation-types';

export const state = () => ({
  loading: false,
  authUser: null,
  error: null
});

export const mutations = {
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

export const actions = {
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
