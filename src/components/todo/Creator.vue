<template>
  <div class="flex-col md:w-10/12 w-full">
    <div v-if="openBar" class="flex justify-between px-4 py-2 bg-gray-800 rounded-t-input-text">
      <select v-model="mode" class="text-white w-1/2 bg-gray-800 border-b-2 border-teal-500 leading-tight focus:outline-none">
        <option v-for="(item, index) in modeOptions" :key="index"
                :value="item.value"
                :selected="item.selected">{{item.value}}</option>
      </select>
      <div class="inline-flex">
        <div @click="cancel" class="w-8 h-8 mx-8 xl:mx-4 border-solid border-2 rounded border-red-400 text-red-400 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div @click="add" class="w-8 h-8 mx-2 border-solid border-2 rounded border-green-400 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="openBar" class="px-4 bg-gray-800 text-white">
      <input v-model.lazy.trim="title" class="md:w-1/2 py-2 pl-1 border-b-2 border-teal-500 appearance-none bg-transparent w-full leading-tight focus:outline-none" type="text" placeholder="title..." list="data" />
      <datalist id="data">
        <option v-for="(item, index) in datalist" :key="index">{{item}}</option>
      </datalist>
    </div>
    <textarea  placeholder="new todo..."
               class="w-full resize-none rounded-b-input-text px-2 py-4 bg-gray-800 text-white outline-none"
               @focus="[openBar=true, check($event)]"
               @keydown="textareaWorker"
               ref="textareaWorkerRef"
               v-model.trim="text" rows="1"></textarea>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: "Creator",
  setup() {
    const openBar = ref(false)
    const title = ref('')
    const text = ref('')
    const mode = ref('note')
    const textareaWorkerRef = ref(null)
    const modeOptions = [
        { value: 'note', selected: true},
        { value: 'todo', selected: false},
    ]
    const datalist = [
        'all',
        'html',
        'js',
        'css'
    ]

    function cancel() {
      title.value = text.value = ''
      openBar.value = false
    }
    function add() {
      console.log(title.value, mode.value)
    }
    function check(event) {
      console.log(event.scrollHeight)
    }

    let scrollHeight = 0
    let clientHeight = 0
    function textareaWorker(event) {
      const el = event.target
      scrollHeight = textareaWorkerRef.value.scrollHeight
      clientHeight = textareaWorkerRef.value.clientHeight
      console.log(textareaWorkerRef.value.scrollHeight)
      console.log(textareaWorkerRef.value.clientHeight)
      console.log(textareaWorkerRef.value.scrollTop)
      console.log(textareaWorkerRef.value.value)
      if (el.scrollTop > 0 && el.clientHeight < 400) {
        el.style.height = el.scrollHeight + "px"
      } else if (el.value.length === 0 || scrollHeight - clientHeight > 0) {
        el.style.height = '56px'
      }
    }

    return {
      textareaWorkerRef,
      modeOptions, datalist,
      openBar, text, title, mode,
      cancel, add, check, textareaWorker
    }
  }
}
</script>

<style scoped>
input::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
