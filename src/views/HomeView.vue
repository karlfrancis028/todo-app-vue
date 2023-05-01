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
          <p>{{ getCategoryTaskCount(category.category) }}</p>
        </card>
        <card class="home-view__content__cards__card home-view__content__cards__card-add">
          <ph-plus :size="40" weight="bold" class="icon" />
          <b>Add Category</b>
        </card>
      </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    </template>
  </one-col-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { PhPlus } from 'phosphor-vue';

  export default {
    name: "HomeView",
    components: {
      PhPlus,
    },
    computed: {
      ...mapGetters({
        dataSet: 'getTodos',
        categories: 'getCategories',
      }),
    },
    methods: {
      getCategoryTaskCount(category) {
        const getTaskCountPerCategory = this.dataSet.filter(data => data.category === category);

        return getTaskCountPerCategory.length === 1 ?
               `${getTaskCountPerCategory.length} task` :
               `${getTaskCountPerCategory.length} tasks`
      },
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

          &:hover {
            background-color: #f2f2f2;
          }

          & > b {
            font-size: 1.25rem;
            font-weight: 700;
          }
        }

        &__card-add {
          @extend %flex-col--center-xy;
          gap: space(xs);
          background-color: color(primary);
          color: #fff;

          &:hover {
            background-color: color(primary-hover);
          }
        }
      }
    }
  }
</style>