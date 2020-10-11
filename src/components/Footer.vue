<template>
  <div class="flex justify-center w-full bg-white">
    <div class="text-center">
      <a href="https://portfolio.devchallenges.io/YaromirKo">YaromirKo</a>
      <span class="mx-1">@</span>
      <a href="https://devchallenges.io/">DevChallenges.io</a>
      <span class="mx-5">{{getYear}}</span>
      <small>v.{{version}}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    version() {
      return process.env.VUE_APP_VERSION
    },
    getYear() {
      const thereat = 2020
      let now = (new Date()).getFullYear()
      return thereat !== now ? `${thereat} - ${now}` : thereat
    }
  }
}
</script>

<style scoped>
</style>
