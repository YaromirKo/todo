<template>
  <div>
    <div class="sticky top-0 bg-gray-800 rounded">
      <div class="flex justify-around border-b-2 border-gray-600">
        <div v-for="(tab, index) in tabs" :key="index" @click="toggleTab(tab)" class="w-22 text-center font-semibold leading-4 cursor-pointer">
          <p class="my-4">{{tab.title}}</p>
          <div :class="{'border-active': tab.isActive}" class="border-transparent"></div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  data: ()=>({
    tabs: [],
  }),
  provide() {
    return {
      addTab: this.addTab
    }
  },
  methods: {
    addTab(tab) {
      this.tabs.push(tab)
    },
    toggleTab(tab) {
      this.tabs.forEach(item => {
        item.isActive = item.title === tab.title
      });
    }
  }
}
</script>

<style scoped>

</style>
