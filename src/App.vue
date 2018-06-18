<template>
  <div id="app">
    <credit-card />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
/* import fonts */
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import './assets/fonts/Courier/courier.css';
@import './assets/fonts/HelveticaNeue/HelveticaNeue.css';
@import './assets/fonts/OCRAExtended/OCRAExtended.css';

html {
  /* has known it does not work in Chinese Chrome */
  font-size: 62.5%;
}
</style>
