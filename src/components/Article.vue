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
											<th>Tags</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="item in article">
											<td>{{item.id}}</td>
											<td>{{item.title}}</td>
											<td>{{item.author}}</td>
											<td>{{item.create_time}}</td>
											<td>{{item.tagname}}</td>
											<td>
												<router-link :to="{path: '/art-preview/'+item.id}" class="btn btn-info btn-sm">
													<i class="glyphicon glyphicon-eye-open"></i>
												</router-link>
												<router-link :to="{path: '/art-edit/'+item.id}" class="btn btn-primary btn-sm">
													<i class="glyphicon glyphicon-pencil"></i>
												</router-link>
												<a @click="delArticle(item.id)" class="btn btn-danger btn-sm" href="javascript:void(0)">
													<i class="glyphicon glyphicon-remove"></i>
												</a>	
											</td>
										</tr>	
									</tbody>
								</table>	
							</div>

							<Pagination :total="getPage" target="/article/"></Pagination>
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
		name: 'Artcile',
		data () {
			return {
			  	key: '',
			  	page: this.$route.params.id,
			  	totalPage: 0,
			}
		},
		components: {
			'my-menu' : Menu,
			'my-Header' : Header,
			'Pagination' : Pagination
		},
		computed: {
			...mapState([
                'article',
                'artTotalCount'
            ]),
            getPage(){
            	var total = parseInt(this.artTotalCount);
            	var pagination = Math.ceil(total / 10);
            	return pagination;
            }
		},
		methods: {
			getArticles () {
				this.$store.dispatch('getArticle', {
					p: this.$route.params.id,
					key: this.key
				});	
			},
			getSearchResult () {		// 搜索按钮事件
				if (this.key.trim() == "") {
					alert('搜索词不能为空！');
					return;
				}
				this.getArticles();
			},
			delArticle (id) {
				if (confirm("确定删除该文章？")) {
					const _t = this;
					var request = api.delArticle({id: id});
					request.then(function(res){
					 	var resp = res.data;
					 	if (resp.status) {
					 		_t.getArticles();
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
				this.$store.dispatch('getArticle', {
					p: this.page,
					key: this.key
				});
			}
		},
		 watch: {
		    // 如果路由有变化，会再次执行该方法
		    '$route': 'getArticles',
		},
	}
</script>