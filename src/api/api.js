import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';

export default {
	getUserInfo (token) {
		return axios({
	        method: 'post',
	        url: 'http://localhost:8088/test/Home/Admin/getInfo',
	        data:  qs.stringify({token: token}),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},

	getArticleList (params) {
		return axios({
	        method: 'post',
	        url: 'http://localhost:8088/test/Home/Article/getList',
	        data:  qs.stringify(params),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},

	delArticle (params) {
		return axios({
	        method: 'post',
	        url: 'http://localhost:8088/test/Home/Article/artDel',
	        data:  qs.stringify(params),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},

	getPyArticle (params) {
		return axios({
	        method: 'post',
	        url: 'http://localhost:8088/test/Home/Article/getPyArticle',
	        data:  qs.stringify(params),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},

	delPyArticle (params) {
		return axios({
	        method: 'post',
	        url: 'http://localhost:8088/test/Home/Article/delPyArticle',
	        data:  qs.stringify(params),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},
}