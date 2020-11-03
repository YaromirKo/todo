<template>

  <div class="">
    <div class="container grid grid-rows-layout h-screen mx-auto pt-8 sm:px-24">
      <router-view />
    </div>
  </div>

  <teleport to="body">
    <Modal v-model:show="updateExists" class="flex items-center justify-center">
      <div @click="refreshApp" class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto text-center">
        <div class="p-6">An update is available, press me :)</div>
      </div>
    </Modal>
  </teleport>
  <notifications></notifications>
</template>
<script>
import Modal from "@/components/Modal";
import Notifications from "@/plugins/Notifications/Notifications";

export default {
  name: 'App',
  components: {
    Modal,
    Notifications
  },
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    }
  },
  created() {
    // Listen for our custom event from the SW registration
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    // Prevent multiple refreshes
    if (process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!this.refreshing) {
          this.refreshing = true
          // Here the actual reload of the page occurs
          window.location.reload()
        }
      })
    }
  },
  methods: {
    // Store the SW registration so we can send it a message
    // We use `updateExists` to control whatever alert, toast, dialog, etc we want to use
    // To alert the user there is an update they need to refresh for
    updateAvailable(event) {
      this.registration = event.detail
      this.updateExists = true
    },

    // Called when the user accepts the update
    refreshApp() {
      this.updateExists = false
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    },
  },
}
</script>

<style>

::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #edf2f7;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 100vh;
  border: 3px solid #edf2f7;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
* {
  -webkit-touch-callout:none;                /* prevent callout to copy image, etc when tap to hold */
  -webkit-text-size-adjust:none;             /* prevent webkit from resizing text to fit */
  -webkit-tap-highlight-color:rgba(0,0,0,0); /* prevent tap highlight color / shadow */
  /*-webkit-user-select:none;                  !* prevent copy paste, to allow, change 'none' to 'text' *!*/
}
</style>
