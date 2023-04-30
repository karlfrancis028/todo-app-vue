<template>
  <input type="checkbox"
         :checked="isTaskComplete(status)"
         @click.stop="toggleStatus(status)" />
</template>

<script>
  export default {
    name: "checkbox",
    props: {
      status: {
        type: String,
        default: null,
      },
    },
    methods: {
      isTaskComplete(status) {
        return status === 'Completed';
      },
      toggleStatus(status) {
        this.$emit('click', status);
      }
    }
  }
</script>

<style scoped lang="scss">
  input[type=checkbox] {
    appearance: none;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border: 2px solid gray;
    border-radius: 4px;
    display: inline-block;
    vertical-align: middle;
    position: relative;

    &:checked {
      background-color: #58da92;
      border-color: #58da92;

      &::before {
        transform: scale(1);
      }
    }

    &::before {
      position: absolute;
      content: '\2713';
      font-size: 46px;
      line-height: 15px;
      color: #000;
      transform: scale(0);
      transition: 0.3s all ease-in-out;
    }
  }
</style>