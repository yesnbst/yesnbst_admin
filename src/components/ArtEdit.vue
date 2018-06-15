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
														<input v-model="artDetail.title" type="text" class="form-control edit-form-control" placeholder="Title">
													</td>
												</tr>
												<tr>
													<td>
														<span class="edit-label">Tags</span>
													</td>
													<td>
														<div class="col-md-3">
															<select id="brand" class="form-control" v-model="artDetail.tagname">
																<option>请选择</option>
																<option v-for="item in tags" :value="item.tagname">{{item.tagname}}</option>
															</select>	
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<span class="edit-label">Author</span>
													</td>
													<td>
														<input v-model="artDetail.author" type="text" class="form-control edit-form-control" placeholder="Author">
													</td>
												</tr>
												<tr>
													<td>
														<span class="edit-label">Content</span>
													</td>
													<td>
														<ueditor ref="editor" :content="content"></ueditor>
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
	</div>
</template>
<script>
	import {mapGetters, mapState, mapActions} from 'vuex';
	import qs from 'qs';
	import Header from './Header'
	import Menu from './Menu'
	import Ueditor  from './Ueditor'

	export default {
		name: 'ArtEdit',
		data () {
			return {
			  	artDetail: {},
			  	tags: [],
			  	content: '',
			  	contentMk: '',
			  	editor: null
			}
		},
		components: {
			'my-menu' : Menu,
			'my-Header' : Header,
			'ueditor': Ueditor 
		},
		methods: {
			...mapActions(['editArticle']),
			onSubmit () {
				const _t = this;
				var formData = {
					id: this.$route.params.id,
					title: this.artDetail.title,
					author: this.artDetail.author,
					tagname: this.artDetail.tagname,
					content: _t.$refs.editor.getContent(),
				}
				var router = this.$router;
				this.$http({
			        method: 'post',
			        url: 'http://localhost:8088/test/Home/Article/artEdit',
			        data:  qs.stringify(formData),
			        headers: {
				        'Content-Type': 'application/x-www-form-urlencoded',
				    }
				}).then(function(res){
				 	var resp = res.data;
				 	if (resp.status) {
				 		alert(resp.info);
				 		_t.editArticle(formData)
				 		_t.$router.go(-1);
				 	}
				 	console.log(resp);
				})
				.catch(function(err){
				 	console.log(err)
				})
			},
			getDetail () {
			 	this.$http({
			        method: 'post',
			        url: 'http://localhost:8088/test/Home/Article/getDetail',
			        data:  qs.stringify({id: this.$route.params.id}),
			        headers: {
				        'Content-Type': 'application/x-www-form-urlencoded',
				    }
				}).then(function(res){
				 	var resp = res.data;
				 	console.log(resp);
				 	this.artDetail = resp;
				 	this.content = resp.content;
				}.bind(this))
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
				 	// console.log(resp);
				 	this.tags = resp;
				}.bind(this))
				.catch(function(err){
				 	console.log(err)
				})	
			},
		},
		created () {
			this.getDetail();
			this.getTags();
		},
		
	}
</script>