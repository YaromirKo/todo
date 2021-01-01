<template>
  <Snowfall/>
  <Header/>
  <ToDo/>
<!--  <div class="fixed rounded-full lg:h-16 lg:w-16 h-10 w-10-->
<!--                 flex items-center justify-center bottom-0-->
<!--                 right-0 mr-10 mb-10 lg:mr-40 lg:mb-20 rounded border-2-->
<!--                 outline-none">123</div>-->
</template>

<script>
import Header from "@/components/Header";
import ToDo from "@/components/todo/ToDo";
import {store} from "@/store";
import Snowfall from "../components/Snowfall";

export default {
  name: "index",
  components: {
    Snowfall,
    Header,
    ToDo,
  },
  mounted() {
    const userData = store.state.user.data
    if (Object.entries(userData).length === 0) {
      this.$notify({
        mes: 'All your notes are saved locally in your browser',
        type: 'warning',
        timer: 10*1000
      })
    } else {
      store.dispatch('getTodos')
      this.$notify({
        mes: `Hi ${userData.displayName ? userData.displayName : userData.email}, good luck`,
        type: 'success',
        timer: 3*1000
      })
    }
  },
}
</script>

<style scoped>

</style>
