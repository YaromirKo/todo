<template>
  <nav class="flex w-full items-center px-6 py-2 bg-gray-800 rounded-t">
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
      <div class="new-year"></div>
      <p class="text-xl font-bold leading-10">todo</p>
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

    <aside class="transform top-0 left-0 w-64 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 flex bg-gray-800"
           :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <button class="m-2 fixed right-0" aria-label="Open Menu" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="#626262"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884L7.116 8z"/></g></svg>
      </button>
      <div class="w-64 h-screen">
        <nav class="mt-10">
          <div v-if="logged">
            <div class="w-full flex justify-between items-center py-3 text-gray-100">
              <span class="flex items-center">
                <span class="mx-4 font-medium">{{ store.state.user.data.displayName ? store.state.user.data.displayName : store.state.user.data.email.split('@')[0] }}</span>
                <span v-if="store.state.user.data.photo">
                  <img :src="store.state.user.data.photo" alt="photo" class="inline-block h-6 w-6 rounded-full text-white shadow-solid">
                </span>
                <span v-else class="material-icons">account_circle</span>
              </span>
            </div>
            <button @click="logout" class="w-full flex justify-between items-center py-3 px-6 text-gray-100 cursor-pointer hover:bg-gray-700 hover:text-red-500 focus:outline-none">
              <span class="flex items-center">
                  <span class="mx-4 font-medium">Logout</span>
              </span>
            </button>
          </div>
          <div v-else>
            <router-link to="/login">
              <button class="w-full flex justify-between items-center py-3 px-6 text-gray-100 cursor-pointer hover:bg-gray-700 hover:text-gray-100 focus:outline-none">
                <span class="flex items-center">
                    <span class="mx-4 font-medium">
                      Login
                    </span>
                </span>
              </button>
            </router-link>
            <router-link to="/register">
              <button class="w-full flex justify-between items-center py-3 px-6 text-gray-100 cursor-pointer hover:bg-gray-700 hover:text-gray-100 focus:outline-none">
                <span class="flex items-center">
                    <span class="mx-4 font-medium">
                      Register
                    </span>
                </span>
              </button>
            </router-link>
          </div>

        </nav>

        <div class="fixed bottom-0 w-full text-white">
          <Footer/>
        </div>
      </div>
    </aside>
  </nav>
</template>

<script>
import {injectNotification} from "@/plugins/Notifications";

import Footer from "@/components/Footer";

import {ref, computed, watch, onMounted} from 'vue';

import {store} from "@/store";

export default {
  name: "Header",
  components: {
    Footer
  },
  setup() {
    const notify = injectNotification()
    const isOpen = ref(false)

    watch(isOpen, () => {
      if (isOpen.value) document.body.style.setProperty("overflow", "hidden");
      else document.body.style.removeProperty("overflow");
    })

    const logged = computed(() => Object.entries(store.state.user.data).length !== 0)

    const close = () => isOpen.value = !isOpen.value

    onMounted(() => {
      document.addEventListener("keydown", e => {
        if (e.keyCode === 27 && isOpen.value) isOpen.value = false;
      });
    })

    function logout() {
      store.dispatch('logout')
      notify.set({
        mes: 'You are logged out of your account, all your notes are saved locally in your browser',
        type: 'warning',
        timer: 5*1000
      })
    }

    return {
      store,
      isOpen, logged,
      close, logout
    }
  }
}
</script>

<style scoped>

.new-year {
  width: 23px;
  height: 23px;
  background-size: 23px;
  background: url("../assets/hat_mini.png") no-repeat;
  margin-left: -13px;
  margin-bottom: -16px;
  z-index: 1;
  transform: rotate(-15deg);
}

</style>
