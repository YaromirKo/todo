<template>
  <header class="text-center ">
    <p class="text-4xl font-bold leading-10">#todo</p>
  </header>
</template>

<script>
import {injectNotification} from "@/components/Notifications";

export default {
  name: "Header",
  setup() {
    const notify = injectNotification()
    notify.set({
      mes: 'All your notes are saved locally in your browser',
      type: 'danger',
      timer: 10*1000
    })
  }
}
</script>

<style scoped>

</style>
