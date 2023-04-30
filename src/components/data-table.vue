<template>
  <div class="data-table">
    <data-item v-for="data in dataSet"
               :key="data.id"
               :data="data"
               @click:view-item="handleData('view', data)"
               @click:edit-item="handleData('edit', data)"
               @click:delete-item="handleData('delete', data)"/>
  </div>
  
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ViewTodoModal from './modals/view-todo-modal';
  import EditTodoModal from './modals/edit-todo-modal';
  import DeleteTodoModal from './modals/delete-todo-modal';
  
  export default {
    name: "data-table",
    computed: {
      ...mapGetters({
        dataSet: 'getSortedTodos',
      }),
    },
    methods: {
      ...mapActions({
        deleteTodo: 'deleteTodo',
        editTodo: 'editTodo',
      }),
      handleData(action, data) {
        switch (action) {
          case 'view':
            this.$modal.open({
              component: ViewTodoModal,
              props: {
                data: data,
              }
            });
            break;
          case 'edit':
            this.$modal.open({
              component: EditTodoModal,
              props: {
                data: data,
              },
              events: {
                'confirm-todo-editing': (newTodo, todoId) => {
                  this.editTodo({newTodo, todoId});
                }
              }
            })
            break;
          case 'delete':
            this.$modal.open({
              component: DeleteTodoModal,
              props: {
                data: data,
              },
              events: {
                'confirm-todo-deletion': (todoId) => {
                  this.deleteTodo(todoId);
                }
              }
            });
            break;
          default:
            break;
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .data-table {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>