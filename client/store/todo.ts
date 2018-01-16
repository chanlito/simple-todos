import { AxiosError } from 'axios';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

import { FETCH_TODOS, FETCH_TODOS_FAILED, FETCH_TODOS_SUCCESS } from '../utils/mutation-types';
import { RootState } from './';

export const state = (): TodoState => ({
  loading: false,
  error: null,
  data: [],
  metadata: {
    limit: 0,
    offset: 0,
    total: 0
  }
});

export const getters: GetterTree<TodoState, RootState> = {
  todos(state) {
    return state.data.map(i => ({
      id: i.id,
      title: i.title,
      isDone: i.isDone,
      isPublic: i.isPublic,
      createdBy: `${i.user.profile.firstName} ${i.user.profile.lastName}`
    }));
  }
};

export const mutations: MutationTree<TodoState> = {
  [FETCH_TODOS](state) {
    state.loading = true;
    state.error = null;
  },
  [FETCH_TODOS_SUCCESS](state, payload: FetchTodosResponse) {
    state.loading = false;
    state.data = payload.data;
    state.metadata = payload.metadata;
    state.error = null;
  },
  [FETCH_TODOS_FAILED](state, error) {
    state.loading = false;
    state.error = error;
  }
};

export const actions: ActionTree<TodoState, RootState> = {
  async fetchTodos({ commit }, payload: FetchTodosPayload) {
    try {
      commit(FETCH_TODOS);
      const response: FetchTodosResponse = await (this.$axios as any).$get('/todos', payload);
      commit(FETCH_TODOS_SUCCESS, response);
    } catch (e) {
      commit(FETCH_TODOS_FAILED, e.message);
    }
  }
};

export interface TodoState {
  loading: boolean;
  error?: Error | AxiosError | null;
  data: Array<Todo & { user: User }>;
  metadata: ResponseMetadata;
}

export interface FetchTodosPayload {
  limit: number;
  offset: number;
}

export interface FetchTodosResponse {
  data: Array<Todo & { user: User & { profile: Profile } }>;
  metadata: ResponseMetadata;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  isPublic: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
  profile: Profile;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  createdDate: string;
  updatedDate: string;
}

export interface ResponseMetadata {
  limit: number;
  offset: number;
  total: number;
}
