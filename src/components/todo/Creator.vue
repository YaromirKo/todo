<template>
    <div>
      <div class="flex justify-between px-4 pb-2 pt-4 bg-gray-800 rounded-t-input-text">
        <div class="inline-flex">
          <button class="w-6 h-6 mr-4 xl:mr-4 text-white cursor-pointer"
                  :class="{'border-btn-active': mode === 'note'}"
                  title="note"
                  @click="switchMode">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
            </svg>
          </button>
          <button class="w-6 h-6 mr-4 xl:mr-4 text-white cursor-pointer"
                  :class="{'border-btn-active': mode === 'todo'}"
                  title="to-do list"
                  @click="switchMode">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </button>
        </div>
        <div class="inline-flex">
          <button @click="cancel"
                  class="w-8 h-8 ml-8 xl:ml-4 border-solid border-2 rounded border-red-400 text-red-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button @click="add" v-if="text.trim().length > 0"
               class="w-8 h-8 ml-8 xl:ml-4 border-solid border-2 rounded border-green-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
      <div class="px-4 pb-2 bg-gray-800 text-white">
        <input v-model.lazy.trim="group" class="md:w-1/2 py-2 pl-1 border-b-2 border-teal-500 appearance-none bg-transparent w-full leading-tight focus:outline-none" type="text" placeholder="group..." list="data" />
        <datalist id="data">
          <option v-for="(item, index) in datalist" :key="index">{{item}}</option>
        </datalist>
      </div>
      <textarea  placeholder="new todo..."
                 class="w-full resize-none max-h-96 rounded-b-input-text px-2 py-4 bg-gray-800 text-white outline-none"
                 rows="1"
                 @keyup.ctrl.enter="add"
                 @keyup.esc="cancel"
                 :style="textareaStyle"
                 ref="textareaRef"
                 v-model="text"></textarea>
    </div>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue';
import { store } from "@/store";
export default {
  name: "Creator",
  setup(props, {emit}) {
    const group = ref('')
    const text = ref('')
    const mode = ref('note')

    const datalist = [
        'all',
        'html',
        'js',
        'css'
    ]

    function switchMode() {
      mode.value = mode.value === 'note' ? 'todo' : 'note'
    }

    function cancel() {
      textareaRef.value.blur()
      group.value = text.value = ''
      emit('show', false)
    }
    function add() {
      store.dispatch('newToDo', {
        mode: mode.value,
        group: group.value,
        text: text.value
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

    onMounted(() => {
      textareaRef.value.focus()
    })

    return {
      textareaRef, textareaStyle,
      datalist, text, group, mode,
      cancel, add, switchMode
    }
  }
}
</script>

<style scoped>

</style>
