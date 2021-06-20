import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    cartList: []
} 
const store = new Vuex.Store({
    state,
    actions,
    mutations
})

export default store