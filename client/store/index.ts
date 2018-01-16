import { GetterTree, MutationTree } from 'vuex';

import { AuthUser } from '../types/auth.types';
import { RootActionTree, RootState, State } from '../types/index.types';
import { SIGN_IN_SUCCESS } from '../utils/mutation-types';

export const state = (): State => ({
  appName: 'Simple Todos',
  ip: null
});

export const getters: GetterTree<State, RootState> = {
  appName: state => state.appName,
  ip: state => state.ip
};

export const mutations: MutationTree<State> = {
  SET_IP(state: State, payload) {
    state.ip = payload;
  }
};

export const actions: RootActionTree<State, RootState> = {
  async nuxtServerInit({ commit }, { app, req }) {
    try {
      const ip = await app.$axios.$get('http://icanhazip.com');
      commit('SET_IP', ip);
    } catch (e) {
      console.error('Could not get IP.', e.message);
    }
    const authUser: AuthUser = req.session.authUser;
    if (authUser) commit(`auth/${SIGN_IN_SUCCESS}`, authUser);
  }
};
