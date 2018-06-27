<template>
<div class="credit-card-component">
  <div :class="['card-container', {bringToFront: isColorPaletteOpened}]" :style="themeStyle">
    <card-background :currentTheme="currentTheme" />

    <input-fields />

    <img src="../assets/images/Chip.svg" class="img-chip" />

    <color-palette
      :options="colorPaletteOptions"
      :is-color-palette-opened.sync="isColorPaletteOpened"
      :current-theme-id.sync="currentThemeId" />
  </div>

  <div :class="['mask', {in: isColorPaletteOpened}]"></div>
</div>
</template>

<script>
// import components
import cardBackground from './card-background'
import inputFields from './input-fields'
import colorPalette from './color-palette'

// import mock data
import availableThemes from './availableThemes.js'

export default {
  name: 'credit-card',

  data () {
    return {
      isColorPaletteOpened: false,
      availableThemes: [],
      currentThemeId: ''
    }
  },

  components: {
    'card-background': cardBackground,
    'input-fields': inputFields,
    'color-palette': colorPalette
  },

  created () {
    // initialize
    // should change to ajax calls or other data sources in your practical applications
    this.availableThemes = availableThemes
  },

  computed: {
    colorPaletteOptions () {
      return {
        isColorPaletteOpened: this.isColorPaletteOpened,
        availableThemes: this.availableThemes,
        currentThemeId: this.currentThemeId
      }
    },
    currentTheme () {
      return this.availableThemes.filter(theme => theme.id === this.currentThemeId)[0]
    },
    themeStyle () {
      if (this.currentTheme) {
        return {
          color: this.currentTheme.fontColor
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./global-variables";
@import "./browser-compatibility";

.credit-card-component {
  position: relative;
  width: 57.0rem;
  height: 36.0rem;
  z-index: 0;

  margin: 0 auto;

  transition: z-index 0.7s step-end;
}

.card-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  background: '#F9F8F8';

  border-radius: 1.9rem;
  box-shadow: 0 0.9rem 1.9rem 0 rgba(78, 78, 78, 0.24),
    0 0.6rem 4.2rem 0 rgba(134, 134, 134, 0.19);

  &.bringToFront {
    z-index: 1000;
  }
}

.img-chip {
  position: absolute;
  top: 9.6rem;
  left: 4.5rem;
  width: 9.6rem;
  height: 7.0rem;
}

.mask {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;

  background: rgba(241,240,240, 0.9);

  &.in {
    visibility: visible;
  }
}
</style>
