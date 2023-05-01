<template>
  <div class="circular-progress-bar">
    <svg viewBox="0 0 100 100"
         class="circular-progress-bar__svg">
      <circle cx="50" cy="50" r="40"
              class="circular-progress-bar__background"/>
      <circle cx="50" cy="50" r="40"
              class="circular-progress-bar__progress"
              :stroke-dasharray="(Math.PI * 2 * 40)"
              :stroke-dashoffset="(Math.PI * 2 * 40) * (1 - value / 100)"/>
    </svg>
    <div class="circular-progress-bar__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "circular-progress-bar",
    props: {
      completed: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 1,
      },
    },
    computed: {
      value() {
        return Math.round(this.completed / this.total * 100);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/scss/global.scss";
  
  .circular-progress-bar {
    --diameter: 180px;
    @extend %flex-col--center-xy;
    height: var(--diameter);
    width: var(--diameter);
    position: relative;

    &__svg {
      width: 100%;
      height: auto;
    }

    &__background {
      fill: none;
      stroke: #f2f2f2;
      stroke-width: 8;
    }

    &__progress {
      fill: none;
      stroke: color(warning);
      stroke-width: 8;
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: center;
      transition: stroke-dashoffset 0.5s ease-in-out;
    }

    &__content {
      @extend %flex-col--center-xy;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
