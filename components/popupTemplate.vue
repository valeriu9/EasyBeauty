<template>
  <div>
    <div class='normal-window' :class="showModal ? 'is-active' : ''" @click='overlayClick'/>
      <div class='popup-window' :class="showModal ? 'is-active' : ''">
        <slot v-if='showModal' name='body'></slot>
      </div>
  </div>
</template>

<script>

export default {


  mounted() {
    let fontScript = document.createElement('script')
    fontScript.setAttribute('src', 'https://kit.fontawesome.com/52311f6e31.js')
    document.head.appendChild(fontScript)
  },

  layout: 'default',
  props: {
    enableOverlayClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { showModal: false }
  },
  beforeDestroy() {
    this.close()
  },
  methods: {
    open() {
      this.showModal = true
      const x = window.scrollX
      const y = window.scrollY
      window.onscroll = function() {
        window.scrollTo(x, y)
      }
      this.$emit('opened')
    },
    closeButtonClicked() {
      this.$emit('close-button-clicked')
      this.close()
    },
    close() {
      this.showModal = false
      window.onscroll = function() {
      }
      this.$emit('closed')
    },
    overlayClick() {
      console.log('overlayclijc')
      if (this.enableOverlayClick) {
        this.close()
      }
    }
  }
}
</script>


<style lang='scss' scoped>
.normal-window {
  z-index: 100;
  position: fixed;
  border: 2px solid red;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  width: 100%;
  height: 110%;
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
  height: 60%;
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
</style>

