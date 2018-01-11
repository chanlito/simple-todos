import { TOGGLE_SIDENAV } from '~/utils/mutation-types';

export const state = () => ({
  isSidenavOpened: false
});

export const mutation = {
  [TOGGLE_SIDENAV](state) {
    state.isSidenavOpened = !state.isSidenavOpened;
  }
};

export const actions = {
  toggleSidenav({ commit }) {
    commit(TOGGLE_SIDENAV);
  }
};
