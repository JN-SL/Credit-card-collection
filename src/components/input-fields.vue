<template>
<form class="input-fields-component">

  <div class="block-card-number">
    <input
      v-for="(n, i) in 4"
      :key="n"
      :value="cardNumbers[i]"
      :ref="'numSet' + i"
      :type="mobileNumberInput"
      class="input-card-number"
      size="4" maxlength="4"
      placeholder="0000"
      @keydown="keydownEvent($event, i)"
      @input="inputEvent($event, i, 'number')"
    />
  </div>

  <div class="block-cvv">
    <input
      ref="cvv"
      :value="cvv"
      :type="mobileNumberInput"
      class="input-cvv"
      size="3" maxlength="3"
      placeholder="CVV"
      @keydown="keydownEvent($event, 4)"
      @input="inputEvent($event, 4, 'number')" />
  </div>

  <div class="block-cardholder">
    <input
      class="input-cardholder"
      ref="cardholder"
      :value="cardholder"
      size="25" maxlength="25"
      placeholder="FIRST / LAST NAME"
      spellcheck="false"
      @keydown="keydownEvent($event, 5)"
      @input="inputEvent($event, 5)" />
  </div>

  <div class="block-date">
    <h4 class="h4-month-year">MONTH/YEAR</h4>

    <h4 class="h4-valid-date">
      <span class="vaild-date">VALID DATE</span>
      <span class="fa fa-caret-right"></span>
    </h4>

    <input
      ref="validMonth"
      :value="validMonth"
      :type="mobileNumberInput"
      class="input-month"
      size="2" maxlength="2"
      :placeholder="monthPlaceholder"
      @keydown="keydownEvent($event, 6)"
      @input="inputEvent($event, 6, 'number')" />
    <span class="divide-slash">/</span>
    <input
      ref="validYear"
      :value="validYear"
      :type="mobileNumberInput"
      class="input-year"
      size="2" maxlength="2"
      :placeholder="yearPlaceholder"
      @keydown="keydownEvent($event, 7)"
      @input="inputEvent($event, 7, 'number')" />
  </div>
</form>
</template>

<script>
export default {
  name: 'input-fields',
  data () {
    return {
      // system variables
      isMobile: navigator.userAgent.match(/Android|iPhone/i),

      // UI related
      // set input type as number when the user device is mobile
      mobileNumberInput: (this.isMobile ? 'number' : 'text'),
      monthPlaceholder: ('0' + (new Date().getMonth() + 1)).slice(-2),
      yearPlaceholder: (new Date().getYear()).toString().slice(-2),

      // v-models
      cardNumbers: [],
      cvv: null,
      cardholder: null,
      validMonth: null,
      validYear: null
    }
  },

  computed: {
    // the ref objects of the input boxes
    inputBoxRefs () {
      return [
        this.$refs['numSet0'][0],
        this.$refs['numSet1'][0],
        this.$refs['numSet2'][0],
        this.$refs['numSet3'][0],
        this.$refs.cvv,
        this.$refs.cardholder,
        this.$refs.validMonth,
        this.$refs.validYear
      ]
    }
  },

  methods: {
    keydownEvent (event, boxIndex) {
      let prevBox = this.inputBoxRefs[Math.max(0, boxIndex - 1)]
      let thisBox = this.inputBoxRefs[boxIndex]
      let nextBox = this.inputBoxRefs[ Math.min(this.inputBoxRefs.length - 1, boxIndex + 1) ]

      // [PC & Mobile] press Backspace in card number boxes
      // only cardNumber supports Backspace all the way back
      if (/(Backspace)/.test(event.key) && boxIndex <= 3) {
        if (thisBox.value.length === 0) {
          // move the caret to the previous box
          prevBox.focus()

          // Mobiles still don't support setSelectionRange
          // [PC] set the caret on the last character
          if (!this.isMobile) {
            prevBox.setSelectionRange(4, 4)
          }
          event.preventDefault()
        }
      } else if (!this.isMobile && /(ArrowRight)/.test(event.key)) {
        // Mobiles don't have the Arrow Right → key
        // [PC] press Arrow Right → in card number boxes
        // when caret on the last character && the current box is not the last one
        if (
          thisBox.selectionStart === thisBox.value.length &&
          boxIndex < this.inputBoxRefs.length - 1
        ) {
          // move caret to the next box and set the caret on the first character
          nextBox.focus()
          nextBox.setSelectionRange(0, 0)
          event.preventDefault()
        }
      } else if (/(ArrowLeft)/.test(event.key)) {
        // Mobiles don't have the Arrow Left ← key
        // [PC] press Arrow Left ← in card number boxes
        // when caret on the first character && the current box is not the first one
        if (thisBox.selectionStart === 0 && boxIndex !== 0) {
          // move caret to the previous box and set the position on the last character
          let lastPosition = prevBox.value.toString().length
          prevBox.focus()
          prevBox.setSelectionRange(lastPosition, lastPosition)
          event.preventDefault()
        }
      }
    },

    inputEvent (event, boxIndex, type) {
      let thisBox = this.inputBoxRefs[boxIndex]
      let nextBox = this.inputBoxRefs[ Math.min(this.inputBoxRefs.length - 1, boxIndex + 1) ]
      let isLast = thisBox === nextBox

      if (type === 'number') {
        // replace non-numberic values
        thisBox.value = thisBox.value.toString().replace(/[^0-9]/g, '')
        this.$emit('input', thisBox.value)
      }

      // [PC & Mobile] move the caret to the next box
      if (thisBox.value.length >= thisBox.maxLength && !isLast) {
        nextBox.select()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./global-variables";
@import "./browser-compatibility";

.input-fields-component {
  position: relative;
  width: 100%;
  height: 100%;
}

input {
  background: none;
  color: inherit;
  caret-color: inherit;

  padding: 0;

  border: none;
  margin: 0;

  // placeholder color before clicked
  &:empty {
    @include placeholder(inherit, 0.5);
  }

  &:focus {
    outline: none;
    border: none;
  }

  &[type="number"]::-webkit-inner-spin-button {
    margin: 0;
    @include appearance(none);
  }
  &[type="number"] {
    @include appearance(textfield);
  }
}

/*----- card number -----*/
.block-card-number {
  @include display-flex;
  @include justify-content(space-between);
  position: absolute;
  top: 18.8rem;
  left: 4.5rem;
  width: 48rem;

  .input-card-number {
    font-family: OCRAExtended;
    font-size: 4.6rem;
    line-height: 1;
    font-weight: normal;
    cursor: pointer;

    // firefox had some problems with rendering our flexbox when we developed
    // we specified this rule for firefox for now
    @-moz-document url-prefix() {
      width: 25%;
    }
    &[type="number"] {
      width: 25%;
    }
  }
}

/*----- CVV -----*/
.block-cvv {
  position: absolute;
  top: 23rem;
  right: 5.6rem;
  z-index: 2;

  .input-cvv {
    cursor: pointer;

    font-family: HelveticaNeue;
    font-size: 3.2rem;
    font-weight: lighter;
    text-align: right;
    color: inherit;
    letter-spacing: 0.2rem;

    border: none;

    @include transform(
      scale(1) skew(30deg, 0deg)
    );
  }
}

/*----- cardholder -----*/
.block-cardholder {
  position: absolute;
  left: 4.5rem;
  bottom: 2.6rem;

  .input-cardholder {
    width: 34rem;

    font-family: Courier;
    font-size: 2.4rem;
    font-weight: normal;
    text-transform: uppercase;

    cursor: pointer;
  }
}

/*----- valid date -----*/
.block-date {
  display: grid;
  grid-template-columns: 4.8rem 4.2rem 1rem 4.2rem;
  grid-template-rows: auto auto;
  position: absolute;
  right: 4.6rem;
  bottom: 2.6rem;

  cursor: pointer;

  // label MONTH/YEAR and VALID DATE
  h4 {
    font-family: HelveticaNeue;
    font-size: 1rem;
    font-weight: 500;

    letter-spacing: 0.04rem;
    color: inherit;

    margin: 0;
  }
  .h4-month-year {
    grid-column: 2 / 5;
    grid-row: 1 / 2;
    text-align: center;

    &.visited {
      opacity: 1;
    }
  }
  .h4-valid-date {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    justify-self: center;
    align-self: center;

    text-align: center;
  }

  // inputs and the slash
  %input-date-shared {
    align-self: end;

    font-family: OCRAExtended;
    font-size: 2.2rem;
    color: inherit;
  }
  .input-month {
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    text-align: right;
    @extend %input-date-shared;
  }
  .divide-slash {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
    justify-self: center;

    @extend %input-date-shared;
  }
  .input-year {
    grid-column: 4 / 5;
    grid-row: 2 / 3;

    text-align: left;
    @extend %input-date-shared;
  }
}
</style>
