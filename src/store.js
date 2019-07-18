import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function initialState() {
  return {
  };
}

export default new Vuex.Store({
  state : {
    ...initialState()
  },
  mutations : {
    resetState : (state) => {
      const s = initialState();
      Object.keys(s).forEach(key => state[key] = s[key]);
    },
  },
  actions : {
  }
})
