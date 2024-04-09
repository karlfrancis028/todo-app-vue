<template>
  <div class="loading-blocker">
    <div class="loading-blocker__container">
      <div class="loading-blocker__circle"></div>
      <div v-if="loadingMessage" class="loading-blocker__message">
        <p>{{ loadingMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading-blocker',
    props: {
      loadingMessage: {
        type: String,
        default: null,
      },
    },
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
      width: 300px;

      @media only screen and (max-width: 400px) {
        width: 250px;
      }
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

      @media only screen and (max-width: 400px) {
        --circumference: 250px;
      }
    }

    &__message {
      text-align: center;
      margin-top: space(base);

      p {
        font-size: font(l);
        font-weight: font(medium);

        @media only screen and (max-width: 400px) {
          font-size: font(m);
          font-weight: font(medium);
        }
      }
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