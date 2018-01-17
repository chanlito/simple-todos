import { NuxtContext } from 'nuxt';
import { ActionContext, ActionTree } from 'vuex';

import { AuthState } from './auth';
import { TodoState } from './todo';

export type RootState = State & ModulesState;

export interface State {
  appName: string;
  ip?: string | null;
}

export interface ModulesState {
  auth: AuthState;
  todo: TodoState;
}

export interface RootActionTree<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>, NuxtContext: NuxtContext): Promise<void>;
}
