<template>
  <one-col-layout @click:prev-btn="backToHome">
    <div slot="title">
      {{ computedTitle }}
    </div>
    <template slot="toolbar">
      <form-container @click:submit="addTodo">
        <text-field-with-label v-model="newTodo"/>
        <select v-if="hasChosenCategory" v-model="selectedCategory">
          <option value=""
                  disabled>
            Select a Category
          </option>
          <option v-for="category in categories"
                  :key="category.id"
                  :value="category.category">
            {{ category.category }}
          </option>
        </select>
      </form-container>
    </template>
    <template slot="content">
      <data-table />
    </template>
  </one-col-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { addTodo } from '@/mixins/todo-functions-mixin';
  export default {
    name: "TodoView",
    mixins: [addTodo],
    computed: {
      ...mapGetters({
        categories: 'getCategories',
      }),
      computedTitle() {
        return this.$route.query.category === 'All' ? 'Todos' : this.$route.query.category;
      },
      hasChosenCategory() {
        return this.$route.query.category.toLowerCase() === 'all';
      },
    },
    methods: {
      backToHome() {
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>