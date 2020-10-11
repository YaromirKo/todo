<template>
  qdqdwq
  <div @click="tryClose">
      <span v-if="message" v-html="message"></span>
  </div>
</template>
<script>
export default {
  name: 'notification',
  props: {
    message: String,
    timeout: {
      type: Number,
      default: 5000,
      validator: value => {
        return value >= 0;
      },
      description: 'Notification timeout (closes after X milliseconds). Default is 5000 (5s)'
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
      description: 'Notification timestamp (used internally to handle notification removal correctly)'
    },
    showClose: {
      type: Boolean,
      default: true,
      description: 'Whether to show close button'
    },
    closeOnClick: {
      type: Boolean,
      default: true,
      description: 'Whether to close notification when clicking it\' body'
    },
    clickHandler: {
      type: Function,
      description: 'Custom notification click handler'
    }
  },
  data() {
    return {
      elmHeight: 0
    };
  },
  methods: {
    close() {
      this.$emit('close', this.timestamp);
    },
    tryClose(evt) {
      if (this.clickHandler) {
        this.clickHandler(evt, this);
      }
      if (this.closeOnClick) {
        this.close();
      }
    }
  },
  mounted() {
    console.log(this.message)
    this.elmHeight = this.$el.clientHeight;
    // if (this.timeout) {
    //   setTimeout(this.close, this.timeout);
    // }
  }
};
</script>
<style>
/*.notifications .alert {*/
/*  position: fixed;*/
/*  z-index: 10000;*/

/*}*/
</style>
