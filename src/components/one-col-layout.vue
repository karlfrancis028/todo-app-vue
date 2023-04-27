<template>
  <div class="one-col-layout">
    <header class="one-col-layout__header">
      <slot name="header"></slot>
    </header>
    <main class="one-col-layout__main">
      <slot name="content"></slot>
    </main>
  </div>
</template>

<script>
  export default {
    name: "one-col-layout",
  }
</script>

<style scoped lang="scss">
  .one-col-layout {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;

    &__header {
      margin-bottom: 20px;
    }
  }
</style>