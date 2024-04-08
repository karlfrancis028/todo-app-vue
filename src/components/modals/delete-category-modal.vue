<template>
  <modal-container>
    <div class="modal__body">
      <p>Are you sure you want to delete the category '<b>{{ data.category }}</b>'?</p>
      <br>
      <p>
        <b class="warning">NOTE</b>:<br> Deleting a category will result in the deletion of all tasks connected to that category.
        Once you pressed '<b>Yes</b>' there is no way of getting the data back.
      </p>
    </div>
    <div class="modal__footer">
      <button @click="deleteCategory"
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
    name: "delete-category-modal",
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
      deleteCategory() {
        this.$emit('confirm-category-deletion', this.data);
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