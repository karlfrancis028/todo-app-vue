<template>
  <modal-container>
    <div class="modal__body">
      <p>Are you sure you want to delete the todo '<b>{{ data.todo }}</b>'?</p>
      <br>
      <p>
        <b class="warning">NOTE</b>: Once you pressed '<b>Yes</b>' there is no way of getting the data back.
      </p>
    </div>
    <div class="modal__footer">
      <button @click="deleteTask"
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
  export default {
    name: "delete-todo-modal",
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
      deleteTask() {
        this.$emit('confirm-todo-deletion', this.data.id);
        this.closeModal();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";

  .modal__body {

    .warning {
      color: color(warning);
    }
  }

  .modal__footer {
    @extend %flex-row--around;

    button {
      color: black;
    }
  }
</style>