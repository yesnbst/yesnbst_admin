$(function(){
		// 处理屏幕resize普通样式效果
	screenResize();
	$(window).on("resize", function(){
		screenResize();
	})

		// 导航栏事件
	$(".menu>li").on("click", function(){
		$(this).addClass("menu-open").siblings().removeClass("menu-open");
	})

		// 提示工具
	$('[data-toggle="tooltip"]').tooltip();

	$(".menu-control").on("click", function(){
		if (!$(".navbox").hasClass("navbox-hide")) {
			setCookie("menuStatus", "close", 3600*24);
			$(".navbox").addClass("navbox-hide");
			setTimeout(function(){
				$(".navbox").addClass('navbox-float');
				$(".main").parent().removeClass("col-md-10").addClass("col-md-12");
				$(".main").css("padding-left", "40px");
			}, 250);
		} else {
			setCookie("menuStatus", "open", 3600*24);
			$(".navbox").removeClass("navbox-hide");
			$(".navbox").removeClass('navbox-float');
			$(".main").parent().addClass("col-md-10").removeClass("col-md-12");
			$(".main").css("padding-left", "0");
		}
	})

	$(".edit-tabs li").on("click", function(){
		if (!$(this).hasClass("disabled")) {
			$(this).addClass("active").siblings().removeClass("active");
			$(".edit-box .edit-item").eq($(this).index()).addClass("edit-item-active").siblings().removeClass("edit-item-active");	
		}
	})


    	// Enter键事件
	document.onkeydown=function(){
		if (event.keyCode == 13){
			var activeElement = document.activeElement;
			if (activeElement.id == "sizeInput") {
				$("#addItemBtn").click();
			}
		}
	}
})


function checkItemExist(){
	var arr = [];
	$(".size-box .size-item").each(function(){
		arr.push($(this).find(".item-name").text());
	})
	return arr;
}

function screenResize(){
	if ($(window).width() >= 990) {
		$(".navbox").height($(window).height()-50);
		$(".navbox").css({
			"height" : ($(window).height()-50) + "px"
		})
	} else {
		$(".navbox").css({
			"height" : "auto",
			"margin-bottom" : "20px"
		});
	}
}

	//取得cookie
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';'); //把cookie分割成组
	for(var i=0;i < ca.length;i++) {
		var c = ca[i]; //取得字符串

		while (c.charAt(0)==' ') { //判断一下字符串有没有前导空格
			c = c.substring(1,c.length); //有的话，从第二位开始取
		}

		if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name
			return unescape(c.substring(nameEQ.length,c.length)); //解码并截取我们要值
		}
	}
	return false;
}

	//清除cookie
function clearCookie(name) {
	setCookie(name, "", -1);
}

	//设置cookie
function setCookie(name, value, seconds) {
	seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
	var expires = "";
	if (seconds != 0 ) { //设置cookie生存时间
		var date = new Date();
		date.setTime(date.getTime()+(seconds*1000));
		expires = "; expires="+date.toGMTString();
	}
	document.cookie = name+"="+escape(value)+expires+"; path=/"; //转码并赋值
}