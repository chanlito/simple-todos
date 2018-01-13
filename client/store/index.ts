import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';

import { SIGN_IN_SUCCESS } from '../utils/mutation-types';
import { AuthState, AuthUser } from './auth';

export const state = (): State => ({
  appName: 'Simple Todos',
  ip: null
});

export const getters: GetterTree<State, RootState> = {
  appName: state => state.appName,
  ip: state => state.ip
};

export const mutations: MutationTree<State> = {
  SET_IP(state: RootState, payload) {
    state.ip = payload;
  }
};

export const actions: RootActionTree<State, RootState> = {
  async nuxtServerInit({ commit }, { app, req }) {
    const ip = await app.$axios.$get('http://icanhazip.com');
    commit('SET_IP', ip);
    const authUser: AuthUser = req.session.authUser;
    if (authUser) commit(`auth/${SIGN_IN_SUCCESS}`, authUser);
  }
};

export type RootState = State & ModulesState;

export interface State {
  appName: string;
  ip?: string;
}

export interface ModulesState {
  auth: AuthState;
}

export interface RootActionTree<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>, NuxtContext): Promise<void>;
}

export interface NuxtContext {
  app: any;
  req: any;
  res: any;
  store: any;
}
