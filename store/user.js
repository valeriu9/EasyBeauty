export const state = {
  name: ''
};

export const actions = {
  userLoggedIn ({ commit }, userData) {
    try {
      commit('SET_USER_DATA', userData);
    } catch (e) { console.error('Failed to initialize user cookie', e); }
  },
  userLoggedOut ({ commit }) {
    try {
      commit('REMOVE_USER_DATA');
    } catch (e) { }
  }
};

export const mutations = {
  SET_USER_DATA (state, userData) {
    state.name = userData.name;
  },
  REMOVE_USER_DATA (state) {
    state.name = '';
  }
};

