import { ActionTree, GetterTree, MutationTree } from 'vuex';

import { RootState } from '../types/store';
import { FetchTodosPayload, FetchTodosResponse, TodoState, TodoViewModel } from '../types/store/todo';
import { FETCH_TODOS, FETCH_TODOS_FAILED, FETCH_TODOS_SUCCESS } from '../utils/mutation-types';

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
  todos(state): TodoViewModel[] {
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
