<template>
  <div class="one-col-layout">
    <header class="one-col-layout__header"
            :class="hasBackBtn">
      <div @click="handleBackBtn"
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
    <div class="one-col-layout__toolbar">
      <slot name="toolbar"></slot>
    </div>
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
      hasBackBtn() {
        return this.$route.path === '/' ? 'no-back' : '';
      },
    },
    methods: {
      handleBackBtn() {
        this.$emit('click:prev-btn');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";

  .one-col-layout {
    @extend %flex-col;
    max-width: 1366px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: space(m);
    gap: space(s);

    &__header {
      @extend %flex-row--center-xy;

      &__btn {
        @extend %flex-row--center-y;
        cursor: pointer;
        width: 33.3%;

        &:hover {
          & > p {
            color: rgb(90, 90, 90);
          }
        }
      }

      &.no-back {
        @extend %flex-row--center-xy;

        .one-col-layout__header__title {
          width: 100%;
        }
        
        .one-col-layout__header__btn {
          display: none;
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

    &__toolbar {
      display: flex;
      flex-direction: column;
      gap: space(m);
    }

    &__main {
      flex: 1;
      padding: space(base);
    }
  }
</style>