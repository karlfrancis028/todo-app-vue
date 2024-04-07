<template>
  <modal-container>
    <div class="modal__body">
      <form-container @click:submit="editTask" 
                      for-editing>
        <input-with-label-and-error label="Edit Todo"
                                    v-model="currentTodo"/>
      </form-container>
    </div>
  </modal-container>
</template>

<script>
  export default {
    name: "edit-todo-modal",
    data() {
      return {
        currentTodo: '',
        currentCategory: null,
      }
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      this.currentTodo = this.data.todo;
      this.currentCategory = this.data.category;
    },
    methods: {
      editTask() {
        this.$emit('confirm-todo-editing', this.currentTodo, this.data.id);
        this.$modal.close();
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";

  .modal__footer {
    @extend %flex-row--around;
  }
</style>