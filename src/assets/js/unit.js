function getLocalToken (){
	return localStorage.getItem('token');
}

function clearLocalToken(){
	localStorage.setItem('token', null);
}

function getLocalKey(name){
	return localStorage.getItem(name);
}

export { getLocalToken,clearLocalToken, getLocalKey }
