<template>
  <modal-container>
    <div class="modal__body">
      <div>
        <h4>ID</h4>
        <p>{{ data.id }}</p>
      </div>
      <div>
        <h4>Task</h4>
        <p>{{ data.todo }}</p>
      </div>
      <div>
        <h4>Status</h4>
        <p>{{ data.status }}</p>
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
  .modal__body {
    display: flex;
    flex-direction: column;
    
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

  .modal__footer {
    justify-content: flex-end;
  }
</style>