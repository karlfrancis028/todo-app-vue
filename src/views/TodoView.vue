<template>
  <one-col-layout @click:prev-btn="backToHome" class="todo">
    <div slot="title">
      {{ computedTitle }}
    </div>
    <template slot="toolbar">
      <form-container @click:submit="addTodo">
        <input-with-label-and-error v-model="newTodo" 
                                    :error="error" 
                                    :error-message="errorMessage"/>
        <select-with-label-and-error v-if="hasChosenCategory"
                                     v-model="selectedCategory"
                                     :error="categoryError"
                                     :error-message="categoryErrorMessage">
          <option v-for="category in categories"
                  :key="category.id"
                  :value="category.category">
            {{ category.category }}
          </option>
        </select-with-label-and-error>
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

<style lang="scss">
  @import "~@/scss/global.scss";

  .todo {
    .one-col-layout {
      &__main {
        background: rgb(238, 237, 237);
        border-radius: 10px;
      }
    }
  }
</style>