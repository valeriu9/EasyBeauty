<template>
  <div v-show="show">
    <div class="bg" />
    <div ref="animationContainer" class="animation-proprieties" />
  </div>
</template>

<script>
import lottie from 'lottie-web/build/player/lottie_light.min.js';
import animationLoad from '~/assets/animations/Loader.json';

export default {
  data () {
    return { show: false, anim: null };
  },
  beforeDestroy () {
    this.close();
    if (this.anim) { this.anim.destroy(); }
    lottie.destroy();
  },
  methods: {
    open () {
      this.show = true;
      const x = window.scrollX;
      const y = window.scrollY;
      window.onscroll = function () { window.scrollTo(x, y); };
      if (this.anim) { this.anim.destroy(); }
      this.anim = lottie.loadAnimation({
        container: this.$refs.animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationLoad
      });
      this.$emit('opened');
    },
    close (onCloseCallback) {
      window.onscroll = function () {};
      if (onCloseCallback) { onCloseCallback(); }
      this.show = false;
      this.$emit('closed');
    }
  }
};
</script>

<style lang="scss" scoped>
.animation-proprieties {
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 150px;
}

.bg {
  position: fixed;
  z-index: 98;
  background-color: #ffffff;
  opacity: 0.95;
  height: 100%;
  width: 100vw;
  top: 0;
  right: 0;
}
</style>
