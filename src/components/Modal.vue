<template>
  <!--Modal-->
  <transition name="fade">
    <div v-if="show" @click.self="close"
         :class="`fixed w-full h-full top-0 left-0 bg-${style.bgColor} bg-${style.bgOpacity}`">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    style: {
      type: Object,
      default: () => {
        return {
          bgColor: 'gray-800',
          bgOpacity: 'opacity-25'
        }
      }
    },
    overflow: {
      type: Boolean,
      default: true
    }
  },
  updated() {
    this.overflowShow()
  },
  methods: {
    overflowShow() {
      if (this.overflow) document.body.style.overflow = this.show ? 'hidden' : 'visible'
    },
    close() {
      this.$emit("update:show", false);
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
