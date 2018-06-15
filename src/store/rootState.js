let menuStatus = localStorage.getItem('menu');
if (menuStatus == null) {
	localStorage.setItem('menu', 1);
}

const state = {
  	menu: menuStatus,
	token: null,
	account: '',
	uid: '',
  	msg: '我是测试数据',
  	article: [],
  	artTotalCount: 0,
  	currentMenu: ''
}
export default state;