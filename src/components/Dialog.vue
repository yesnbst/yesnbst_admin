<template>
	<div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div :class="['modal-dialog', {'modal-lg': size == 2, 'modal-sm' : size == 0}]" role="document">
			<div class="modal-content modal-message">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel"> {{dialogTitle}} </h4>
				</div>

				<div class="modal-body">
					<div class="modal_con">
					<p>{{content}}</p>
					</div>
				</div>

				<div class="modal-footer" v-if="button">
				    <button type="button" class="btn btn-default modal_reset" data-dismiss="modal">取消</button>
				    <button @click="confirmHandler" type="button" class="btn btn-primary modal_confirm">确定</button>
			  	</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Dialog',
		data () {
			return {
			  	diaTit: ''
			}
		},
		mounted () {
			var id = this.id;
			$("#"+id).modal('show');

	        $("#"+ this.id).on("hidden.bs.modal", function(e){
				this.$emit('hiddenModal')
			}.bind(this))
		},
		props: ['id', 'size', 'title', 'content', 'button', 'confirmHandler'],
		computed: {
			dialogTitle () {
				this.diaTit = this.title;
				if (this.diaTit == undefined || this.diaTit == "") {
					this.diaTit = '提示';
				}
				return this.diaTit;
			}
		},
		methods: {
			close () {
				$("#"+this.id).modal("hide");
			}
		}
	}
</script>