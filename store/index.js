import Vue from 'vue';
import Vuex from 'vuex';

import {app, dashboard, fitnessNutrition} from './modules';

import * as getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app, dashboard, fitnessNutrition
  },
  mutations: {}
})

export default store
