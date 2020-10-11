<template>
  <header class="text-center ">
    <p class="text-4xl font-bold leading-10">#todo</p>
<!--    <Notification>-->
<!--      <small class="bg-red-300 rounded p-2">All your notes are saved locally in your browser</small>-->
<!--    </Notification>-->
  </header>
</template>

<script>
import {injectNotification} from "@/components/Notifications";

export default {
  name: "Header",
  setup() {
    const notify = injectNotification()

      setTimeout(() => {
        notify.set({
          mes: 'test'
        })
      })
      setTimeout(() => {
        notify.set({
          mes: 'test 2'
        })
      }, 7000)
      setTimeout(() => {
        notify.set({
          mes: 'test 3'
        })
      }, 15000)
  }
}
</script>

<style scoped>

</style>
