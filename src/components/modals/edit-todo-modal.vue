<template>
  <modal-container>
    <div class="modal__body">
      <form-container @click:submit="editTask" 
                      for-editing>
        <input-with-label-and-error label="Edit Todo"
                                    v-model="newTodo"/>
      </form-container>
    </div>
  </modal-container>
</template>

<script>
  export default {
    name: "edit-todo-modal",
    data() {
      return {
        newTodo: '',
        selectedCategory: this.data.category,
      }
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      this.newTodo = this.data.todo;
    },
    methods: {
      editTask() {
        this.$emit('confirm-todo-editing', this.newTodo, this.data.id);
        this.$modal.close();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";

  .modal__footer {
    @extend %flex-row--around;
  }
</style>