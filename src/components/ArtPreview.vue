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
							<li class="active">{{artDetail.title}}</li>
						</ol>

						<div class="preview">
							<h2 class="text-center preview-title">{{artDetail.title}}</h2>
							<div class="preview-opts text-center">
								<span>标签：{{artDetail.tagname}}</span>
								<span>作者：{{artDetail.author}}</span>
								<span>创建时间：{{artDetail.create_time}}</span>
							</div>
							<div class="row">
								<div class="col-sm-offset-1 col-sm-10 markdown-body">
									<div class="preview-content" v-html="artDetail.content"></div>
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
	import 'mavon-editor/dist/css/index.css'

	export default {
		name: 'ArtPreview',
		data () {
			return {
			  	artDetail: {}
			}
		},
		components: {
			'my-menu' : Menu,
			'my-Header' : Header,
		},
		methods: {
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
				}.bind(this))
				.catch(function(err){
				 	console.log(err)
				})	
			},
		},
		created () {
			this.getDetail();
		},
	}
</script>