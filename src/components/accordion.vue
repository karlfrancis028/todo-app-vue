<template>
  <div class="accordion">
    <div class="accordion__title">
      <p>{{ title }}</p>
      <ph-caret-down :size="20" 
                     weight="bold"
                     @click="toggleAccordion"
                     v-if="isOpen == false"/>
      <ph-caret-up :size="20" 
                     weight="bold"
                     @click="toggleAccordion"
                     v-else/>
    </div>
    <div class="accordion__items"
         :class="computedAccordionItemsStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { PhCaretDown, PhCaretUp } from 'phosphor-vue';
  export default {
    name: "accordion",
    components: { PhCaretDown, PhCaretUp },
    data() {
      return {
        isOpen: true,
      }
    },
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    computed: {
      computedAccordionItemsStyle() {
        return this.isOpen == false ? 'closed' : '';
      }
    },
    methods: {
      toggleAccordion() {
        this.isOpen = !this.isOpen;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";
  .accordion {
    &__title {
      @extend %flex-row--center-y;
      gap: space(xs)-2;

      p {
        font-weight: 600;
      }

      svg {
        &:hover {
          transform: scale(1.25);
        }
      }
    }

    &__items {
      margin: space(xs) 0;
      max-height: 400px;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;

      &:hover {
        overflow-y: scroll;

        &::-webkit-scrollbar {
          width: 0;
        }
      }

      &.closed {
        max-height: 0;
        overflow: hidden;
      }
    }
  }
</style>