<template>
  <div @click="handleClick"
       class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "card",
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  }
</script>

<style scoped lang="scss">
  .card {
    border-radius: 8px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
</style>