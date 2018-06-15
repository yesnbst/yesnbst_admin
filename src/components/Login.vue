<template>
	<div class="wrap login-wrap">
		<div class="login-form">
			<form @submit.prevent="onSubmit">
				<div class="form-group">
				    <label for="account">Account</label>
				    <input type="text" v-model="account" class="form-control" name="account" id="account" placeholder="Account" required autocomplete="off">
				</div>
				<div class="form-group">
				    <label for="password">Password</label>
				    <input type="password" v-model="password" class="form-control" name="password" id="password" placeholder="Password" required autocomplete="off">
				</div>
				<div class="form-sub">
					<button type="submit" class="btn btn-primary">Sign In</button>
				</div>
			</form>	
		</div>
	</div>
</template>
<script>
	import {mapGetters, mapActions} from 'vuex';
	import qs from 'qs';
	
	export default {
		name: 'Login',
		data () {
			return {
				account: '',
			  	password: ''
			}
		},
		methods: {
			onSubmit () {
				var formData = {
					account: this.account,
					password: this.password
				}
				var router = this.$router;
				this.$http({
			        method: 'post',
			        url: 'http://localhost:8088/test/Home/Admin/login',
			        data:  qs.stringify(formData),
			        headers: {
				        'Content-Type': 'application/x-www-form-urlencoded',
				    }
				}).then(function(res){
				 	var resp = res.data;
				 	console.log(resp);
			 		if (resp.status) {
						localStorage.setItem('token', resp.data);
						router.replace({path: '/'});
					} else {
						alert(resp.info);
					}
				})
				.catch(function(err){
				 	console.log(err)
				})
			}
		}
	}
</script>
<style>
	html {
	    height: 100%;
	    background: url(../assets/images/bg.png) center no-repeat;
	    background-size: cover;
	}
	.login-wrap {
		padding: 0;
	}
</style>