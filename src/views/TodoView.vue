<template>
  <one-col-layout @click:prev-btn="backToHome">
    <div slot="title">
      {{ computedTitle }}
    </div>
    <template slot="toolbar">
      <form-container @click:submit="addTodo">
        <text-field-with-label v-model="newTodo"/>
        <select v-model="selectedCategory">
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
import { mapActions, mapGetters } from 'vuex';
  export default {
    name: "TodoView",
    data() {
      return {
        newTodo: '',
        selectedCategory: '',
      }
    },
    computed: {
      ...mapGetters({
        categories: 'getCategories',
      }),
      computedTitle() {
        return this.$route.query.category === 'All' ? 'Todos' : this.$route.query.category;
      }
    },
    methods: {
      ...mapActions({
        addTask: 'addTodo',
      }),
      addTodo() {
        this.addTask({ todo: this.newTodo, category: this.selectedCategory});
        this.newTodo = '';
        this.selectedCategory = '';
      },
      backToHome() {
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>