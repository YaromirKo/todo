<template>
  <div @click="sendGoogle" class="google-btn cursor-pointer hover:bg-blue-600">
    <div class="google-icon-wrapper">
      <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
    </div>
    <p class="btn-text"><b>{{ $props.text }}</b></p>
  </div>
</template>

<script>
import { onUnmounted } from 'vue'
import { store } from '@/store'
import router from "@/router";

export default {
  name: "GoogleBtn",
  props: {
    text: {
      type: String
    }
  },
  setup() {

    const api = process.env.API

    const handleMessage = (e, callback) => {
      if (typeof callback === 'function' && e.data.auth === 'passport' && e.origin === api) { callback(e.data); }
    }

    function sendGoogle() {
      window.open(`${api}/api/auth/google`);
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
    return {
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
