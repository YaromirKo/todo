<template>
  <teleport to="body">
    <div class="fixed top-0 right-0 m-8 w-5/6 md:w-full max-w-sm">

      <transition-group name="list" mode="out-in">

        <div v-for="item in notify.notification.arr" :key="item.id" class="mb-2">

          <div class="flex items-start justify-between w-full p-2 rounded shadow-lg text-white"
               :class="getType(item.type)">
            <p>{{item.mes}}</p>
            <svg @click="notify.close(item.id)" class="fill-current text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>

        </div>

      </transition-group>

    </div>
  </teleport>
</template>

<script>
import {injectNotification} from "./index";

export default {
  name: "Notifications",
  setup() {
    const notify = injectNotification()

    const getType = (type) => {
      let cls;
      switch (type) {
        case 'success':
          cls = 'bg-green-500';
          break;
        case 'danger':
          cls = 'bg-red-500';
          break;
        case 'warning':
          cls = 'bg-yellow-500';
          break;
        default:
          cls = 'bg-green-500'
      }
      return cls
    }


    return {
      notify,
      getType
    }
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateZ(30px);
}
</style>
