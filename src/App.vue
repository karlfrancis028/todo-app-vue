<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    mounted() {
      this.fetchTodos();
      this.fetchCategories();
    },
    methods: {
      ...mapActions({ 
        fetchTodos: 'fetchTodos',
        fetchCategories: 'fetchTodoCategories',
      })
    }
  }
</script>