<template>
  <div class="data-table">
    <data-item v-for="data in dataSet"
               :key="data.id"
               :data="data"/>
  </div>
</template>

<script>
  export default {
    name: "data-table",
    props: {
      dataSet: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>

<style>

</style>