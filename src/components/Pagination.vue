<template>
	<div class="text-center">
		<nav aria-label="Page navigation">
			<ul class="pagination">
			    <li>
			      	<a @click="prevPage" href="javascript:void(0)" aria-label="Previous">
			        	<span aria-hidden="true">&laquo;</span>
			      	</a>
			    </li>
			    <li>
			      	<router-link :to="target + 1">First</router-link>
			    </li>
			    <li v-for="index in getPage" :class="{active: index == $route.params.id}">
			    	<a href="javascript:void(0)" v-if="index == '···'">{{index}}</a>
			    	<router-link v-if="index != '···'" :to="target + index">{{index}}</router-link>
			    </li>
			    <li>
			      	<router-link :to="target + total">Last</router-link>
			    </li>
			    <li>
			      	<a @click="nextPage" href="javascript:void(0)" aria-label="Next">
			        	<span aria-hidden="true">&raquo;</span>
			 	 	</a>
			    </li>
			</ul>
		</nav>	
	</div>
</template>
<script>
	export default {
		name: 'Pagination',
		data () {
			return {
			  	
			}
		},
		computed: {
			getPage(){
				var activeIndex = parseInt(this.$route.params.id);
				var totalPage = this.total;
				if (totalPage <= 10) {
					return Array.apply(null, Array(totalPage)).map(function(item, i){
						return i+1;
					})
				} else {
					if (activeIndex - 3 <= 0) {
						return [1, 2, 3, 4, 5, '···']
					} else if (totalPage - activeIndex <= 2) {
						return ['···', totalPage-4, totalPage-3, totalPage-2, totalPage-1, totalPage];
					} else {
						return ['···', activeIndex - 2, activeIndex - 1, activeIndex, activeIndex + 1, activeIndex + 2, '···'];

					}
				}
			},
		},
		props: ['total', 'target'],
		methods: {
			nextPage () {
				var urls;
				if (this.$route.params.id < this.total) {
					this.$route.params.id++;
					urls = this.target + this.$route.params.id;
					this.$router.push({path: urls});
				}
			},
			prevPage () {
				var urls;
				if (this.$route.params.id > 1) {
					this.$route.params.id--;
					urls = this.target + this.$route.params.id;
					this.$router.push({path: urls});
				}
			}
		}
	}
</script>