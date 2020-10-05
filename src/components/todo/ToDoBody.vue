<template>
  <div v-if="$props.tab !== 2" class="flex justify-around pt-8">
    <textarea  placeholder="Add something..." class="resize-none sm:w-4/5 w-10/12 rounded-input-text border-2 px-2 py-4 focus:bg-white focus:border-blue-200 outline-none"
               v-model.trim="toDo" rows="1" autofocus></textarea>
    <div>
      <button @click="pushToDo" class="text-white rounded-input-text bg-blue-500 px-10 py-4 focus:outline-none">Add</button>
    </div>
  </div>

  <ul class="flex flex-col sm:pt-6 sm:px-5">
    <li v-for="(item, index) in getToDos" :key="item.id" class="p-2 flex justify-between items-center hover:bg-gray-200 rounded">
      <div class="flex items-center w-4/5">
        <input v-model="item.status" type="checkbox" class="form-checkbox cursor-pointer mr-2">
        <pre contenteditable="true" @blur="onInput" :id="index" class="text-lg font-medium leading-5 w-4/5 outline-none" :class="{'line-through': item.status}">{{item.item}}</pre>
      </div>
      <div v-if="$props.tab !== 2" class="flex items-center">
        <span v-if="item.date" class="material-icons cursor-pointer pr-4" @click="item.date = ''">auto_delete</span>
        <input type="datetime-local" @blur="setTimeAlarm" v-model="item.date" class="outline-none w-auto bg-white">
      </div>
      <div v-if="$props.tab !== 0" @click="deleteToDo(item.id)" class="material-icons cursor-pointer">delete_outline</div>
    </li>
  </ul>

  <div class="flex justify-end pr-5" v-if="$props.tab === 2 && getToDos.length">
    <button @click="deleteAllToDos" class="flex items-center text-white rounded-input-text text-xs bg-red-500 px-5 py-2 focus:outline-none">
      <span class="material-icons cursor-pointer text-white">delete_outline</span>
      delete all
    </button>
  </div>
</template>

<script>
import {ref, computed,watchEffect} from 'vue';

export default {
  name: "ToDoBody",
  props: {
    tab: {
      type: Number
    }
  },
  setup(props) {

    const toDo = ref('')
    const data = ref(localStorage['data-todo'] ? JSON.parse(localStorage.getItem('data-todo')) : [])

    const getToDos = computed(() => {
      return props.tab === 0 ? data.value : props.tab === 1 ? data.value.filter(item => !item.status) : data.value.filter(item => item.status)
    })

    watchEffect(() => {
      localStorage.setItem('data-todo', JSON.stringify(data.value))
    })

    let arrInterval = []

    function showNotification() {
      Notification.requestPermission(function(result) {
        if (result === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification('Vibration Sample', {
              body: 'Buzz! Buzz!',
              vibrate: [200, 100, 200, 100, 200, 100, 200],
              tag: 'vibration-sample'
            });
          });
        }
      });
    }

    const audio = new Audio(require('@/assets/audio.mp3'))

    function setterAlarmTime (timeout, id, interval=30*60*1000) {
      return setTimeout(() => {
        showNotification()
        audio.play()
        setInterval(() => {
          audio.play()
          console.log(id)
        }, interval)
      }, timeout)
    }


    function setterAlarm () {
      if (data.value.length) {
        arrInterval = []
        data.value.forEach((item) => {
          if (item.date) {
            let alarm = Date.parse(item.date) - Date.now()
            if (alarm > 0) {
              arrInterval.push({
                id: item.id,
                interval: setterAlarmTime(alarm, item.id)
              })
            }
          }
        })
      }
    }
    setterAlarm()



    console.log(arrInterval)

    const pushToDo = () => {
      if (toDo.value != '') {
        data.value.push({
          id: data.value.length + 1,
          item: toDo.value,
          status: false,
          date: ''
        })
      }
      toDo.value = ''
    }
    const deleteToDo = (id) => {
      data.value.splice(data.value.findIndex(item => item.id === id), 1)
    }
    const deleteAllToDos = () => {
      let tmp = data.value.filter(item => item.status)
      tmp.forEach(item => {
        data.value.splice(data.value.findIndex(el => el.id == item.id), 1)
      })
    }

    const onInput = (e) => {
      data.value[e.target.id].item = e.target.innerText.trim()
    }
    const setTimeAlarm = () => {
      setterAlarm()
    }

    return {
      toDo, data,
      getToDos,
      pushToDo, deleteToDo, deleteAllToDos, onInput, setTimeAlarm
    }
  }
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  /*white-space: -pre-wrap;      !* Opera 4-6 *!*/
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>
