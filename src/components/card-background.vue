<template>
<div class="card-background" :style="cardStyle"></div>
</template>

<script>
export default {
  name: 'cardBackground',

  props: ['currentTheme'],

  computed: {
    cardStyle () {
      // a theme is seleted
      if (this.currentTheme) {
        switch (this.currentTheme.type) {
          case 'image':
            return {
              background: 'url(' + this.currentTheme.cardTheme + ') 0% 0% / 100% 100%'
            }
          case 'css':
            return {
              background: this.currentTheme.cardTheme
            }
          default:
            break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-background {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
