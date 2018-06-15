import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Article from '@/components/Article'
import ArtAdd from '@/components/ArtAdd'
import ArtEdit from '@/components/ArtEdit'
import ArtPreview from '@/components/ArtPreview'
import ArticlePy from '@/components/ArticlePy'

Vue.use(Router)

export default new Router({
	routes: [
	    {
			path: '/',
			name: 'Home',
			component: Home,
			// beforeEnter: (to, from, next) => {
			// 	console.log(to);
			// }
	    },{
	    	path: '/login',
	    	name: 'Login',
	    	component: Login
	    },{
	    	path: '/article/:id',
	    	name: 'Article',
	    	component: Article,
	    },{
	    	path: '/art-add',
	    	name: 'ArtAdd',
	    	component: ArtAdd,
	    },{
	    	path: '/art-edit/:id',
	    	name: 'ArtEdit',
	    	component: ArtEdit,
	    },{
	    	path: '/art-preview/:id',
	    	name: 'Article',
	    	component: ArtPreview,
	    },{
	    	path: '/article-py/:id',
	    	name: 'Article',
	    	component: ArticlePy
	    }
	]
})
