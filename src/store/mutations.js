export const mutationsMsg = (state, payload) => {
	state.msg = payload.msg;
}

export const CURRENTMENU_CHANGE = (state, payload) => {
	// console.log(payload);
	state.currentMenu = payload.menu;
}

export const SET_TOKEN = (state, payload) => {
	state.token = payload.token;
}

export const CHANGE_MENU = (state) => {
	if (state.menu == '0') {
		state.menu = 1;
		localStorage.setItem('menu', 1);
	} else {
		state.menu = 0;
		localStorage.setItem('menu', 0);
	}
}

export const GET_INFO = (state, payload) => {
	state.uid = payload.data.id;
	state.account = payload.data.account;
}

export const LOGOUT = (state) => {
	state.token = null;
	state.userInfo = {};
}

export const GET_ARTICLE = (state, payload) => {
	console.log(payload);
	state.article = payload.data.data;
	state.artTotalCount = payload.data.totalCount
}

export const EDIT_ARTICLE = (state, payload) => {
	var data = payload.payload;
	for (var i = 0; i < state.article.length; i++) {
		if (state.article[i].id == data.id) {
			state.article[i].tagname = data.tagname;
			state.article[i].title = data.title;
			state.article[i].author = data.author;
		}
	}
}

export const ADD_ARTICLE = (state, payload) => {
	var artList = state.article;
	var data = payload.payload;
	if (artList.length) {
		artList.pop();
		var newAdd = {
			id: data.id,
			title: data.title,
			author: data.author,
			create_time: data.create_time,
			tagname: data.tagname,
		}
		artList.unshift(newAdd);
		state.artTotalCount++;
	}
}