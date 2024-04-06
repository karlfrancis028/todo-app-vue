<template>
  <modal-container>
    <div class="modal__body">
      <div class="modal__body__col">
        <div>
          <h4>ID</h4>
          <p>{{ data.id }}</p>
        </div>
        <div>
          <h4>Task</h4>
          <p>{{ data.todo }}</p>
        </div>
        <div>
          <h4>Category</h4>
          <p>{{ data.category }}</p>
        </div>
        <div>
          <h4>Status</h4>
          <p>{{ data.status }}</p>
        </div>
      </div>
    </div>
    <div class="modal__footer">
      <button @click="closeModal">Close</button>
    </div>
  </modal-container>
</template>

<script>
  export default {
    name: "view-todo-modal",
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      closeModal() {
        this.$modal.close();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";

  .modal__body {
    @extend %flex-row--between;

    &__col {
      @extend %flex-col;
      gap: space(s);
      flex-basis: 50%;

      & > div {
        & > h4 {
          color: rgb(37, 37, 37);
          font-weight: 600;
          font-size: 1.25rem;
        }

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
    }
  }

  .modal__footer {
    @extend %flex-row--end;
    
    button {
      color: black;
    }
  }
</style>