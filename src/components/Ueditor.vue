<template>
	<div id="editor"></div>
</template>;

<script>
	import qs from 'qs';
	import'../../static/ueditor/ueditor.config.js'
	import'../../static/ueditor/ueditor.all.min.js'
	import'../../static/ueditor/lang/zh-cn/zh-cn.js'
	import'../../static/ueditor/ueditor.parse.min.js'
	export default {
		name: 'Ueditor',
		data () {
			return {
		  	 	
			}
		},
      	methods: {
      		getUEContent() { 
		        return this.editor.getContent()
	      	},
	      	getContent (val, render) {	// render-html  val-markdown
	      		return this.getUEContent();
      			// this.editorContent = this.getUEContent();
      			// this.$emit('editContent', {content: this.editorContent});
      		},
      	},
      	props: ['content'],
      	mounted () {
			this.editor = UE.getEditor('editor');
			this.editor.ready(function() {
			    this.editor.setContent(this.content);
			}.bind(this));
		},
		destroyed() {
　　		this.editor.destroy();
      	},
      	watch: {
      		content: function(val){
      			this.editor.ready(function() {
				    this.editor.setContent(this.content);
				}.bind(this));
      		}
      	}
	}
</script>
<style>
    #editor {
        margin: auto;
        width: 100%;
        height: auto;
    }
</style>