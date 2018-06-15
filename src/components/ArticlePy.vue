<template>
	<div class="wrap">
		<my-Header></my-Header>	

		<div class="content clearfix">
			<my-menu></my-menu>

			<div class="col-md-10">
					<div class="main">
					<div class="container-fluid">
						<div class="list">
							<div class="panel panel-default">
								<div class="panel-body clearfix">
									<h4 class="pull-left total_tit">Total <strong>{{artTotalCount}}</strong> Article</h4>

									<router-link to="/art-add" class="pull-right btn btn-primary">ADD NEW</router-link>

									<div class="search-group pull-right col-sm-4">
										<div class="input-group">
											<input v-model="key" type="text" id="key" class="form-control" placeholder="Search for...">
											<span class="input-group-btn">
												<button @click="getSearchResult" class="btn btn-default btn_search_user" type="button">
													<i class="glyphicon glyphicon-search"></i>
												</button>
											</span>
										</div>	
									</div>
								</div>
							</div>
							
							<div class="table-container">
								<table class="table table-hover table-bordered text-center">
									<thead>
										<tr>
											<th>ID</th>
											<th>Title</th>
											<th>Author</th>
											<th>CreateTime</th>
											<th>Source</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="item in article">
											<td>{{item.id}}</td>
											<td>{{item.title}}</td>
											<td>{{item.author}}</td>
											<td>{{item.create_time}}</td>
											<td><a v-bind:href="item['source']" target="_blank">原文链接</a></td>
											<td>
												<router-link :to="{path: '/art-preview/'+item.id}" class="btn btn-info btn-sm">
													<i class="glyphicon glyphicon-eye-open"></i>
												</router-link>
												<a @click="delArticle(item.id)" class="btn btn-danger btn-sm" href="javascript:void(0)">
													<i class="glyphicon glyphicon-remove"></i>
												</a>	
											</td>
										</tr>	
									</tbody>
								</table>	
							</div>

							<Pagination :total="getPage" target="/article-py/"></Pagination>
						</div>	
					</div>	
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters, mapState, mapActions} from 'vuex';
	import api from '../api/api'

	import Header from './Header'
	import Menu from './Menu'
	import Pagination from './Pagination'
	export default {
		name: 'ArtcilePy',
		data () {
			return {
			  	key: '',
			  	page: this.$route.params.id,
			  	totalPage: 0,
			  	article: [],
			  	artTotalCount: 0,
			}
		},
		components: {
			'my-menu' : Menu,
			'my-Header' : Header,
			'Pagination' : Pagination
		},
		computed: {
			getPage(){
            	var total = parseInt(this.artTotalCount);
            	var pagination = Math.ceil(total / 10);
            	return pagination;
            }
		},
		methods: {
			getArticlePy () {
				var params = {};
				params.p = this.$route.params.id;
				params.key = this.key;
				var request = api.getPyArticle(params).then(function(res){
				 	var resp = res.data;
				 	if (resp.status) {
				 		var data = resp.data;
				 		this.artTotalCount = resp.data.totalCount;
				 		this.article = resp.data.data;
				 	}
				}.bind(this)).catch(function(err){
				 	console.log(err)
				});	
			},
			getSearchResult(){
				if (this.key.trim() == "") {
					alert('搜索词不能为空！');
					return;
				}
				this.getArticlePy();
			},
			delArticle (id) {
				if (confirm("确定删除该爬虫文章？")) {
					const _t = this;
					var request = api.delPyArticle({id: id});
					request.then(function(res){
					 	var resp = res.data;
					 	if (resp.status) {
					 		_t.getArticlePy();
					 	}
					})
					.catch(function(err){
					 	console.log(err)
					});	
				}
			}
		},
		created () {
			if (!this.article.length) {
				var params = {};
				params.p = this.page;
				params.key = this.key;
				var request = api.getPyArticle(params).then(function(res){
				 	var resp = res.data;
				 	console.log(resp);
				 	if (resp.status) {
				 		var data = resp.data;
				 		this.artTotalCount = resp.data.totalCount;
				 		this.article = resp.data.data;
				 	}
				}.bind(this)).catch(function(err){
				 	console.log(err)
				});
			}
		},
		 watch: {
		    // 如果路由有变化，会再次执行该方法
		    '$route': 'getArticlePy',
		},
	}
</script>