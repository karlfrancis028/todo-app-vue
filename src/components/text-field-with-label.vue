<template>
  <div class="text-field-with-label">
    <label>{{ label }}</label>
    <input type="text"
           :placeholder="fieldPlaceholder"
           :value="value"
           @input="updateInput($event.target.value)"/>
  </div>
</template>

<script>
  export default {
    name: "text-field-with-label",
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
  .text-field-with-label {
    @extend %flex-col;
    background-color: rgb(255, 255, 255);
    flex-grow: 1;
  }
</style>