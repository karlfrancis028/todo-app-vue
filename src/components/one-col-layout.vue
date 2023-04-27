<template>
  <div class="one-col-layout">
    <header class="one-col-layout__header">
      <div :style="hideWhenRouteIsHome"
           @click="handleBackBtn"
           class="one-col-layout__header__btn">
        <ph-caret-left :size="24" weight="bold" />
        <p>
          BACK 
        </p>
      </div>
      <div class="one-col-layout__header__title">
        <slot name="title"></slot>
      </div>
      <div class="one-col-layout__header__ghost-space">
      </div>
    </header>
    <main class="one-col-layout__main">
      <slot name="content"></slot>
    </main>
  </div>
</template>

<script>
  import { PhCaretLeft } from "phosphor-vue";
  export default {
    name: "one-col-layout",
    components: {
      PhCaretLeft,
    },
    computed: {
      hideWhenRouteIsHome() {
        return this.$route.path === '/' ? 'opacity: 0' : '';
      }
    },
    methods: {
      handleBackBtn() {
        this.$emit('click:prev-btn');
      }
    }
  }
</script>

<style scoped lang="scss">
  .one-col-layout {
    max-width: 1024px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background: rgb(250, 250, 250);

    &__header {
      margin-bottom: 20px;
      flex-basis: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      &__btn {
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          & > p {
            color: rgb(90, 90, 90);
          }
        }
      }

      &__title {
        text-align: center;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 1.5rem;
      }

      &__ghost-space {
        opacity: 0;
      }

      &__title,
      &__btn,
      &__ghost-space {
        width: 33.3%;
      }
    }

    &__main {
      flex: 1;
      padding: 16px;
    }
  }
</style>