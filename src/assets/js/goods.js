	// goods列表页 删除商品事件
$(".btn-goods-del").on("click", function(){
	var _t = $(this);
	new Dialog({
		id: "delGoodsModal",
		size : 0,
		title : "警告",
		btn: true,
		content: "确认删除该商品以及商品子分类？",
		handlerFunc: function(){
			datas = {};
			datas.id = _t.attr("data-id");
			Ajax({
				url: path + "Goods/goodsDelete",
				data: datas,
				successFunc: function(data){
					new Dialog({
						id: "warmModal",
						title: "提示",
						size: 0,
						content: data.info
					})
					if (data.status) {
						reload();
					}
				}
			})
		}
	});	
})

	// goods列表页 查看商品弹窗事件
$(".btn-goods-view").on("click", function(){
	datas.p_id = $(this).attr("data-id");
	Ajax({
		url: path + "Goods/goodsList",
		data: datas,
		successFunc: function(data){
			console.log(data);
			var content = goodsTemp(data.data);
			new Dialog({
				id: "goodsModal",
				size : 2,
				title : "商品列表",
				content: content,
			});			
		}
	})
})

	// goods列表页 查看商品弹窗 删除按钮事件
$(document).on("click", ".btn-goods-views-del", function(){
	var _t = $(this);
	new Dialog({
		id: "delGoodsModal",
		size : 0,
		title : "警告",
		btn: true,
		content: "确认删除该商品？",
		handlerFunc: function(){
			datas = {};
			datas.id = _t.attr("data-id");
			Ajax({
				url: path + "Goods/goodsDelete",
				data: datas,
				successFunc: function(data){
					console.log(data);
					new Dialog({
						id: "warmModal",
						size : 0,
						title : "提示",
						content: data.info,
					});			
					if (data.status) {
						_t.parents("tr").remove();
						closeModal("delGoodsModal");
					}
				}
			})
		}
	});	
})


	// 添加商品基本信息事件
$("#addGoodsBtn").on("click", function(){
	datas = {};
	datas.title = $("#title").val();
	datas.brand_id = $("#brand").val();
	datas.price_market = $("#price_market").val();
	datas.price_member = $("#price_member").val();
	datas.description = $("#description").val();
	datas.class_id = $("#categoryDetail").val();
	datas.category_id = $("#category").val();
	datas.category_sub_id = $("#categorySub").val();
	datas.stock = $("#stock").val();
	datas.min_yunfei = $('input[name="min_yunfei"]:checked').val();
	datas.shelves = $('input[name="shelves"]:checked').val();
	datas.content = getContent();

	Ajax({
		url: path + "Goods/goodsAdd",
		data: datas,
		successFunc: function(data){
			new Dialog({
				id: "warmModal",
				title: "提示",
				size: 0,
				content: data.info
			})
			if (data.status) {
				$("#goodsId").val(data.data);
				$(".edit-tabs li").removeClass("disabled");
				setTimeout(function(){
					closeModal("warmModal");
					$(".edit-tabs li").eq(1).click();
				}, 1000);
			}
		}
	})
})

	// 分类选择三级联动
$("#category").on("change", function(){
	getCategoryList($(this).val(), "categorySub");
})
$("#categorySub").on("change", function(){
	getCategoryList($(this).val(), "categoryDetail");
})		

	// 上传商品图片事件
$("#files").on("change", function(){
	var $t = $(this);
	var formData = new FormData($("#uploadForm")[0]);     // 使用FormData对象进行上传
	formData.append('photo',$("#files")[0].files[0]);
	formData.append('id', $("#goodsId").val());
	$.ajax({  
		url: path + "GoodsPic/goodsPicsUpload",     
		type: 'POST',  
		data: formData,  
		dataType:'json',
		async: false,  
		cache: false,  
		contentType: false,  
		processData: false,  
		success: function (data) { 
			console.log(data); 
   		    new Dialog({
				id: "warmModal",
				title: "提示",
				size: 0,
				content: data.info
			})
   		    if (data.status) {
   		    	handleFiles($t, function(src){
   		    		var obj = {};
   		    		obj.thumb = src;
   		    		obj.id = data.data.pic_id;
   		    		var content = picUploadTemp(obj);
   		    		$(".pic-upload-list").append(content);
   		    	})
   		    };
   		},  
	}); 
})

	// 商品相册删除事件
$(document).on("click", ".btn-goods-pic-del", function(){
	var _t = $(this);
	new Dialog({
		id: "picDelModal",
		size : 0,
		title : "警告",
		btn: true,
		content: "确定删除该图片？",
		handlerFunc: function(){
			datas = {};
	    	datas.id = _t.attr("data-id");

	    	Ajax({
				url: path + "GoodsPic/goodsPicDel",
				data: datas,
				successFunc: function(data){
					new Dialog({
						id: "warmModal",
						title: "提示",
						size: 0,
						content: data.info
					})
					if (data.status) {
						_t.parents(".col-md-3").remove();
						closeModal("picDelModal");
					}
				}
			})
		}
	});	
})

	// 规格三级联动
$("#goodsType").on("change", function(){
	var typeId = $(this).val();
	if (!typeId) {
		return;
	}
	datas = {};
	datas.type_id = typeId;
	Ajax({
		url: path + "Size/get_size_list",
		data: datas,
		successFunc: function(data){
			$("#size").empty().append('<option value="">请选择</option>');
			for (var i = 0; i < data.length; i++) {
				$("#size").append('<option value="'+ data[i].id +'">'+ data[i].name +'</option>');
			}
		}
	})
})
$("#size").on("change", function(){
	var sizeId = $(this).val();
	if (!sizeId) {
		return;
	};
	datas = {};
	datas.size_id = sizeId;
	Ajax({
		url: path + "Size/get_item_list",
		data: datas,
		successFunc: function(data){
			$(".size-box").empty();
			for (var i = 0; i < data.length; i++) {
				$(".size-box").append('<a href="javascript:void(0)" id="item_'+ data[i].id +'" data-id="'+ data[i].id +'" class="size-item"><span class="item-name">'+ data[i].item +'</span></a>')
			}
		}
	})
})

	// 切换规格选中状态
$(document).on("click", ".items-box .size-item", function(){
	console.log(1);
	if (!$(this).hasClass("size-item-active")) {
		$(this).addClass("size-item-active");
		var color = $("#color").val();
		var colorName = $("#color").find("option:selected").text();
		var itemId = $(this).attr('data-id');
		var itemName = $(this).find(".item-name").text();
		var content = goodsDetailTemp(color, colorName, itemId, itemName);
		$(".goods-detail").append(content);
	} else {
		$(this).removeClass("size-item-active");
	}	
})

	// 添加商品小分类信息
$(document).on("click", ".btn-goods-detail", function(){
	var _t = $(this);
	datas = {};
	datas.color_id = $(this).parents("tr").attr("data-color");
	datas.item_id = $(this).parents("tr").attr("data-id");
	datas.size_id = $("#size").val();
	datas.type_id = $("#goodsType").val();
	datas.p_id = $("#goodsId").val();
	// datas.p_id = 1257;
	datas.price_market = $(this).parents("tr").find(".price_market").val();
	datas.price_member = $(this).parents("tr").find(".price_member").val();
	datas.stock = $(this).parents("tr").find(".stock").val();
	datas.shelves = $(this).parents("tr").find("input[name='shelves']:checked").val();

	Ajax({
		url: path + "Goods/add_goods_detail",
		data: datas,
		successFunc: function(data){
			console.log(data);
			new Dialog({
				id: "warmModal",
				title: "提示",
				size: 0,
				content: data.info
			})

			if (data.status == 1) {
				_t.siblings(".btn-goods-detail-del").attr("data-id", data.data);
				goodsDetailInfoTemp(_t);
			}
		}
	})
})

	// 商品detail删除事件
$(document).on("click", ".btn-goods-detail-del", function(){
	var _t = $(this);
	var id = $(this).parents("tr").attr("data-id");
	if (typeof($(this).attr("data-id")) == "undefined") {
    	$(this).parents("tr").remove();
    	$("#item_"+id).removeClass("size-item-active");
	} else {
		new Dialog({
			id: "detailDelModal",
			size : 0,
			title : "警告",
			btn: true,
			content: "确定删除该商品小分类？",
			handlerFunc: function(){
				datas = {};
	    		datas.id = _t.attr('data-id');
	    		Ajax({
					url: path + "Goods/del_goods_detail",
					data: datas,
					successFunc: function(data){
						new Dialog({
							id: "warmModal",
							title: "提示",
							size: 0,
							content: data.info
						})
						if (data.status) {
							_t.parents("tr").remove();
							$("#item_"+id).removeClass("size-item-active");
							closeModal("detailDelModal");
						}
					}
				})
			}
		});		
	}
})

	// Size页面添加规格事件(SizeController)
$("#addItemBtn").on("click", function(){
	var itemArr = checkItemExist();
	var itemName = $.trim($("#sizeInput").val());

	for(var index in itemArr){
		if (itemName == itemArr[index]) {
			new Dialog({
				id: "errorModal",
				title: "提示",
				size: 0,
				content: "规格项以存在，请重新输入！"
			})
			$("#sizeInput").val("");
		 	return;
		}
	}

	if (!itemName) {
		new Dialog({
			id: "errorModal",
			title: "提示",
			size: 0,
			content: "规格项名称不能为空！"
		})
	 	return;
	}
	var sizeItem = '<a href="javascript:void(0)" class="size-item size-item-new"><span class="item-name">'+ itemName +'</span> <i class="glyphicon glyphicon-remove"></i></a>';
	$(".size-box").append(sizeItem);
})

	// 商品页面直接添加商品规格事件
$("#addItemGoods").on("click", function(){
	var itemArr = checkItemExist();
	var itemName = $.trim($("#sizeInput").val());
	var sizeId = $("#size").val();

	for(var index in itemArr){
		if (itemName == itemArr[index]) {
			new Dialog({
				id: "errorModal",
				title: "提示",
				size: 0,
				content: "规格项以存在，请重新输入！"
			})
			$("#sizeInput").val("");
		 	return;
		}
	}

	if (!itemName) {
		new Dialog({
			id: "errorModal",
			title: "提示",
			size: 0,
			content: "规格项名称不能为空！"
		})
	 	return;
	}

	if (!sizeId) {
		new Dialog({
			id: "errorModal",
			title: "提示",
			size: 0,
			content: "请选择规格分类！"
		})
	 	return;
	}

	datas.item = itemName;
	datas.size_id = sizeId;
	Ajax({
		url: path + "Size/item_add",
		data: datas,
		successFunc: function(data){
			console.log(data);
			new Dialog({
				id: "errorModal",
				title: "提示",
				size: 0,
				content: data.info
			})

			if (data.status == 1) {
				var sizeItem = '<a href="javascript:void(0)" class="size-item" id="item_'+ data.data +'" data-id="'+ data.data +'"><span class="item-name">'+ itemName +'</span></a>';
				$(".size-box").prepend(sizeItem);				
			}
		}
	})
})

	// 新添加的规格Item删除事件
$(document).on("click", ".size-box .size-item-new", function(){
	$(this).remove();
})

	// 修改商品基本信息事件
$("#editGoodsBtn").on("click", function(){
	datas = {};
	datas.title = $("#title").val();
	datas.brand_id = $("#brand").val();
	datas.price_market = $("#price_market").val();
	datas.price_member = $("#price_member").val();
	datas.description = $("#description").val();
	datas.class_id = $("#categoryDetail").val();
	datas.category_id = $("#category").val();
	datas.category_sub_id = $("#categorySub").val();
	datas.stock = $("#stock").val();
	datas.min_yunfei = $('input[name="min_yunfei"]:checked').val();
	datas.shelves = $('input[name="shelves"]:checked').val();
	datas.content = getContent();
	datas.id = $("#goodsId").val();
	console.log(datas);
	Ajax({
		url: path + "Goods/edit_goods_detail",
		data: datas,
		successFunc: function(data){
			new Dialog({
				id: "warmModal",
				title: "提示",
				size: 0,
				content: data.info
			})
			if (data.status) {
				reload();
			};
		}
	})
})

	// 商品参数修改事件
var paramsArr = [];
$("#saveParams").on("click", function(){
	$(".params-item").each(function(){
		var tit = $.trim($(this).find(".params-tit").val());
		var con = $.trim($(this).find(".params-con").val());
		var obj = tit +"："+ con;
		paramsArr.push(obj);
	})
	datas.attr_content = paramsArr.join("&&");
	datas.goods_id = $("#goodsId").val();
	Ajax({
		url: path + "Goods/paramsEdit",
		data: datas,
		successFunc: function(data){
			new Dialog({
				id: "warmModal",
				title: "提示",
				size: 0,
				content: data.info
			})
		}
	})
})

$("#addParams").on("click", function(){
	var paramsItem = addParamsTemp();
	$(".params-wrapper").append(paramsItem);
})

$(".params-wrapper").on("click", ".btn-params-del", function(){
	var _t = $(this);
	new Dialog({
		id: "paramsDelModal",
		size : 0,
		title : "警告",
		btn: true,
		content: "确定删除该属性？",
		handlerFunc: function(){
			_t.parents(".params-item").remove();
			closeModal("paramsDelModal");
		}
	});		
})

	// 规格搜索事件
$("#searchItemBtn").on("click", function(){
	var sizeId = $("#size").val();
	if (!sizeId) {
		new Dialog({
			id: "errorModal",
			title: "提示",
			size: 0,
			content: "请选择规格分类！"
		});
		return;
	}
	console.log(sizeId);
})



	// goods列表页查看商品弹窗模板
function goodsTemp(datas){
	var content = "";
	for (var i = 0; i < datas.length; i++) {
		var shelvesStr, recommendStr;
		shelvesStr = datas[i].shelves ? "是" : "否";
		recommendStr = datas[i].recommend ? "是" : "否";
		content += "<tr>";
		content += '<td>'+ datas[i].id +'</td>';
		content += '<td class="goods-title">'+ datas[i].title + ' / ' + datas[i].item_name +'</td>';
		content += '<td>'+ datas[i].color_name +'</td>';
		content += '<td>'+ datas[i].category +'</td>';
		content += '<td>'+ datas[i].price_market +'</td>';
		content += '<td>'+ datas[i].price_member +'</td>';
		content += '<td>'+ datas[i].stock +'</td>';
		content += '<td>'+ shelvesStr +'</td>';
		content += '<td>'+ recommendStr +'</td>';
		content += '<td><a class="btn btn-primary btn-sm" href="'+ path +'Goods/preview?id='+ datas[i].id +'" target="_blank"><i class="glyphicon glyphicon-eye-open"></i></a> <a class="btn btn-danger btn-sm btn-goods-views-del" data-id="'+ datas[i].id +'" href="javascript:void(0)"><i class="glyphicon glyphicon-remove"></i></a></td>';
		content += "</tr>";
	}

	var htmls = '<table class="table table-hover table-bordered text-center">'
		+'<thead>'
		+'<tr>'
		+'<th>Id</th>'
		+'<th>商品名</th>'
		+'<th>颜色</th>'
		+'<th>商品分类</th>'
		+'<th>市场价</th>'
		+'<th>会员价</th>'
		+'<th>库存</th>'
		+'<th>是否上架</th>'
		+'<th>是否推荐</th>'
		+'<th>操作</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody>'+ content +'</tbody>'
		+'</table>'
	return htmls;
}

	// 上传图片生成显示模块
function picUploadTemp(data){
	var htmls = '<div class="col-md-3">'
	+'<div class="goods-pic" data-id="'+ data.id +'">'
	+'<img src="'+ data.thumb +'" alt="">'
	+'<a class="btn-goods-pic-del" href="javascript:void(0)" data-id="'+ data.id +'" title="删除">'
	+'<i class="glyphicon glyphicon-remove"></i>'
	+'</a>'
	+'</div>'
	+'</div>';
	return htmls
}

	// 获取分类信息列表填充select
function getCategoryList(fid, ele){
	datas.fid = fid;
	if (datas.fid != "") {
		Ajax({
			url: path + "Category/categorySelect",
			data: datas,
			successFunc: function(data){
				if (!data.status) {
					new Dialog({
						id: "errorModal",
						title: "提示",
						size: 0,
						content: data.info
					})
				} else {
					$("#" + ele).empty().append("<option value=''>请选择</option>");
					for (var i = 0; i < data.data.length; i++) {
						$("#" + ele).append("<option value='"+ data.data[i].id +"'>"+ data.data[i].class_name +"</option>");
					};
				}
			}
		})
	};
}

	// 生成添加商品小分类的模板
function goodsDetailTemp(colorId, colorName, itemId, itemName){
	var htmls = '<tr class="td-size" id="row_'+ itemId +'" data-id="'+ itemId +'" data-color="'+ colorId +'">'
		+'<td>'
		+'<span class="edit-label goods-size">'+ colorName +'</span>'
		+'</td>'
		+'<td>'
		+'<span class="edit-label goods-size">'+ itemName +'</span>'
		+'</td>'
		+'<td class="td-goods-sm">'
		+'<input type="text" class="form-control edit-form-control price_market" placeholder="市场价">'
		+'</td>'
		+'<td class="td-goods-sm">'
		+'<input type="text" class="form-control edit-form-control price_member" placeholder="会员价">'
		+'</td>'
		+'<td class="td-goods-sm">'
		+'<input type="text" class="form-control edit-form-control stock" placeholder="库存">'
		+'</td>'
		+'<td class="td-goods-sm">'
		+'<label class="radio-inline common-table-radio"><input type="radio" name="shelves" value="1" checked> 是</label>'
		+'<label class="radio-inline common-table-radio"><input type="radio" name="shelves" value="0"> 否</label>'
		+'</td>'
		+'<td>'
		+'<a href="javascript:void(0)" class="btn-detail btn-goods-detail"><i class="glyphicon glyphicon-ok"></i></a>'
		+'<a href="javascript:void(0)" class="btn-detail btn-goods-detail-del"><i class="glyphicon glyphicon-remove"></i></a>'
		+'</td>'	
		+'</tr>';
	return htmls;
}

	// 生成商品详细小分类信息表格
function goodsDetailInfoTemp(t){
	var $t = t;
	var $ele = $t.parents("tr").find(".td-goods-sm");
	var price_market = $ele.eq(0).find("input").val();
	var price_member = $ele.eq(1).find("input").val();
	var stock = $ele.eq(2).find("input").val();
	var shelves = $ele.eq(3).find("input[name='shelves']:checked").val();
	if (shelves == 1) {
		shelvesStr = "是";
	} else {
		shelvesStr = "否";
	}
	$ele.eq(0).find("input").hide();
	$ele.eq(0).append("<span class='input-txt'>"+ price_market +"<span>");
	$ele.eq(1).find("input").hide();
	$ele.eq(1).append("<span class='input-txt'>"+ price_member +"<span>");
	$ele.eq(2).find("input").hide();
	$ele.eq(2).append("<span class='input-txt'>"+ stock +"<span>");
	$ele.eq(3).find("label").hide();
	$ele.eq(3).append("<span class='input-txt'>"+ shelvesStr +"<span>");
	$t.hide();
}

	// 生成商品参数信息输入表单
function addParamsTemp(){
	var htmls = '<div class="col-md-6 params-item">'
		+'<div class="col-md-3">'
		+'<input type="text" class="form-control params-tit" placeholder="参数名">'
		+'</div>'
		+'<div class="col-md-6">'
		+'<input type="text" class="form-control params-con" placeholder="参数值">'
		+'</div>'
		+'<div class="col-md-3">'
		+'<a class="btn btn-danger btn-params-del" href="javascript:void(0)" title="删除">'
		+'<i class="glyphicon glyphicon-trash"></i>'
		+'</a>'	
		+'</div>'
		+'</div>';
	return htmls;
}