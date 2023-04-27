<template>
  <div class="data-table">
    <data-item v-for="data in dataSet"
               :key="data.id"
               :data="data"
               @view-item="viewData"
               @edit-item="editData"
               @delete-item="deleteData"/>
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
      viewData() {
        this.$emit("click:view-item");
      },
      editData() {
        this.$emit("click:edit-item");
      },
      deleteData() {
        this.$emit("click:delete-item");
      },
    }
  }
</script>

<style>

</style>