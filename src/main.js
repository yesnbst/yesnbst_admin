// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'; //引入store
// import VueResource from 'vue-resource'

import axios from 'axios'
Vue.prototype.$http = axios



	// 引入静态资源
import $ from 'jquery'
import './assets/js/bootstrap.min'  
import { getLocalToken } from './assets/js/unit'
import './assets/css/bootstrap.min.css'
import './assets/css/basic.css'




Vue.config.productionTip = false



// Vue.use(VueResource);
// Vue.http.options.emulateHTTP = true;
// Vue.http.options.emulateJSON = true;



router.beforeEach(function (to, from, next) {
	// console.log(to);
	store.commit({
		type: "CURRENTMENU_CHANGE",
		menu: to.name
	})


	var localToken = getLocalToken();
	if (store.getters.getToken) {
		var userInfo = store.getters.getAccount;
		if (!userInfo) {
			store.dispatch('getInfo', {
				token: localToken
			})
			next();
		} else {
			next();
		}	
	} else {
		if (localToken && localToken != 'null') {
			store.commit({
				type: 'SET_TOKEN',
				token: localToken
			})
			store.dispatch('getInfo', {
				token: localToken
			})
			next();
		} else {
			if (to.name == 'Login') {
				next();
			} else {
				next('login');
			}		
		}
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
