<template>
  <div class="data-item">
    {{ data }}
  </div>
</template>

<script>
  export default {
    name: "data-item",
    props: {
      data: {
        type: Object,
        default: () => {}
      },
    },
  }
</script>

<style>

</style>