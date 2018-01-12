import { ActionContext, ActionTree, GetterTree } from 'vuex';

import { SET_AUTH_USER } from '../utils/mutation-types';

export const state = (): RootState => ({
  appName: 'Simple Todos',
  ip: null
});

export const getters: GetterTree<State, RootState> = {
  appName: state => state.appName,
  ip: state => state.ip
};

export const mutations = {
  SET_IP(state: RootState, payload) {
    state.ip = payload;
  }
};

export const actions: RootActionTree<State, RootState> = {
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

export interface State {
  appName: string;
  ip?: string;
}

export type RootState = State;

export interface RootActionTree<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>, NuxtContext): Promise<void>;
}

export interface NuxtContext {
  app: any;
  req: any;
  res: any;
  store: any;
}
