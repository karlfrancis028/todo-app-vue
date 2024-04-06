<template>
  <div class="select-with-label-and-error">
    <label>{{ label }}</label>
    <select :class="{ error: error }" 
            :value="value"
            @change="updateInput">
      <option value="">
        {{ placeholder }}
      </option>
      <slot></slot>
    </select>
    <label error>{{ errorMessage }}</label>
  </div>
</template>

<script>
  export default {
    name: 'select-with-label-and-error',
    props: {
      label: {
        type: String,
        default: 'Select Category',
      },
      placeholder: {
        type: String,
        default: 'Select a Category'
      },
      value: {
        type: String,
        required: true,
      },
      error: {
        type: Boolean,
        default: false,
      },
      errorMessage: {
        type: String,
        default: '',
      },
    },
    methods: {
      updateInput(event) {
        const val = event.target.value;
        this.$emit('input', val);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";
  .select-with-label-and-error {
    @extend %flex-col;
    background-color: rgb(255, 255, 255);
    flex-grow: 1;
  }
</style>