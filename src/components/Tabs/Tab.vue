<template>
    <div v-show="isActive">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    title: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  inject: ['addTab'],
  data: ()=>({
    isActive: false
  }),
  created() {
    this.isActive = this.active
  },
  mounted() {
    this.addTab(this)
  }
}
</script>

<style scoped>

</style>
