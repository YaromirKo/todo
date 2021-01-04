<template>
  <tabs class="h-screen">
    <tab title="All" active>
      <ToDoBody :tab="0"/>
    </tab>
    <tab title="Active">
      <ToDoBody :tab="1"/>
    </tab>
    <tab title="Completed">
      <ToDoBody :tab="2"/>
    </tab>
  </tabs>
  <Add v-if="!showModal" @click="showModal=true"/>
  <Modal v-model:show="showModal" :style="{bgColor: 'creator', bgOpacity: 'opacity-75'}">
    <div class="h-full flex justify-center">
      <Creator @show="close" class="lg:w-1/3 w-full"/>
    </div>
  </Modal>
</template>

<script>
import ToDoBody from "@/components/todo/ToDoBody";
import Tabs from "@/components/Tabs/Tabs";
import Tab from "@/components/Tabs/Tab";
import Add from "../buttons/Add";
import Creator from "./Creator";
import Modal from "../Modal";

import {ref} from "vue";

export default {
  name: "ToDo",
  components: {
    ToDoBody,
    Tabs,
    Tab,
    Add,
    Creator,
    Modal
  },
  setup() {
    const showModal = ref(false)
    function close() {
      showModal.value = false
    }
    return {
      showModal,
      close
    }
  }
}
</script>

<style scoped>

</style>
