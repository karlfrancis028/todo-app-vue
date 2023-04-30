<template>
  <div v-if="$modal.isOpen" 
       class="modal">
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "modal-container",
  }
</script>

<style scoped lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.158);
    display: flex;
    align-items: center;
    justify-content: center;

    &__content {
      position: relative;
      padding: 20px;
      background-color: #fff;
      max-width: 500px;
      width: 90%;
      border-radius: 8px;
    }

    &__body {
      padding: 0 10px;
      margin: 10px 0;
    }

    &__footer {
      display: flex;

      & > button {
        font-size: 1.1rem;
        background-color: transparent;
        border: none;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          color: rgb(91, 91, 91);
        }
      }
    }
  }
</style>