<template lang="html">
  <article class="post">
    <div class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <a>{{message.from.name}}</a>
            <template v-if="(!inbox)">
              to {{message.to.name}}
            </template>
            {{ message.createdAt | ago}}
            <template v-if="(!inbox) && (message.from._id == $parent.user._id) && (!editing)" style="margin-left:25px">

              <a>
                <span @click="translate()" class="tag is-success">Translate</span>
              </a>
              <div class="select is-small">
                <select v-model="language" placeholder="Choose a language">
   							 <option v-for="(lang, prop) in $parent.languages" :value="prop">{{lang}}</option>
   						 </select>
              </div>
              <a>
                <span @click="edit()" class="tag is-warning">Edit</span>
              </a>
              <a>
                <span @click="remove()" class="tag is-danger">Delete</span>
              </a>
            </template>
          </p>
        </div>
      </div>
    </div>
    <h4 v-if="!editing"><slot></slot></h4>
    <div v-else class="field">
      <div class="control">
        <input v-model="draft" class="input is-medium" type="text" placeholder="Editing Message">
        <div class="select is-small">
          <select v-model="editlang" :value="message.lang" placeholder="Choose a language">
           <option v-for="(lang, prop) in $parent.languages" :selected="loadLang(prop)" :value="prop">{{lang}}</option>
          </select>
         </div>
        <button @click="update()" type="button" class="button is-primary">Submit</button>
        <button @click="edit()" type="button" class="button is-ligth">Cancel</button>
      </div>
    </div>
    <div v-if="translated" class="notification is-link">
      <button @click="translated=false" class="delete" style="margin:5px"></button>
      {{textTranslated}}
    </div>
  </article>
</template>

<script>
import moment from 'moment';
import ChatServices from '@/services/ChatServices'
import YandexServices from '@/services/YandexServices'

export default {
  name:'Message',
  props:['message', 'index', 'inbox'],
  data () {
    return {
      editing: false,
      translated: false,
      textTranslated: '',
      language: 'en',
      editlang: this.message.lang,
      draft: '',
      languages: {}
    }
  },
  filters:{
    ago(date){
      if (date) {
        return moment(date).fromNow();
      }
    }
  },
  methods: {
    loadLang (prop) {
      if (prop == this.message.lang) {
        return 'selected';
      }
      return false
    },
    edit () {
      this.editing = !this.editing
      this.draft = this.message.contents
    },
    translate () {
      YandexServices.translate(this.message.contents, this.language).then((response) => {
        this.textTranslated = response.data.text[0]
        this.translated = true
      })
    },
    update () {
      ChatServices.updateMessage({
          _id: this.message._id,
  				to: this.message.to._id,
  				from: this.$parent.user._id,
  				contents: this.draft,
  				lang: this.editlang,
          open: this.message.open
        }
      ).then((response) => {
        this.$parent.messages.splice(this.index, 1, response.data)
        this.editing = false
      })
    },
    remove () {
      ChatServices.removeMessage(this.message._id).then((response) => {
        this.$parent.messages.splice(this.index, 1)
      })
    }
  }
}
</script>

<style lang="css">
</style>
