<template>
	<div class="wrap">
		<my-Header></my-Header>	

		<div class="content clearfix">
			<my-menu></my-menu>

			<div class="col-md-10">

				<div class="main">
					<div class="container-fluid">
						<h1>Home{{getToken}}</h1>
						<h2>当前信息数据为：{{gettersMsg}} </h2>
						<button @click="changeMsg" class="btn btn-primary">点击切换信息数据</button>
						<button @click="test" class="btn btn-primary">弹窗</button>
					</div>	
				</div>
			</div>
		</div>

		<common-dialog ref="child" v-if="showModal"
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
	import {mapGetters, mapActions} from 'vuex';
	import Header from './Header'
	import Menu from './Menu'
	import Dialog from './Dialog'
	export default {
		name: 'Home',
		data () {
			return {
			  	styleObject: {
				    paddingLeft: '40px'
				},
				showModal: false,
				dialog: {
	  				id: "warmDialog",
	  				size: 0,
	  				title: "警告",
	  				content: "这是一个模态框！",
	  				button: false,
	  				confirmFunc: function(){
	  					console.log("点击确认了！");
	  					this.$refs.child.close();
	  				}.bind(this),
	  			}
			}
		},
		components: {
			'my-menu' : Menu,
			'my-Header' : Header,
			'common-dialog' : Dialog,
		},   
		computed: {
			...mapGetters(['gettersMsg', 'gettersMenuStatus', 'getToken']),
		},
		methods: {
			...mapActions(['changeMsg']),
			test () {
				console.log(this.showModal);
				this.showModal = true;
			},
			closeModal () {
				this.showModal = false;
			} 
		},
		mounted () {
			console.log(this);
		}
	}

	$(function(){
		var status = localStorage.getItem('menu');
		if (status == '0') {
			$(".main").css("padding-left", "40px");
		} else {
			$(".main").css("padding-left", "0");
		}	
	})
	// $(document).ready(function(){
		
	// })
	
</script>