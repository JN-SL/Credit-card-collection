<template>
<div class="color-palette-component">
  <img :src="colorIconImgUrl" class="color-icon" @click="toggleColorPalette" />
  <label class="icon_label">Edit Color</label>

  <div class="dots-container" v-show="isDotContainerOpened">
    <div
      v-for="(theme, index) in availableThemes" :key="theme.id"
      :class="['color-dot', 'z-depth-2', {fade: isColorDotsFade}, {selected: theme.id === currentThemeId}]"
      :style="dotStyles[index]"
      @click="setTheme(theme.id, index)"
    ></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'color-palette',

  data () {
    return {
      // UI control
      isColorPaletteOpened: false,
      isDotContainerOpened: false,
      isColorDotsFade: true,

      availableThemes: this.options.availableThemes,
      dotStyles: [],
      currentThemeId: this.options.currentThemeId
    }
  },

  created () {
    // initialize dots' styles
    for (let i = 0; i < this.availableThemes.length; i++) {
      this.dotStyles.push({
        background: this.availableThemes[i].dotColor
      })
    }
  },

  props: ['options'],

  computed: {
    colorIconImgUrl () {
      return this.isColorPaletteOpened
        ? require('../assets/images/close_icon.svg')
        : require('../assets/images/color_icon_active.svg')
    }
  },

  methods: {
    toggleColorPalette () {
      this.isColorPaletteOpened = !this.isColorPaletteOpened

      this.$emit('update:isColorPaletteOpened', this.isColorPaletteOpened)
    },
    setTheme (themeId, selectedIndex) {
      // reset dots' colors
      this.dotStyles = this.dotStyles.map((dotStyle, index) => {
        return {background: this.availableThemes[index].dotColor}
      })
      // set the selected dot with actived color
      this.dotStyles[selectedIndex].background = this.availableThemes[selectedIndex].dotActiveColor

      // set card theme
      this.currentThemeId = themeId
      this.$emit('update:currentThemeId', themeId)
    }
  },

  watch: {
    isColorPaletteOpened: function (value) {
      if (value) {
        // if opened
        this.isDotContainerOpened = value
        // delay color dots fading in
        setTimeout(() => {
          this.isColorDotsFade = !value
        }, 10)
      } else {
        // if closed
        this.isColorDotsFade = !value
        // delay dotContainer closing
        setTimeout(() => {
          this.isDotContainerOpened = value
        }, 525)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./global-variables";
@import "./browser-compatibility";

$color-dot-size: 6.4rem;
$dot-fadeIn-delay: 75ms;

.color-palette-component {
  @include display-flex;
  @include flex-direction(column);
  @include align-items(center);
  position: absolute;
  top: 1.6rem;
  right: 2.4rem;
  width: 4.8rem;
  cursor: pointer;

  color: inherit;
}

.color-icon {
  width: 100%;

  transition: 0.7s;

  @include z-depth-1;

  transition: 0.7s;

  &:hover {
    @include z-depth-3;
  }
}

.icon_label {
  cursor: pointer;

  font-family: Roboto;
  font-size: 1.2rem;
  color: inherit;
  white-space: nowrap;

  padding: 0.8rem;

  @media (min-width: 57em) {
    top: 4.6rem;
  }
}

.dots-container {
  @include display-flex;
  @include flex-direction(column);
  @include justify-content(space-between);
  height: $color-dot-size * 3 + 3.2rem;
}

.color-dot {
  width: $color-dot-size;
  height: $color-dot-size;
  box-sizing: border-box;
  cursor: pointer;

  background: #4a4a4a;
  opacity: 1;

  border-radius: 50%;
  margin: 0 auto;

  transition: 0.1s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

  &.selected {
    transform: scale(1.1);
  }

  // animation fade-in
  &.fade {
    opacity: 0;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}n) {
        @include transform(translateY(-100% * $i));
        transition-delay: $dot-fadeIn-delay * $i;
      }
    }
  }
}
</style>
