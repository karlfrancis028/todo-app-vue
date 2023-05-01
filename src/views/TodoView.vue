<template>
  <one-col-layout @click:prev-btn="backToHome">
    <div slot="title">
      {{ computedTitle }}
    </div>
    <template slot="toolbar">
      <input-field @click:submit="addTodo"/>
    </template>
    <template slot="content">
      <data-table />
    </template>
  </one-col-layout>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    name: "TodoView",
    computed: {
      computedTitle() {
        return this.$route.query.category === 'All' ? 'Todos' : this.$route.query.category;
      }
    },
    methods: {
      ...mapActions({
        addTask: 'addTodo',
      }),
      addTodo(value) {
        this.addTask(value);
      },
      backToHome() {
        this.$router.push('/');
      }
    }
  }
</script>