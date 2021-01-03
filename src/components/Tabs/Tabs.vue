<template>
  <div>
    <div class="sticky top-0 bg-gray-800">
      <div class="flex justify-around">
        <div v-for="(tab, index) in tabs" :key="index" @click="toggleTab(tab)" class="min-w-3 text-center font-semibold leading-4 cursor-pointer">
          <p class="mb-3 mt-4">{{tab.title}}</p>
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
