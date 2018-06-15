<template>
	<div>
		<div id="editor">
			<mavonEditor :value="content" default_open="edit" @change="change" style="height: 100%"></mavonEditor>
		</div>
	</div>
</template>;

<script>
	import qs from 'qs';
	import { mavonEditor } from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	export default {
		name: 'MavonEditor',
		data () {
			return {
		  	 	editorMkContent: this.content,
		  	 	editorContent: '',
			}
		},
		components: {
        	mavonEditor
      	},
      	methods: {
      		change (val, render) {	// render-html  val-markdown
      			this.editorContent = render;
      			this.editorMkContent = val;
      			this.$emit('editContent', {content: render, contentMk: val});
      		},
      	},
      	props: ['content'],
	}
</script>
<style>
    #editor {
        margin: auto;
        width: 100%;
        height: 500px;
    }
</style>