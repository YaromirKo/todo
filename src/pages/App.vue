<template>
  <div class="container mx-auto pt-8">
    <Header/>
    <ToDo/>
  </div>
</template>
<script>
import Header from "@/components/Header";
import ToDo from "@/components/ToDo";
export default {
  name: 'App',
  components: {
    Header,
    ToDo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
