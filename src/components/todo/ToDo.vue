<template>
  <tabs>
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
</template>

<script>
import ToDoBody from "@/components/todo/ToDoBody";
import Tabs from "@/components/Tabs/Tabs";
import Tab from "@/components/Tabs/Tab";

export default {
  name: "ToDo",
  components: {
    ToDoBody,
    Tabs,
    Tab
  },
}
</script>

<style scoped>

</style>
