<template>
  <div class="w-full max-w-xs mx-auto bg-gray-800 rounded">
    <Form @submit="login" :validation-schema="schema" v-slot="{ errors }" class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">
          Email
        </label>
        <Field name="email" as="input" class="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none"
                                      :class="{'border-red-500' : errors.email}"/>
        <span class="text-red-500">{{ errors.email }}</span>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-bold mb-2">
          Password
        </label>
        <Field name="password" as="input" type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-900 mb-3 leading-tight focus:outline-none"
                                                         :class="{'border-red-500' : errors.password}"/>
        <span class="text-red-500">{{ errors.password }}</span>
      </div>

      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign In
        </button>
        or
        <router-link to="/register" class="hover:bg-blue-200 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</router-link>
        <!--        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">-->
        <!--          Forgot Password?-->
        <!--        </a>-->
      </div>
    </Form>

    <div class="flex justify-center pb-2">
      <GoogleBtn text="Sign In with google"/>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

import {injectNotification} from "@/plugins/Notifications";

import router from "@/router";

import GoogleBtn from "@/components/buttons/GoogleBtn";
import { store } from '@/store'


export default {
  name: "Login",
  components: {
    GoogleBtn,
    Form,
    Field
  },
  setup() {

    const notify = injectNotification()

    const schema = markRaw(yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    }))

    function login(credential) {
      store.dispatch('login', credential)
      .then(res => {
        if (res.status === 1) {
          router.push('/')
        }
        if (res.status === 0) {
          notify.set({
            mes: res.err.response.data.message,
            type: 'danger',
            timer: 3*1000
          })
        }
      })
    }

    return {
      schema,
      login
    }
  }
}
</script>

<style scoped>

</style>
