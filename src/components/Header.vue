<template>
  <header class="text-center ">
    <p class="text-4xl font-bold leading-10">#todo</p>
<!--    <Notification>-->
<!--      <small class="bg-red-300 rounded p-2">All your notes are saved locally in your browser</small>-->
<!--    </Notification>-->
  </header>
</template>

<script>

export default {
  name: "Header",
  mounted() {
    setTimeout(()=> {
      this.$notify({
        message: 'новый текст 1'
      })
      this.$notify({
        message: 'новый текст 2'
      })
      this.$notify({
        message: 'новый текст 3'
      })
    }, 0)

    // setTimeout(() => {
    //   this.$notify({
    //     type: "danger",
    //     message: 'новый текстовый текстовый текстовый текстовый текстовый текст'
    //   })
    // }, 5000)
  }

}
</script>

<style scoped>

</style>
