<template>
  <div class="container mx-auto pt-8">
    <Header/>
    <ToDo/>
    <Footer/>
  </div>
</template>
<script>
import Header from "@/components/Header";
import ToDo from "@/components/ToDo";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    ToDo,
    Footer
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
