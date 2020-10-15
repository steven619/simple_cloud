import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const login = {
  namespaced: true
}
const store = new Vuex.Store({
  state: {
    /**
     * 是否需要强制登录
     */
    forcedLogin: false,
    hasLogin: false,
    userName: ""
  },
  mutations: {
    login(state:any, userName:string) {
      state.userName = userName || '新用户';
      state.hasLogin = true;
    },
    logout(state:any) {
      state.userName = "";
      state.hasLogin = false;
    }
  },
  modules: {
    login : login
  }
})

export default store
