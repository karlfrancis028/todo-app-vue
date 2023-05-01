<template>
  <modal-container>
    <div class="modal__body">
      <input-field label="Todo"
                   field-placeholder="Edit todo"
                   :initial-value="data.todo"
                   @click:submit="editTask"
                   for-editing
                   button-text="Edit"/>
    </div>
  </modal-container>
</template>

<script>
  export default {
    name: "edit-todo-modal",
    data() {
      return {
        newTodo: '',
      }
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      closeModal() {
        this.$modal.close();
      },
      editTask(newTodo) {
        this.$emit('confirm-todo-editing', newTodo, this.data.id);
        this.closeModal();
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