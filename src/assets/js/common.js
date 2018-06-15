var path = window.location.origin + "/Admin/";
var datas = {};

$(function(){
	$("#code").on("click", function(){
		$(this).attr("src", path + "User/verify?" + new Date().getTime());
	})

		// Enter键事件
	// document.onkeydown=function(){
	// 	if (event.keyCode == 13){
	// 		if ($("#loginModal").css("display") == "block") {
	// 			datas.username = $("#loginUsername").val();
	// 			datas.password = $("#loginPassword").val();

	// 			Ajax({
	// 				url: path + "User/login",
	// 				data: datas,
	// 				successFunc: function(data){
	// 					console.log(data);
	// 					if (data.status == 1) {
	// 						location.reload();
	// 					} else {
	// 						new Dialog({
	// 							id: "errorModal",
	// 							title: "提示",
	// 							size: 0,
	// 							content: data.info
	// 						})
	// 					}
	// 				}
	// 			})
	// 		}
	// 	}
	// }

		// 登出按钮事件
	$(".logout").on("click", function(){
		var _t = $(this);
		new Dialog({
			id: "actionModal",
			size : 0,
			title : "警告",
			btn: true,
			content: 'Confirm to exit user?',
			handlerFunc: function(){
				window.location = path + "Admin/logout";
			}
		});	
	})

})

function Ajax(opts){
	var defaults = {
		type: "post",
		dataType: "json",
		data: null,
		successFunc: null,
		errorFunc: null
	}
	var options = $.extend(defaults, opts);
	// console.log(options);
	$.ajax({
		type: options.type,
		url: options.url,
		dataType: options.dataType,
		data: options.data,
		success: options.successFunc,
		error: options.errorFunc
	})
}

	// 弹窗封装
function Dialog(opts){
	var _t = this;
	this.title = opts.title ? opts.title : "温馨提示";
	this.resetTit = opts.resetTit ? opts.resetTit : "取消";
	this.confirmTit = opts.confirmTit ? opts.confirmTit : "确定";
	this.footerStatus = opts.btn ? "block" : "none";
	this.handlerFunc = opts.handlerFunc ? opts.handlerFunc : null;
	this.resetHandlerFunc = opts.resetHandlerFunc ? opts.resetHandlerFunc : null;

	switch(opts.size) {
		case 0: 
			this.sizeClass = 'modal-sm';
			break;
		case 1:
			this.sizeClass = '';
			break;
		case 2: 
			this.sizeClass = 'modal-lg';
			break;
	};

	this.modalId = opts.id;
	this.content = opts.content;

	$("#"+ this.modalId).remove();
	if ($("#"+ this.modalId).length == 0) {
		var dialogHtml = '<div class="modal fade" id="'+ this.modalId +'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
			+'<div class="modal-dialog '+ this.sizeClass +'" role="document">'
			+'<div class="modal-content modal-message">'
			+'<div class="modal-header">'
			+'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
			+'<h4 class="modal-title" id="myModalLabel">'+ this.title +'</h4>'
			+'</div>'
			+'<div class="modal-body">'
			+'<div class="modal_con">'
			+'<p>'+ this.content +'</p>'
			+'</div>'
			+'</div>'
			+'<div class="modal-footer" style="display:'+ this.footerStatus +';">'
	        +'<button type="button" class="btn btn-default modal_reset" data-dismiss="modal">'+ this.resetTit +'</button>'
	        +'<button type="button" class="btn btn-primary modal_confirm">'+ this.confirmTit +'</button>'
	      	+'</div>'
			+'</div>'
			+'</div>'
			+'</div>';
		$("body").append(dialogHtml);
	}
	
	$("#"+ this.modalId).modal('show');
	if ($(".modal_confirm")) {
		$(".modal_confirm").on("click", this.handlerFunc);
	}
	if ($(".modal_reset")) {
		$(".modal_reset").on("click", function(){
			_t.resetHandlerFunc;
			closeModal(_t.modalId);
		});
	}
	$("#"+ this.modalId).on("hidden.bs.modal", function(e){
		$(this).remove();
	})
}

function closeModal(modalId){
	$("#"+ modalId).modal('hide');
	$("#"+ modalId).on("hidden.bs.modal", function(e){
		$(this).remove();
	})
}

	// 获取umeditor内容
function getContent() {
    var arr = [];
    arr.push(UM.getEditor('myEditor').getContent());
    return arr.join("\n");
}


	// 生成七牛图片前缀啊~
function keyCreate(){
	var date = new Date();
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getTime() + "_";
}


window.URL = window.URL || window.webkitURL;
function handleFiles(obj, callback) {
    var files = obj[0].files,
      	img = new Image();
    if(window.URL){
          img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
          callback(img.src)
    }
}	


	//普通上传
var Qiniu_upload = function(f, token, key, t) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', Qiniu_UploadUrl, true);
    var formData, startDate;
    formData = new FormData();
    if (key !== null && key !== undefined) formData.append('key', key);
    formData.append('token', token);
    formData.append('file', f);
    var taking;
    xhr.upload.addEventListener("progress", function(evt) {
        if (evt.lengthComputable) {
            var nowDate = new Date().getTime();
            taking = nowDate - startDate;
            var x = (evt.loaded) / 1024;
            var y = taking / 1000;
            var uploadSpeed = (x / y);
            var formatSpeed = 0;
            if (uploadSpeed > 1024) {
                formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
            } else {
                formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
            }
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);

            console && console.log(percentComplete, ",", formatSpeed);	// 获取上传进度以及上传速度
        }
    }, false);

    xhr.onreadystatechange = function(response) {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
            var blkRet = JSON.parse(xhr.responseText);
            console && console.log(blkRet);
            t.siblings("input").val("http://7xt658.com1.z0.glb.clouddn.com/" + blkRet.key)
        } else if (xhr.status != 200 && xhr.responseText) {
        	console.log(JSON.parse(xhr.responseText));
        }
    };
    startDate = new Date().getTime();
    xhr.send(formData);
};

function reload(){
	setTimeout(function(){
		location.reload();
	}, 1000)
}