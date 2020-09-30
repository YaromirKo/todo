<template>
  <div v-if="$props.tab !== 2" class="flex justify-around pt-8">
    <textarea  placeholder="Add something..." class="resize-none sm:w-4/5 w-3/5 rounded-input-text border-2 px-2 py-4 focus:bg-white focus:border-blue-400 outline-none"
               v-model="toDo" rows="1"></textarea>
    <button @click="pushToDo" class="text-white rounded-input-text bg-blue-500 px-10 focus:outline-none">Add</button>
  </div>
  <ul class="flex flex-col pt-6 px-5">
    <li v-for="item in getToDos" :key="item.id" class="py-2 flex justify-between items-center hover:bg-gray-200 rounded">
      <div class="flex items-center w-4/5">
        <input v-model="item.status" type="checkbox" class="form-checkbox cursor-pointer mr-2">
        <pre class="text-lg font-medium leading-5 w-4/5" :class="{'line-through': item.status}">{{item.item}}</pre>
      </div>
      <div @click="deleteToDo(item.id)" class="material-icons cursor-pointer">delete_outline</div>
    </li>
  </ul>
  <div class="flex justify-end pr-5" v-if="$props.tab === 2 && getToDos.length">
    <button @click="deleteAllToDos" class="text-white rounded-input-text bg-red-500 px-10 py-2 focus:outline-none">Delete all</button>
  </div>
</template>

<script>
import {ref, reactive, computed} from 'vue';

export default {
  name: "ToDoBody",
  props: {
    tab: {
      type: Number
    }
  },
  setup(props) {

    const toDo = ref('')
    const data = reactive([])

    const getToDos = computed(() => {
      return props.tab === 0 ? data : props.tab === 1 ? data.filter(item => !item.status) : data.filter(item => item.status)
    })

    const pushToDo = () => {
      if (toDo.value != '') {
        data.push({
          id: data.length + 1,
          item: toDo.value,
          status: false
        })
      }
      toDo.value = ''
    }
    const completedToDo = (id) => {
      data[id].status = !data[id].status;
    }
    const deleteToDo = (id) => {
      data.splice(data.findIndex(item => item.id === id), 1)
    }
    const deleteAllToDos = () => {
      let tmp = data.filter(item => item.status)
      tmp.forEach(item => {
        data.splice(data.findIndex(el => el.id == item.id), 1)
      })
    }

    return {
      toDo, data,
      getToDos,
      pushToDo, completedToDo, deleteToDo, deleteAllToDos
    }
  }
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>
