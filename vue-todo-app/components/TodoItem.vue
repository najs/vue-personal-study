<template>
	<div
		:class="{ done : done }"
		class="todo-item"
	>
		
		<div
			v-if="isEditMode"
			class="item__inner item--edit">
			<input
				ref="titleInput"
				:value="editedTItle"
				type="text"
				@input="editedTItle = $event.target.value"
				@keypress.enter="editedTodo"
				@keypress.esc="offEditMode"
			/>
			<div class="item__actions">
				<button
					class="btn btn--primary"
					key="complete"
					@click="editedTodo">
					<i class="material-icons">done</i>
				</button>
				<button
					class="btn"
					key="cancel"
					@click="offEditMode">
					<i class="material-icons">clear</i>
				</button>
			</div>
		</div>
		
		<div
			v-else
			class="item__inner item--normal"
		>
			
			<label>
				<input
					v-model="done"
					type="checkbox"
				/>
				<span class="icon"><i class="material-icons">check</i></span>
			</label>
			<div class="item__title-wrap">
				<div class="item__title">
					{{ todo.title }}
				</div>
				<div class="item__date">
					{{ date }}
				</div>
			</div>
			<div class="item__actions">
				<button
					class="btn"
					key="update"
					@click="onEditMode">
					<i class="material-icons">edit</i>
				</button>
				<button
					class="btn btn--danger"
					key="delete"
					@click="deleteTodo">
					<i class="material-icons">delete</i>
				</button>
			</div>
		
		</div>
		
		
	</div>
</template>

<script>
	import dayjs from 'dayjs'
	
	
	export default {
		name:"TodoItem",
		props:{
			todo: Object
		},
		data (){
			return {
				isEditMode: false,
				editedTItle: ''
			}
			
		},
		computed: {
			done: {
				get () {
					return this.todo.done
				},
				set (done) {
					this.updateTodo({
						done
					})
				}
			},
			date () {
				const date = dayjs(this.todo.createdAt);
				const isSame = date.isSame(this.todo.updatedAt);
				
				if(isSame) {
					return date.format('YYYY년 MM월 DD일')
				} else {
					return `${date.format('YYYY년 MM월 DD일')} (edited)`
				}
			}
		},
		methods: {
			editedTodo(){
				if (this.title !== this.editedTItle) {
					this.updateTodo({
						title: this.editedTItle,
						updatedAt: new Date()
					});
					this.offEditMode()
				}
			},
			onEditMode(){
				this.isEditMode = true;
				this.editedTItle = this.todo.title;
				//Vue.js가 데이터 변경 후 DOM 업데이트를 마칠 때까지 기다림.
				this.$nextTick(() => {
					this.$refs.titleInput.focus()
				})
			},
			offEditMode(){
				this.isEditMode = false;
			},
			updateTodo(value){
				this.$emit('update-todo', this.todo, value)
			},
			deleteTodo(){
				this.$emit('delete-todo', this.todo)
			}
		}
	}
</script>

<style scoped lang="scss">
/*.todo-item{
	margin-bottom:10px;
	.item__inner{
		display:flex;
	}
	.item__date{
		font-size:12px;
	}
	&.done{
		.item__title{
			text-decoration:line-through;
		}
	}
}*/
</style>