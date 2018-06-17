<template>
<div class="credit-card-component">
  <div class="card-container">
    <img src="../assets/images/Chip.svg" class="img-chip" />

    <div class="block-color-icons">
      <img src="../assets/images/color_icon_inactive.svg" class="color-icon iInactive" />
      <img src="../assets/images/color_icon_active.svg" class="color-icon iActive" />
      <img src="../assets/images/close_icon.svg" class="close_icon" />
      <label class="icon_label">Edit Color</label>
    </div>

    <input-fields />
  </div>

</div>
</template>

<script>
import inputFields from './input-fields'

export default {
  name: 'credit-card',

  components: {
    'input-fields': inputFields
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

  background: #bdbdbd;

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

    &.iInactive {
      opacity: 1;

      filter: $z-depth-1;
    }
    &.iActive {
      opacity: 0;
      filter: z-depth-3;
    }

    &:hover {
      &.iInactive {
        opacity: 0;
      }
      &.iActive {
        opacity: 1;
      }
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

  .close_icon {
    position: absolute;
    width: 100%;

    cursor: pointer;

    filter: $z-depth-1;

    transition: 0.7s;

    &:hover {
      filter: $z-depth-3;
    }
  }
}
</style>
