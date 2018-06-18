<template>
<div class="credit-card-component">
  <div class="card-container">
    <input-fields />

    <img src="../assets/images/Chip.svg" class="img-chip" />

    <div class="block-color-icons" @click="isColorPaletteOpened = !isColorPaletteOpened">
      <img :src="colorIconImgUrl" class="color-icon" />
      <label class="icon_label">Edit Color</label>
    </div>
  </div>

</div>
</template>

<script>
import inputFields from './input-fields'

export default {
  name: 'credit-card',

  data () {
    return {
      isColorPaletteOpened: false
    }
  },

  components: {
    'input-fields': inputFields
  },

  computed: {
    colorIconImgUrl () {
      return this.isColorPaletteOpened
        ? require('../assets/images/close_icon.svg')
        : require('../assets/images/color_icon_active.svg')
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

  background: #F9F8F8;

  border-radius: 1.9rem;
  box-shadow: 0 0.9rem 1.9rem 0 rgba(78, 78, 78, 0.24),
    0 0.6rem 4.2rem 0 rgba(134, 134, 134, 0.19);
}

/*----- The chip -----*/
.img-chip {
  display: block;
  position: absolute;
  top: 9.6rem;
  left: 4.5rem;
  width: 9.6rem;
  height: 7.0rem;
}

.block-color-icons {
  position: absolute;
  top: 1.6rem;
  right: 2.4rem;
  width: 4.8rem;
  cursor: pointer;

  color: inherit;

  @media (min-width: 57em) {
    width: 4rem;
  }

  .color-icon {
    position: absolute;
    width: 100%;

    transition: 0.7s;

    filter: $z-depth-1;

    transition: 0.7s;

    &:hover {
      filter: $z-depth-3;
    }
  }

  .icon_label {
    position: absolute;
    top: 5.6rem;
    left: 50%;
    @include transform(translateX(-50%));
    cursor: pointer;

    font-family: Roboto;
    font-size: 1.2rem;
    color: inherit;
    white-space: nowrap;

    @media (min-width: 57em) {
      top: 4.6rem;
    }
  }
}
</style>
