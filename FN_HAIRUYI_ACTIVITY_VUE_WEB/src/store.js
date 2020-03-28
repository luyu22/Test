import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    needAnimate:true
  },
  mutations: {
      needAnimate  (state,needAnimate) {
        state.needAnimate = needAnimate
      },
  },
  actions: {
      needAnimate  ({commit},needAnimate) {
        commit('needAnimate',needAnimate)
      },
  }
});