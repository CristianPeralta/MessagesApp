<template lang="html">
  <div class="column is-2" style="z-index:80;">
    <aside class="menu">
      <p class="menu-label">
        Messages
      </p>
      <ul class="menu-list">
        <li><a @click="getAll()">All</a></li>
        <li><a @click="getMessagesSent()">Sent</a></li>
        <li><a @click="getMessagesReceived()">Received</a></li>
        <li><a @click="getMessagesLanguage()">Per language</a></li>
      </ul>
      <slot></slot>
    </aside>
  </div>
</template>

<script>
import ChatServices from '@/services/ChatServices'

export default {
  name: 'MenuLeft',
  computed: {
    userId () {
      return this.$parent.user._id
    }
  },
  methods: {
    getMessagesSent () {
      this.$parent.chooseLang = false
      ChatServices.getMessages('sent', this.userId).then((response) => {
          this.$parent.messages = response.data
      })
    },
    getMessagesReceived () {
      this.$parent.chooseLang = false
      ChatServices.getMessages('received', this.userId).then((response) => {
          this.$parent.messages = response.data
      })
    },
    getAll () {
      this.$parent.chooseLang = false
      ChatServices.getAllMessages().then((response) => {
          this.$parent.messages = response.data
      })
    },
    getMessagesLanguage () {
      this.$parent.chooseLang = !this.$parent.chooseLang
    }
  }
}
</script>

<style lang="css">
</style>
