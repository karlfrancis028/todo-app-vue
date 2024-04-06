<template>
  <form @submit.prevent="onSubmit"
        @keydown.enter="onSubmit"
        class="form-container">
    <div class="form-container__controls">
      <slot></slot>
    </div>
    <div class="form-container__actions"
         :class="{ 'for-editing' : forEditing }">
      <button type="submit">{{ submitText }}</button>
      <button v-if="forEditing"
              type="button"
              @click="closeModal">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
  export default {
    name: "form-container",
    props: {
      submitText: {
        type: String,
        default: 'Submit',
      },
      forEditing: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onSubmit() {
        this.$emit('click:submit');
      },
      closeModal() {
        this.$modal.close();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";

  .form-container {
    @extend %flex-col;
    gap: space(base);
    padding: space(xs) space(base);
    
    &__controls {
      @extend %flex-col;
      gap: space(base);
    }

    &__actions {
      @extend %flex-row--end;
      
      button {

        &[type=submit] {
          background-color: color(primary);

          &:hover {
            background-color: color(primary-hover);
          }
        }

        &[type=button] {
          background-color: color(warning);

          &:hover {
            background-color: color(warning-hover);
          }
        }
      }

      &.for-editing {
        @extend %flex-row--between;
      }
    }
  }
</style>