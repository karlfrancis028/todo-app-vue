<template>
  <div class="loading-blocker">
    <div class="loading-blocker__container">
      <div class="loading-blocker__circle"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading-blocker',
  }
</script>

<style lang="scss">
  @import "~@/scss/global.scss";

  .loading-blocker {
    @extend %flex-row--center-xy;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: rgba(139, 139, 139, 0.267);

    &__container {
      position: relative;
      width: 300px;
    }

    &__circle {
      --circumference: 300px;
      position: unset;
      width: var(--circumference);
      height: var(--circumference);
      border-radius: 50%;
      border: 45px solid transparent;
      border-top-color: color(primary);
      -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
      animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
    }
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: rotate(0deg); /* IE 9 */
      transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
    }

    100% {
      -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: rotate(360deg); /* IE 9 */
      transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: rotate(0deg); /* IE 9 */
      transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
    }

    100% {
      -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: rotate(360deg); /* IE 9 */
      transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
    }
  }

</style>