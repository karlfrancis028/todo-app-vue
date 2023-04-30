<template>
  <one-col-layout>
    <div slot="title">
      Todo App
    </div>
    <template slot="toolbar">
      <input-field :input-value="newTodo"
                   @click:submit="addTodo"/>
    </template>
    <template slot="content">
      <data-table />
    </template>
  </one-col-layout>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    name: "HomeView",
    data() {
      return {
        newTodo: '',
      }
    },
    methods: {
      ...mapActions({
        addTask: 'addTodo',
      }),
      addTodo(value) {
        this.addTask(value);
      }
    }
  }
</script>