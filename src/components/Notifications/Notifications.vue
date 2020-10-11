<template>
  <div class="">
    <div v-for="i in 10" :key="i">{{i}}</div>

      <notification
          v-for="notification in notifications"
          v-bind="notification"
          :key="notification.timestamp.getTime()"
          @close="removeNotification"> {{notification}}</notification>
  </div>
</template>
<script>
import Notification from './Notification.vue';

export default {
  components: {
    Notification
  },
  props: {
    overlap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      notifications: this.$notifications.state
    };
  },
  methods: {
    removeNotification() {
      // this.$notifications.removeNotification(timestamp);
    }
  },
  created() {
    console.log('cre', this.notifications)
    this.$notifications.settings.overlap = this.overlap;
  },
  // watch: {
  //   overlap: function (newVal) {
  //     this.$notifications.settings.overlap = newVal;
  //   }
  // }
};
</script>
