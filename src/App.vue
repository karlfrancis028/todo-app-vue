<template>
  <div id="app">
    <loading-blocker v-if="isLoading"
                     loading-message="Loading... Please wait."/>
    <router-view v-else/>
  </div>
</template>

<script>
  import { fetchData } from '@/mixins/todo-functions-mixin';
  import { mapGetters } from 'vuex';
  export default {
    mixins: [fetchData],
    computed: {
      ...mapGetters({
        isLoading: 'getLoadingState',
      }),
    }
  }
</script>

<style lang="scss">
  #app {
    position: relative;
    min-height: 100vh;
  }
</style>