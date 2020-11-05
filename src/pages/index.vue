<template>
  <Header/>
  <ToDo/>
</template>

<script>
import Header from "@/components/Header";
import ToDo from "@/components/todo/ToDo";
import {store} from "@/store";

export default {
  name: "index",
  components: {
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
