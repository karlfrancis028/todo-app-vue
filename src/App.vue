<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { fetchData } from '@/mixins/todo-functions-mixin';
  export default {
    mixins: [fetchData],
  }
</script>