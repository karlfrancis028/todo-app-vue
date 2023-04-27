<template>
  <div class="data-table">
    <data-header />
    <data-item v-for="data in dataSet"
               :key="data.id"
               :data="data"
               @click:view-item="viewData(data)"
               @click:edit-item="editData(data)"
               @click:delete-item="deleteData(data)"/>
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
    methods: {
      viewData(data) {
        console.log(data);
      },
      editData(data) {
        console.log(data);
      },
      deleteData(data) {
        console.log(data);
      },
    }
  }
</script>

<style>

</style>