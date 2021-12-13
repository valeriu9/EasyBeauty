export const state = () => ({
  email: '',
  name: '',
  id: 0,
  token: '',
  role: ''
});

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
    state.email = userData.email;
    state.name = userData.name;
    state.id = userData.id;
    state.token = userData.token
    state.role = userData.role;
  },
  REMOVE_USER_DATA (state) {
    state.email = '';
    state.name = '';
    state.id = 0;
    state.token = '';
    state.role = '';
  }
};

