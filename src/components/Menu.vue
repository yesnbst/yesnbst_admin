<template>
	<div :class="['col-md-2', 'navbox', {'navbox-hide navbox-float': gettersMenuStatus == '0'}]">
		<div class="nav-list">
			<ul class="menu">
				<li>
					<a href="javascript:void(0)" class="menu-control" @click="changeMenuStatus">
						<i class="glyphicon glyphicon-align-justify"></i>
					</a>
				</li>
				<li>
					<router-link to="/" @click="changeMenu('Home')">
						<i class="glyphicon glyphicon-home"></i> Home
					</router-link>
				</li>
				<li :class="{'menu-open': menuOpen == 'Article'}" @click="changeMenu('Article')">
					<a href="javascript:void(0)" title="文章管理">
						<i class="glyphicon glyphicon-th-large"></i> Article
					</a>
					<ul class="sub-menu">
						<li>
							<router-link to="/article/1">原创文章</router-link>
						</li>
						<li>
							<router-link to="/article-py/1">爬虫库文章</router-link>
						</li>
					</ul>
				</li>
			</ul>

				<!-- 缩小menu后的样式 -->
			<ul class="menu-sm">
				<li>
					<a data-toggle="tooltip" class="menu-control" data-placement="right" href="javascript:void(0)" title="OpenMenu" @click="changeMenuStatus">
						<i class="glyphicon glyphicon-align-justify"></i>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {mapGetters, mapActions} from 'vuex';

	export default {
		name: 'Menu',
		data () {
			return {
			  	
			}
		},
		computed: {
			...mapGetters(['gettersMenuStatus', 'getCurrentMenu']),
			menuOpen(){
				return this.getCurrentMenu
			}
		},
		methods: {
			...mapActions(['changeCurrentMenu']),
			changeMenuStatus(){
				this.$store.dispatch('changeMenuStatus');
				var menuStatus = this.$store.state.menu;
				menuChange(menuStatus);
			},
			changeMenu(menu){
				this.changeCurrentMenu(menu);
			}
		},
		mounted () {
			screenResize();
			$(window).on("resize", function(){
				screenResize();
			})	
		}
	}
	

	function menuChange(status){
		if (status == '0') {
			$(".navbox").addClass("navbox-hide");
			// setTimeout(function(){
				$(".main").css("padding-left", "40px");
				$(".navbox").addClass('navbox-float');
				$(".main").parent().removeClass("col-md-10").addClass("col-md-12");
			// }, 250);
		} else {
			$(".navbox").removeClass("navbox-hide");
			$(".navbox").removeClass('navbox-float');
			$(".main").parent().addClass("col-md-10").removeClass("col-md-12");
			$(".main").css("padding-left", "0");
		}
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
</script>