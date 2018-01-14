import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';

import { SIGN_IN_SUCCESS } from '../utils/mutation-types';
import { AuthState, AuthUser } from './auth';
import { TodoState } from './todo';

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

export type RootState = State & ModulesState;

export interface State {
  appName: string;
  ip?: string;
}

export interface ModulesState {
  auth: AuthState;
  todo: TodoState;
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
