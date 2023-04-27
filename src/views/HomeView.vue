<template>
  <one-col-layout>
    <div slot="title">
      Todo App
    </div>
    <template slot="content">
      <data-table :data-set="$options.todoData"/>
    </template>
  </one-col-layout>
</template>

<script>
  export default {
    name: "HomeView",
    todoData: [
      {
        id: 1,
        todo: 'Wash dishes',
        status: 'Completed',
      },
      {
        id: 2,
        todo: 'Play valorant',
        status: 'Active',
      },
      {
        id: 3,
        todo: 'Read books',
        status: 'Active',
      },
    ]
  }
</script>

<style>

</style>