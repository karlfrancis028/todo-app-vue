<template>
  <modal-container>
    <div class="modal__body">
      <form-container @click:submit="editTask" 
                      for-editing>
        <input-with-label-and-error label="Edit Todo"
                                    v-model="currentTodo"/>
        <select-with-label-and-error v-model="currentCategory">
          <option v-for="category in categories"
                  :key="category.id"
                  :value="category.category">
            {{ category.category }}
          </option>
        </select-with-label-and-error>
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
      categories: {
        type: Array,
        default: () => [],
      },
    },
    mounted() {
      this.currentTodo = this.data.todo;
      this.currentCategory = this.data.category;
    },
    methods: {
      editTask() {
        this.$emit('confirm-todo-editing', this.currentTodo, this.data.id, this.currentCategory);
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