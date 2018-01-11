import { SET_AUTH_USER } from '~/utils/mutation-types';

export const state = () => ({
  appTitle: 'Simple Todos',
  ip: null
});

export const mutations = {
  SET_IP(state, payload) {
    state.ip = payload;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { app, req }) {
    const ip = await app.$axios.$get('http://icanhazip.com');
    commit('SET_IP', ip.trim());

    if (req.headers.cookie && req.headers.cookie.indexOf('auth-user') !== -1) {
      const [, authUserUndecoded] = req.headers.cookie.split('=');
      const authUserDecoded = decodeURIComponent(authUserUndecoded);
      const authUser = JSON.parse(authUserDecoded);

      commit(`auth/${SET_AUTH_USER}`, authUser);
    }
  }
};
