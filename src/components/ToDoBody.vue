<template>
  <div v-if="$props.tab !== 2">
    <input type="text" v-model="toDo">
    <button @click="pushToDo">Add</button>
  </div>
  <div>
    <ul>
      <li v-for="(item, index) in toDos" :key="index">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref} from 'vue';

export default {
  name: "ToDoBody",
  props: {
    tab: {
      type: Number
    }
  },
  setup(props) {
    const toDo = ref('')
    const data = ref([])
    const toDos = props.tab === 0 ? data.value : props.tab === 1 ? data.value.find(item => item === 'active') : data.value.find(item => item === 'completed')

    const pushToDo = () => {
      data.value.push({
        item: toDo.value,
        status: 'active'
      })
    }
    const completedToDo = (id) => {
      data.value[id].status = 'completed'
    }
    const deleteToDo = (id) => {
      data.value.splice(id, 1)
    }

    return {
      toDo, data, toDos,
      pushToDo, completedToDo, deleteToDo
    }
  }
}
</script>

<style scoped>

</style>
