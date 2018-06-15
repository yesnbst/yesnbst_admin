<template>
	<div class="wrap">
		<my-Header></my-Header>	

		<div class="content clearfix">
			<my-menu></my-menu>

			<div class="col-md-10">
					<div class="main">
					<div class="container-fluid">
						<ol class="breadcrumb">
							<li>
								<router-link to="/"><i class="glyphicon glyphicon-home"></i> Home</router-link>
							</li>
							<li>
								<router-link to="/article/1">Article</router-link>
							</li>
							<li class="active">Article Edit</li>
						</ol>

						<div class="edit-container">
							<div class="edit-box">
								<div class="edit-item edit-item-active">
									<form @submit.prevent="onSubmit">
										<table class="table table-hover table-bordered">
											<tbody>
												<tr>
													<td>
														<span class="edit-label">Title</span>
													</td>
													<td>
														<input v-model="title" type="text" class="form-control edit-form-control" placeholder="Title" required>
													</td>
												</tr>
												<tr>
													<td>
														<span class="edit-label">Tags</span>
													</td>
													<td>
														<div class="col-md-3">
															<select id="brand" class="form-control" v-model="tagname">
																<option value="">请选择</option>
																<option v-for="item in tags">{{item.tagname}}</option>
															</select>	
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<span class="edit-label">Author</span>
													</td>
													<td>
														<input v-model="author" type="text" class="form-control edit-form-control" placeholder="Author" required>
													</td>
												</tr>
												<tr>
													<td>
														<span class="edit-label">Content</span>
													</td>
													<td>
														<div class="umeditor">
															<ueditor ref="editor" :content="content"></ueditor>
														</div>
													</td>
												</tr>
												<tr>
													<td colspan="2">
														<input type="submit" class="btn btn-primary" value="确定">
													</td>
												</tr>
											</tbody>
										</table>
									</form>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
		</div>
		<common-dialog ref="dialog" v-if="showModal"
	    	:id="dialog.id"
	    	:size="dialog.size"
	    	:title="dialog.title"
	    	:content="dialog.content"
	    	:button="dialog.button"
	    	:confirmHandler="dialog.confirmFunc"
	    	@hiddenModal="closeModal"
	    ></common-dialog>
	</div>
</template>
<script>
	import {mapGetters, mapState, mapActions} from 'vuex';
	import qs from 'qs';
	import Header from './Header'
	import Menu from './Menu'
	import Ueditor  from './Ueditor'
	import Dialog from './Dialog'

	export default {
		name: 'ArtEdit',
		data () {
			return {
			  	author: '',
			  	title: '',
			  	tagname: '',
			  	tags: [],
			  	content: '',
			  	showModal: false,
			  	dialog: {
	  				id: "warmDialog",
	  				size: 0,
	  				content: "这是一个模态框！",
	  				button: false,
	  				confirmFunc: function(){
	  					console.log("点击确认了！");
	  					this.$refs.dialog.close();
	  				}.bind(this),
	  			}
			}
		},
		components: {
			'my-menu' : Menu,
			'my-Header' : Header,
			'ueditor' : Ueditor,
			'common-dialog' : Dialog,
		},
		methods: {
			...mapActions(['addArticle']),
			onSubmit () {
				const _t = this;
				var formData = {
					title: this.title,
					author: this.author,
					tagname: this.tagname,
					content: _t.$refs.editor.getContent(),
				}
				var router = this.$router;
				this.$http({
			        method: 'post',
			        url: 'http://localhost:8088/test/Home/Article/artAdd',
			        data:  qs.stringify(formData),
			        headers: {
				        'Content-Type': 'application/x-www-form-urlencoded',
				    }
				}).then(function(res){
				 	var resp = res.data;
				 	_t.dialog.content = resp.info;
				 	if (resp.status) {
				 		formData.id = resp.data;
				 		formData.create_time = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
				 		_t.addArticle(formData);
				 		_t.showModal = true;
				 		console.log(_t.$refs);
				 		setTimeout(function(){
				 			_t.$refs.dialog.close();
				 			_t.$router.push('/article/1');
				 		}, 1000)
				 	}
				})
				.catch(function(err){
				 	console.log(err)
				})
			},
			getTags () {
				this.$http({
			        method: 'post',
			        url: 'http://localhost:8088/test/Home/Article/getTagsList',
			        headers: {
				        'Content-Type': 'application/x-www-form-urlencoded',
				    }
				}).then(function(res){
				 	var resp = res.data;
				 	this.tags = resp;
				}.bind(this))
				.catch(function(err){
				 	console.log(err)
				})	
			},
			closeModal () {
				this.showModal = false;
			} 
		},
		created () {
			this.getTags();
		}
	}
</script>