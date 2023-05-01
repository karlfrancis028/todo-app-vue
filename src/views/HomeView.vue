<template>
  <one-col-layout>
    <div slot="title">
      My Todo App
    </div>
    <template slot="content">
      <div class="home-view__content__title">
        <p>These are your todo list</p>
      </div>
      <div class="home-view__content__cards">
        <card v-for="category in categories"
              :key="category.id" 
              class="home-view__content__cards__card">
          <b>{{ category.category }}</b>
          <p>{{ getCategoryTaskCount(category.category) }} Task/s</p>
        </card>
      </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    </template>
  </one-col-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "HomeView",
    computed: {
      ...mapGetters({
        dataSet: 'getTodos',
        categories: 'getCategories',
      }),
    },
    methods: {
      getCategoryTaskCount(category) {
        return this.dataSet.filter(data => data.category === category).length;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";
  .home-view {

    &__content {

      &__title {

        & > p {
          font-size: 1.25rem;
          text-align: center;
          font-weight: 500 ;
        }
      }

      &__cards {
        display: grid;
        grid-template-columns: repeat(2, 300px);
        justify-content: center;
        align-items: center;
        grid-gap: 30px;
        padding: space(xl);

        &__card {
          padding: space(xl);
          height: 200px;

          & > b {
            font-size: 1.25rem;
            font-weight: 700;
          }
        }
      }
    }
  }
</style>