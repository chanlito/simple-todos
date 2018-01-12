import { ActionContext, ActionTree, GetterTree } from 'vuex';

import { AuthUser } from './auth';

import { LOGIN_SUCCESS } from '../utils/mutation-types';

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
    commit('SET_IP', ip);
    const authUser: AuthUser = req.session.authUser;
    if (authUser) commit(`auth/${LOGIN_SUCCESS}`, authUser);
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
