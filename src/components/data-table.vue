<template>
  <div class="data-table">
    <accordion v-for="option in $options.taskStatus"
               :key="option.id"
               :title="option.label">

      <data-item v-for="data in filteredDataSet(option.label)"
                 :key="data.id"
                 :data="data"
                 @click:view-item="handleData('view', data)"
                 @click:edit-item="handleData('edit', data)"
                 @click:delete-item="handleData('delete', data)"/>

    </accordion>
  </div>
  
</template>

<script>
  import { handleTodoData } from '@/mixins/todo-functions-mixin';
  
  export default {
    name: "data-table",
    mixins: [handleTodoData],
    data() {
      return {
        dataCategory: this.$route.query.category,
      }
    },
    computed: {
      dataSet() {
        return this.$store.getters.getSortedTodos(this.dataCategory);
      },
    },
    methods: {
      filteredDataSet(status) {
        return this.dataSet.filter(data => data.status === status);
      }
    },
    taskStatus: [
      { id: 1, label: 'Active' },
      { id: 2, label: 'Completed' },
    ]
  }
</script>

<style lang="scss" scoped>
  @import "~@/scss/global.scss";
</style>