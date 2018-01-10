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
  async nuxtServerInit({ commit }, { app }) {
    const ip = await app.$axios.$get('http://icanhazip.com');
    commit('SET_IP', ip.trim());
  }
};
