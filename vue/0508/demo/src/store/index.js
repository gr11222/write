import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import permission from './modules/permission'
import getters from './getters'
Vue.use(Vuex)

 const store = new Vuex.Store({
    modules:{
        login,
        permission
    },
    getters
})
export default store