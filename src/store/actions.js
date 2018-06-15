import api from '../api/api'

export const changeMsg = ({commit}) => {
	commit({
	    type: 'mutationsMsg',     //对应mutation.js中的mutationsMsg方法
	    msg: '我是修改后的数据~~~'
	});
};


export const changeCurrentMenu = ({commit}, payload) => {
	console.log(payload);
	commit({
		type: 'CURRENTMENU_CHANGE',
		menu: payload
	})
}


export const changeMenuStatus = ({commit}) => {
	commit({
		type: 'CHANGE_MENU'
	});
};

export const getInfo = ({commit}, payload) => {
	var request = api.getUserInfo(payload.token);
	request.then(function(res){
	 	var resp = res.data;
	 	if (resp.status) {
	 		var data = resp.data
			commit({
				type: 'GET_INFO',
				data
			}) 		
	 	}
	})
	.catch(function(err){
	 	console.log(err)
	});
}

export const logou = ({commit}) => {
	commit({
		type: 'LOGOUT'
	})
}


export const getArticle = ({commit}, payload) => {
	console.log(payload);
	var request = api.getArticleList(payload).then(function(res){
	 	var resp = res.data;
	 	console.log(resp);
	 	if (resp.status) {
	 		var data = resp.data;
	 		commit({
	 			type: 'GET_ARTICLE',
	 			data
	 		})
	 	}
	}).catch(function(err){
	 	console.log(err)
	});
}

export const editArticle = ({commit}, payload) => {
	commit({
		type: 'EDIT_ARTICLE',
		payload
	})
}

export const addArticle = ({commit}, payload) => {
	commit({
		type: 'ADD_ARTICLE',
		payload
	})
}
