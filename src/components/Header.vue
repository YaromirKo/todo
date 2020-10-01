<template>
  <header class="text-center ">
    <p class="text-4xl font-bold leading-10">#todo v.1</p>
    <small v-show="show" class="bg-red-300 rounded p-2">All your notes are saved locally in your browser</small>
  </header>
</template>

<script>
import {ref, onMounted} from 'vue'

export default {
  name: "Header",
  setup() {
    const show = ref(true)
    onMounted(() => {
      setTimeout(() => {
        show.value = false
      }, 10000)
    })
    return {show}
  }
}
</script>

<style scoped>

</style>
