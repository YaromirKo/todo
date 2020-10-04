<template>
  <div class="container relative min-h-screen-95 mx-auto pt-8 sm:px-24">
    <button v-if="notificationsSupported" @click="askPermission">Enable notifications ></button>
    <Header/>
    <ToDo/>
  </div>
  <Footer/>
</template>
<script>
import Header from "@/components/Header";
import ToDo from "@/components/todo/ToDo";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    ToDo,
    Footer
  },
  data() {
    return {
      notificationsSupported: false,
    }
  },
  methods: {
    askPermission() {
      if (this.notificationsSupported) {
        Notification.requestPermission(result => {
          console.log('result from permission question', result);
          if (result !== 'granted') {
            alert('You probably do not like notifications?!');
          } else {
            console.log('A notification will be send from the service worker => This only works in production');
            this.showNotification()
          }
        })
      }
    },
    showNotification() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready // returns a Promise, the active SW registration
            .then(swreg => swreg.showNotification('Notifications granted', {
              body: 'Here is a first notification',
              vibrate: [300, 200, 300],
              // actions: [
              //     { action: 'confirm', title: 'Okay', icon: '/img/icons/android-chrome-192x192.png'},
              //     { action: 'cancel', title: 'Cancel', icon: '/img/icons/android-chrome-192x192.png'}
              // ],
            }))
      }
    },
  },
  created() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      this.notificationsSupported = true
    }
  },
}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*}*/
/* width */
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
