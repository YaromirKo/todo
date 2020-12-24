<template>
  <div v-if="$props.tab !== 2" class="flex justify-center mt-4 sticky top-0">
    <div class="flex-col md:w-10/12 w-full">
      <div v-if="openBar" class="flex justify-between px-4 py-2 bg-gray-800 rounded-t-input-text">
        <select class="w-1/2 text-white bg-blue-800 rounded outline-none">
          <option value="note" selected>Note</option>
          <option value="todo">Todo</option>
        </select>
        <div class="inline-flex">
          <div @click="openBar=false" class="w-8 h-8 mx-2 border-solid border-2 rounded border-red-400 text-red-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div class="w-8 h-8 mx-2 border-solid border-2 rounded border-green-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
      <div v-if="openBar" class="px-4 bg-gray-800 text-white">
        <input v-model.trim="test" class="md:w-1/2 py-2 border-b-2 border-teal-500 appearance-none bg-transparent w-full leading-tight focus:outline-none" type="search" placeholder="title..." list="data" />
        <datalist id="data">
          <option value="HTML" />
          <option value="CSS" />
          <option value="JavaScript" />
        </datalist>
      </div>
      <textarea  placeholder="new todo..."
                 class="w-full resize-none rounded-b-input-text px-2 py-4 bg-gray-800 text-white outline-none"
                 @focus="openBar=true"
                 v-model.trim="toDo" rows="1"></textarea>
      <!--    <div>-->
      <!--      <button @click="setToDo" class="text-white rounded-input-text bg-blue-500 px-10 py-4 focus:outline-none">Add</button>-->
      <!--    </div>-->
    </div>
  </div>

  <div class="flex justify-end pr-5 mt-6" v-if="$props.tab === 2 && getToDos.length">
    <button @click="deleteToDo('all')" class="flex items-center text-white rounded-input-text text-xs bg-red-500 px-5 py-2 focus:outline-none">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <ul class="flex flex-col sm:pt-6 pt-2 sm:px-5">
    <transition-group name="slide-fade">
      <li v-for="(item, index) in getToDos" :key="item._id" class="p-2 mb-2 flex justify-between items-center bg-gray-800 rounded text-white min-h-40">
        <div class="flex items-center ">
          <input v-model="item.status" @change="updateToDo({item, mode: 'checkbox'})" type="checkbox" class="form-checkbox cursor-pointer mr-2">
          <pre :key="updatePre" :contenteditable="$props.tab !== 2 && !item.status" @blur="editContent($event, item)" :id="index"
               class="leading-5 outline-none" :class="{'line-through': item.status}">{{item.text}}</pre>
        </div>
        <svg v-if="$props.tab !== 0" @click="deleteToDo(item._id)" class="h-5 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { mapActions } from 'vuex';
import { store } from "@/store";

export default {
  name: "ToDoBody",
  props: {
    tab: {
      type: Number
    }
  },
  setup(props) {
    const getToDos = computed(() => {
      return props.tab === 0 ? store.state.todo.data : props.tab === 1 ? store.getters.getActiveToDo : store.getters.getCompletedToDo
    })

    const toDo = ref('')
    function setToDo() {
      store.dispatch('setToDo', toDo.value)
      toDo.value = ''
    }

    const updatePre = ref(true)
    function editContent(event, item) {
      store.dispatch('updateToDo', { event, item })
      updatePre.value = !updatePre.value
    }

    const openBar = ref(false)
    const test = ref('')
    function check(event) {
      console.log(event)
    }

    onMounted(() => {
      const textarea = document.querySelector('textarea');

      textarea.addEventListener('keyup', function(e, a) {
        console.log(e, a)
        if (this.scrollTop > 0 && e.target.clientHeight < 400 ) {
          this.style.height = this.scrollHeight + "px";
        }
        if (e.target.value == '') {
          this.style.height = '55px'
        }
      });
    })

    return {
      toDo, updatePre, openBar, test,
      getToDos,
      check,
      setToDo, editContent, ...mapActions(['deleteToDo', 'updateToDo'])
    }
  }
}
</script>

<style scoped>
pre {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  /*white-space: -pre-wrap;      !* Opera 4-6 *!*/
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all 3s ease-in;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.btn_delete {
  width: 23px;
  height: 23px;
  background-size: 23px;
  background: url("../../assets/icons/baseline_delete_outline_white_18dp.png") no-repeat;
}
</style>
