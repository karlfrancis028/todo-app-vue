<template>
  <modal-container>
    <div class="modal__body">
      <form-container @click:submit="editTask" 
                      for-editing>
        <text-field-with-label label="Edit Todo"
                               v-model="data.todo"/>
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
    methods: {
      editTask() {
        this.$emit('confirm-todo-editing', this.data.todo, this.data.id);
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