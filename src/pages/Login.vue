<template>
  <div class="w-full max-w-xs mx-auto">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Email
        </label>
        <input v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="email">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="user.password" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Sign In
        </button>
        or
        <router-link to="/register" class="hover:bg-blue-200 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</router-link>
        <!--        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">-->
        <!--          Forgot Password?-->
        <!--        </a>-->
      </div>
    </form>
    <div @click="sendGoogle" class="google-btn cursor-pointer hover:bg-blue-600">
      <div class="google-icon-wrapper">
        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
      </div>
      <p class="btn-text"><b>Sign in with google</b></p>
    </div>
    <!--    <p class="text-center text-gray-500 text-xs">-->
    <!--      &copy;2020 Acme Corp. All rights reserved.-->
    <!--    </p>-->
  </div>
</template>

<script>
import { reactive, onUnmounted } from 'vue'
// import axios from 'axios'
import {store} from '@/store'
import router from "@/router";

export default {
  name: "Login",
  setup() {
    const handleMessage = (e, callback) => {
      if (typeof callback === 'function' && e.data.auth === 'passport' && e.origin === 'http://localhost:8000') { callback(e.data); }
    }

    function sendGoogle() {
      window.open("http://localhost:8000/api/auth/google");
    }
    function handleOAuthMessageCb(e) {
      return handleMessage(e, data => {
        store.commit('setUser', data)
        router.push('/')
      });
    }
    window.addEventListener('message', handleOAuthMessageCb);
    onUnmounted(() => {
      window.removeEventListener('message', handleOAuthMessageCb)
    })

    const user = reactive({
      email: '',
      password: '',
    })
    return {
      user,
      sendGoogle
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:500);

.google-btn {
  width: 184px;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
}
.google-icon-wrapper {
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
}
.google-icon {
  position: absolute;
  margin-top: 11px;
  margin-left: 11px;
  width: 18px;
  height: 18px;
}
.btn-text {
  float: right;
  margin: 11px 11px 0 0;
  color: #fff;
  font-size: 14px;
  letter-spacing: 0.2px;
  font-family: "Roboto";
}
</style>
