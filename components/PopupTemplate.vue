<template>
  <div class="wrapper" :design="design">
    <div class="normal-window" :class="showModal ? 'is-active' : ''" @click="overlayClick" />
    <div class="popup-window" :class="showModal ? 'is-active' : ''">
      <slot v-if="showModal" name="body"></slot>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'default',
  props: {
    enableOverlayClick: {
      type: Boolean,
      default: true
    },
    design: {
      validator: prop => [
        '',
        'editAppointment',
        'confirmation'
      ].includes(prop),
      default: ''
    }
  },
  data () {
    return { showModal: false };
  },
  beforeDestroy () {
    this.close();
  },
  methods: {
    open () {
      this.showModal = true;
      const x = window.scrollX;
      const y = window.scrollY;
      window.onscroll = function () {
        window.scrollTo(x, y);
      };
      this.$emit('opened');
    },
    close () {
      this.showModal = false;
      window.onscroll = function () {
      };
      this.$emit('closed');
    },
    overlayClick () {
      if (this.enableOverlayClick) {
        this.close();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.normal-window {
  z-index: 100;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0s;
  pointer-events: none;

  &.is-active {
    opacity: 0.97;
    pointer-events: all;
    transition: 0.5s;
  }
}

.popup-window {
  z-index: 200;
  position: fixed;
  pointer-events: none;
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  border-radius: 5px;
  padding: 15px;
  width: 60%;
  overflow: auto;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0s;
  // remove weird scrolling on apple devices
  touch-action: none;
  -ms-touch-action: none;

  opacity: 0;

  &.is-active {
    opacity: 1;
    pointer-events: all;
    bottom: -10px;
    transition: 0.5s;
  }

  // Hide scrollbar
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
.wrapper[design="editAppointment"] {
  .popup-window {
    width: 90%;
  }
}
.wrapper[design="confirmation"] {
  .popup-window {
    width: fit-content;
    height: max-content;
  }
}
</style>
