<template>
  <nav class="flex w-full items-center px-6 bg-white">
    <div class="flex items-center">
      <button class="mr-2" aria-label="Open Menu" @click="close">
        <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-8 h-8">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div>
      <p class="text-4xl font-bold leading-10">#todo</p>
    </div>

    <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0">
      <div
          @keyup.esc="close"
          v-show="isOpen"
          class="z-10 fixed inset-0 transition-opacity">
        <div
            @click="close"
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"></div>
      </div>
    </transition>

    <aside class="transform top-0 left-0 w-64 bg-gray-200 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 flex"
           :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <button class="m-2 fixed right-0" aria-label="Open Menu" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="#626262"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884L7.116 8z"/></g></svg>
      </button>
      <div>
        <router-link to="/login">Login Page</router-link>
        <router-link to="/register">Register Page</router-link>
      </div>
      <div class="flex items-center justify-center w-full"><p>coming soon, maybe :)</p></div>
      <div class="fixed bottom-0 w-full">
        <Footer/>
      </div>
    </aside>
  </nav>
</template>

<script>
// import {injectNotification} from "@/plugins/Notifications";

import Footer from "@/components/Footer";

import {ref, watch, onMounted} from 'vue';

export default {
  name: "Header",
  components: {
    Footer
  },
  setup() {
    // const notify = injectNotification()
    //
    // notify.set({
    //   mes: 'All your notes are saved locally in your browser',
    //   type: 'danger',
    //   timer: 10*1000
    // })

    const isOpen = ref(false)

    watch(isOpen, () => {
        if (isOpen.value) document.body.style.setProperty("overflow", "hidden");
        else document.body.style.removeProperty("overflow");
    })

    const close = () => isOpen.value = !isOpen.value

    onMounted(() => {
      document.addEventListener("keydown", e => {
        if (e.keyCode === 27 && isOpen.value) isOpen.value = false;
      });
    })

    return {isOpen, close}
  }
}
</script>

<style scoped>

</style>
