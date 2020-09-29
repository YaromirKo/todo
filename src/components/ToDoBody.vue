<template>
  <div>
    <input type="text" v-model="toDo">
    <button @click="pushToDo">Add</button>
  </div>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, reactive} from 'vue';

export default {
  name: "ToDoBody",
  props: {
    tab: {
      type: Number
    }
  },
  setup(props) {
    const toDo = ref('')
    const itemInTabs = ['all', 'active', 'completed']

    const data = ref([])

    const pushToDo = () => {

    }

    return {
      toDo,
      data,
      pushToDo
    }
  }
}
</script>

<style scoped>

</style>
