import { FETCH_TODOS, FETCH_TODOS_FAILED, FETCH_TODOS_SUCCESS } from '../utils/mutation-types';

export const state = () => ({
  loading: false,
  todos: [],
  error: null
});

export const mutations = {
  [FETCH_TODOS](state) {
    state.loading = true;
    state.error = null;
  },
  [FETCH_TODOS_SUCCESS](state, todos) {
    state.loading = false;
    state.todos = todos;
    state.error = null;
  },
  [FETCH_TODOS_FAILED](state, error) {
    state.loading = false;
    state.todos = [];
    state.error = error;
  }
};

export const actions = {
  async fetchTodos({ commit }) {
    try {
      commit(FETCH_TODOS);
      const todos = await this.$axios.$get('/todos');
      commit(FETCH_TODOS_SUCCESS, todos);
    } catch (e) {
      commit(FETCH_TODOS_FAILED, e.message);
    }
  }
};
