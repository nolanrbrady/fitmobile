import Vue from 'vue';
import Vuex from 'vuex';

import AppState from './modules/appState.js';

import * as getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
		AppState
  },
  mutations: {}
})

export default store
