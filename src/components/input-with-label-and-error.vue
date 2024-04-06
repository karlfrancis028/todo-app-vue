<template>
  <div class="input-with-label-and-error">
    <label>{{ label }}</label>
    <input type="text"
           :placeholder="fieldPlaceholder"
           :value="value"
           :class="{ error: error }"
           @input="updateInput($event.target.value)"/>
    <label error>{{ errorMessage }}</label>
  </div>
</template>

<script>
  export default {
    name: "input-with-label-and-error",
    props: {
      label: {
        type: String,
        default: 'Add Todo',
      },
      fieldPlaceholder: {
        type: String,
        default: 'Add a New Todo'
      },
      value: {
        type: String,
        default: ''
      },
      error: {
        type: Boolean,
        default: false,
      },
      errorMessage: {
        type: String,
      }
    },
    methods: {
      updateInput(value) {
        this.$emit('input', value);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";
  .input-with-label-and-error {
    @extend %flex-col;
    background-color: rgb(255, 255, 255);
    flex-grow: 1;
  }
</style>