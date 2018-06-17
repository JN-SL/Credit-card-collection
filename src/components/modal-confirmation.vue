<template>
</template>

<script>
</script>

<style lang="scss" scoped>
.modal-confirmation {
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 3;

  background: #f5f5f5;
  text-align: center;
  opacity: 0;

  padding: 94px 0 0 0;

  border-radius: 19px;

  transition: 0.5s;

  &.confirmationFadeIn {
    visibility: visible;
    opacity: 1;
  }

  .img-confirmation {
    display: block;
    width: 78px;

    opacity: 0;

    margin: 0 auto 16px auto;

    transition: 0.3s;

    &.confirmationFadeIn {
      opacity: 1;
      transition-delay: 0.35s;
    }
  }

  h1 {
    font-family: HelveticaNeue-Medium;
    font-size: 32px;
    font-weight: 500;
    color: #121111;
    opacity: 0;

    margin: 0;
    margin-bottom: 2px;

    transition: 0.3s;

    &.confirmationFadeIn {
      opacity: 1;
      transition-delay: 0.65s;
    }
  }

  h2 {
    font-family: HelveticaNeue-Light;
    font-size: 24px;
    font-weight: 300;
    color: #121111;
    opacity: 0;

    margin: 0;

    transition: 0.3s;

    &.confirmationFadeIn {
      opacity: 1;
      transition-delay: 0.8s;
    }
  }
}
</style>