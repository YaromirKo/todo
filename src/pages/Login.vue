<template>
  <div class="w-full max-w-xs mx-auto">
    <Form @submit="login" :validation-schema="schema" v-slot="{ errors }" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <Field name="email" as="input" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <span>{{ errors.email }}</span>
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <Field name="password" as="input" type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
        <span>{{ errors.password }}</span>
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

    <GoogleBtn text="Sign in with google"/>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

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
