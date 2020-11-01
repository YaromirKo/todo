<template>
  <Header/>
  <ToDo/>
</template>

<script>
import Header from "@/components/Header";
import ToDo from "@/components/todo/ToDo";

export default {
  name: "index",
  components: {
    Header,
    ToDo,
  }
}
</script>

<style scoped>

</style>
