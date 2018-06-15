import Vue from 'vue'
import Vuex from 'vuex'
import state from './rootState'
import * as mutations from './mutations';
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})


// export default new Vuex.Store({
// 	actions,
// 	getters,
// 	modules: {
// 		test,
// 	},
// 	strict: debug,
// })