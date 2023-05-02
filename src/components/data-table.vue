<template>
  <div class="data-table">
    <data-item v-for="data in dataSet"
               :key="data.id"
               :data="data"
               @click:view-item="handleData('view', data)"
               @click:edit-item="handleData('edit', data)"
               @click:delete-item="handleData('delete', data)"/>
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
  }
</script>

<style lang="scss" scoped>
  @import "~@/scss/global.scss";

  .data-table {
    @extend %flex-col;
    gap: space(xs);
  }
</style>