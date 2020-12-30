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
      <div v-if="openBar" class="px-4 pb-2 bg-gray-800 text-white">
        <input v-model.lazy.trim="title" class="md:w-1/2 py-2 pl-1 border-b-2 border-teal-500 appearance-none bg-transparent w-full leading-tight focus:outline-none" type="text" placeholder="title..." list="data" />
        <datalist id="data">
          <option v-for="(item, index) in datalist" :key="index">{{item}}</option>
        </datalist>
      </div>
      <textarea  placeholder="new todo..."
                 class="w-full resize-none max-h-96 rounded-b-input-text px-2 py-4 bg-gray-800 text-white outline-none"
                 rows="1"
                 @focus="openBar=true"
                 @keyup.ctrl.enter="add"
                 @keyup.esc="cancel"
                 :style="textareaStyle"
                 ref="textareaRef"
                 v-model="text"></textarea>
    </div>
</template>

<script>
import {ref, computed, watch} from 'vue';
import { store } from "@/store";
export default {
  name: "Creator",
  setup() {
    const openBar = ref(false)
    const title = ref('')
    const text = ref('')
    const mode = ref('note')
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
      textareaRef.value.blur()
      title.value = text.value = ''
      openBar.value = false
    }
    function add() {
      store.dispatch('setToDo', {
        text: text.value,
        mode: mode.value,
        title: title.value
      })
      cancel()
    }
    const textareaRef = ref(null)
    const textareaHeight = ref('0')
    function resize(c, prevC) {
      const _c = c?.split('\n').length || 0
      const _prevC = prevC?.split('\n').length || 0
      if (_c < _prevC && textareaRef.value.clientHeight >= textareaRef.value.scrollHeight) {
        textareaHeight.value = `${textareaRef.value.clientHeight - 24*(_prevC - _c)}px`
      } else if (textareaRef.value.scrollHeight < window.screen.height/2) {
        textareaHeight.value = `${textareaRef.value.scrollHeight}px`
      } else if (_c <= 1) {
        textareaHeight.value = `${24}px`
      }
    }
    watch(text, (c, prevC) => {
      resize(c, prevC)
    })
    const textareaStyle = computed(() => `min-height: ${textareaHeight.value}`)

    return {
      textareaRef, textareaStyle,
      modeOptions, datalist,
      openBar, text, title, mode,
      cancel, add
    }
  }
}
</script>

<style scoped>

</style>
