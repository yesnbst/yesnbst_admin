$(".btn-user-address").on("click", function(){
	datas.id = $(this).attr("data-id");
	Ajax({
		url: path + "User/user_address",
		data: datas,
		successFunc: function(data){
			console.log(data);
			var content = userAddressTemp(data.data);
			new Dialog({
				id: "userAddressModal",
				size : 2,
				title : "收货地址列表",
				content: content,
			});			
		}
	})
})

$(".btn-user-info").on("click", function(){
	datas.id = $(this).attr("data-id");
	Ajax({
		url: path + "User/user_info",
		data: datas,
		successFunc: function(data){
			console.log(data);
			var content = userInfoTemp(data.data);
			new Dialog({
				id: "userInfoModal",
				size : 1,
				title : "会员信息",
				content: content,
			});			
		}
	})
})

function userInfoTemp(datas){
	var male, female;
	if (datas.sex == 1) {
		male = "checked";
		female = "";
	} else {
		male = "";
		female = "checked";
	}
	var yes, no;
	if (datas.status == 1) {
		yes = "";
		no = "checked";
	} else {
		yes = "checked";
		no = "";
	}

	var htmls = '<table class="table table-hover table-bordered text-center">'
		+'<tbody>'
		+'<tr><th>会员昵称</th><td><input type="text" id="nickname" class="form-control" value="'+ datas.nickname +'" placeholder="会员昵称"></td></tr>'
		+'<tr><th>用户积分</th><td class="text-left"><span class="info-txt">'+ datas.integral +'</span></td></tr>'
		+'<tr><th>邮箱地址</th><td><input type="text" id="email" class="form-control" value="'+ datas.email +'" placeholder="邮箱地址"></td></tr>'
		+'<tr><th>手机号码</th><td><input type="text" id="phone" class="form-control" value="'+ datas.phone +'" placeholder="手机号码"></td></tr>'
		+'<tr><th>性别</th><td class="text-left"><label class="radio-inline common-table-radio"><input type="radio" name="sex" value="1" '+ male +'> 男</label><label class="radio-inline common-table-radio"><input type="radio" name="sex" value="0" '+ female +'> 女</label></td></tr>'
		+'<tr><th>冻结用户</th><td class="text-left"><label class="radio-inline common-table-radio"><input type="radio" name="status" value="1" '+ no +'> 否</label><label class="radio-inline common-table-radio"><input type="radio" name="status" value="0" '+ yes +'> 是</label></td></tr>'
		+'</tbody>'
		+'</table>'
	return htmls;
}

	// 生成会员收货地址列表模板
function userAddressTemp(datas){
	var content = "";
	for (var i = 0; i < datas.length; i++) {
		content += "<tr>";
		content += '<td>'+ datas[i].receiver +'</td>';
		content += '<td>'+ datas[i].phone +'</td>';
		content += '<td>'+ datas[i].zipcode +'</td>';
		content += '<td>'+ datas[i].prov_name +' '+ datas[i].city_name +' '+ datas[i].dist_name +' '+ datas[i].address +'</td>';
		content += "</tr>";
	}

	var htmls = '<table class="table table-hover table-bordered text-center">'
		+'<thead>'
		+'<tr>'
		+'<th>收货人</th>'
		+'<th>联系方式</th>'
		+'<th>邮政编码</th>'
		+'<th>地址</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody>'+ content +'</tbody>'
		+'</table>'
	return htmls;
}