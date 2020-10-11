<template>
  <div class="">
    <div v-for="(item, index) in notify.notification.arr" :key="index" @click="notify.close(item.id)">
      {{item}}, {{index}}
    </div>
  </div>
</template>

<script>
import {injectNotification} from "./index";

export default {
  name: "Notifications",
  setup() {
    return {
      notify: injectNotification()
    }
  }
}
</script>

<style scoped>

</style>
