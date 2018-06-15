<template>
	<div class="header">
		<div class="container-fluid">
			<nav class="navbar navbar-primary" role="navigation">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">System</a>
				</div>

				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav navbar-right">
							<!-- 已登录状态 -->
						<li class="dropdown" v-if="is_logined">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<span class="glyphicon glyphicon-user"></span> {{account}} <span class="caret"></span>
							</a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#"><span class="glyphicon glyphicon-cog"></span> Setting</a></li>
								<li class="divider"></li>
								<li><a @click="logoutAction" class="logout" href="javascript:void(0)"><span class="glyphicon glyphicon-log-out"></span> Exit</a></li>
							</ul>
						</li>	

							<!-- 未登录状态 -->
						<li  v-if="!is_logined">
							<router-link to="/login">Login</router-link>
						</li>		
					</ul>
				</div>
			</nav>	
		</div>
	</div>
</template>
<script>
	import {mapGetters, mapState, mapActions} from 'vuex';
	import { clearLocalToken } from '../assets/js/unit';
	export default {
		name: 'Header',
		data () {
			return {}
		},
		methods: {
			...mapActions(['logout']),
			logoutAction () {
				clearLocalToken();
				this.logout();
				this.$router.push({path: '/login'});
			}
		},
		computed: {
			...mapState([
                'token',
                'account'
            ]),
			is_logined () {
				return this.token ? true : false;
			},
		},
		mounted(){  
            
        }
	}
</script>