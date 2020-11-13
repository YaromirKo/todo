<template>
  <div v-if="$props.tab !== 2" class="flex justify-around mt-4">
    <textarea  placeholder="new todo..." class="resize-none sm:w-4/5 w-10/12 rounded-input-text px-2 py-4 bg-gray-800 text-white focus:border-blue-200 outline-none"
               v-model.trim="toDo" rows="1" autofocus></textarea>
    <div>
      <button @click="setToDo" class="text-white rounded-input-text bg-blue-500 px-10 py-4 focus:outline-none">Add</button>
    </div>
  </div>

  <div class="flex justify-end pr-5 mt-6" v-if="$props.tab === 2 && getToDos.length">
    <button @click="deleteToDo('all')" class="flex items-center text-white rounded-input-text text-xs bg-red-500 px-5 py-2 focus:outline-none">
      <span class="material-icons cursor-pointer text-white">delete_outline</span>
      delete all
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
        <div v-if="$props.tab !== 0" @click="deleteToDo(item._id)" class="material-icons cursor-pointer">delete_outline</div>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import { ref, computed } from 'vue';
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

    return {
      toDo, updatePre,
      getToDos,
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
</style>
