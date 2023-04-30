<template>
  <modal-container>
    <div class="modal__body">
      <p>Are you sure you want to delete '<b>{{ data.todo }}</b>' with an id of <b>{{ data.id }}</b> ?</p>
      <br>
      <p><b>NOTE</b>: Once you pressed '<b>Yes</b>' there is no way of getting the data back.</p>
    </div>
    <div class="modal__footer">
      <button @click="deleteTask(data.id)"
              type="button">
        Yes
      </button>
      <button @click="closeModal"
              type="button">
        No
      </button>
    </div>
  </modal-container>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: "delete-todo-modal",
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      ...mapActions({
        deleteTodo: "deleteTodo",
      }),
      closeModal() {
        this.$modal.close();
      },
      deleteTask(todoId) {
        this.$emit('confirm-todo-deletion', todoId);
        this.closeModal();
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal__footer {
    justify-content: space-around;
  }
</style>