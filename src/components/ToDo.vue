<template>
  <header class="flex justify-around border-b-2 mt-6">
    <div @click="toggleTab(0)" class="w-22 text-center font-semibold leading-4 cursor-pointer">
      <p class="my-6">All</p>
      <div :class="{'border-active': activeTab === 0}"></div>
    </div>
    <div @click="toggleTab(1)" class="w-22 text-center font-semibold leading-4 cursor-pointer">
      <p class="my-6">Active</p>
      <div :class="{'border-active': activeTab === 1}"></div>
    </div>
    <div @click="toggleTab(2)" class="w-22 text-center font-semibold leading-4 cursor-pointer">
      <p class="my-6">Completed</p>
      <div :class="{'border-active': activeTab === 2}"></div>
    </div>
  </header>
  <ToDoBody :tab="activeTab" />
</template>

<script>
import ToDoBody from "@/components/ToDoBody";

import {ref} from 'vue';

export default {
  name: "ToDo",
  components: {
    ToDoBody
  },
  setup() {
    const activeTab = ref(0)

    const toggleTab = (id) => activeTab.value = id

    return {
      activeTab,
      toggleTab
    }
  }
}
</script>

<style scoped>

</style>
