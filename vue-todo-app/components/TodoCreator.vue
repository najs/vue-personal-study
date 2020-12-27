<template>
	<div>
		<button @click="createTodo">add</button>
		<input
			:value="title"
			:placeholder="placeholder"
			@input="title = $event.target.value"
			type="text"
			@keypress.enter="createTodo"
		/>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				title: '',
				placeholder:"할 일을 추가해주시어요!"
			}
		},
		methods: {
			createTodo () {
				const validatedTitle = this.title && this.title.trim();
				
				if (!validatedTitle) {
					alert('유효하지 않은 제목입니다.');
					this.title = this.title.trim();
					return
				}
				this.$emit('create-todo', this.title);
				this.title = ''
			}
		}
	}
</script>

<style scoped>

</style>