<template>
  <div class="">
    <Navbar :user="user"></Navbar>
    <section class="container">
      <div class="columns" style="margin-left : 3rem; margin-top : 0px;">
        <MenuLeft></MenuLeft>
        <div class="column is-8" >
          <div v-if="chooseLang">
            <div class="field has-addons" >
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model="language" placeholder="Choose a language">
                    <option v-for="(lang, prop) in languages" :value="prop">{{lang}}</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <button type="submit"  @click="getMessagesLanguage()" class="button is-primary">Choose</button>
              </div>
            </div>
          </div>
          <template v-if="messages.length==0">
            <section class="hero is-medium is-ligth is-bold">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">
                    <template v-if="!chooseLang">
                      Welcome
                    </template>
                    <p v-else>Choose a</p>
                  </h1>
                  <h2 class="subtitle">
                    <template v-if="!chooseLang">
                      Go to chat
                    </template>
                    <p v-else>Language</p>
                  </h2>
                </div>
              </div>
            </section>
          </template>

          <div v-if="messages.length>0" class="box content" style="overflow-y: scroll; height:530px; z-index:80;">

            <template v-for="(message, index) in messages">
              <Message :message="message" :index="index" :inbox="false">
                {{message.contents}}
              </Message>
            </template>

          </div>
        </div>
        <div class="column is-2">
          <div class="box content">
            <p @click="isActive('usersOnline')">Users ({{users | count}})</p>
            <template v-if="(users.length!=0)">
              <template v-for="(userC,index) in users">
                <p>
                  <span class="circle"></span>
                  <small>
                    <a @click="addPrivateUser(userC)">{{userC.user.name}}</a>
                  </small>
                </p>
              </template>
            </template>
          </div>
        </div>
      </div>
    </section>
    <Inbox v-if="inboxs.length!=0" v-for="(inbox, index) in inboxs" :user="inbox" :key="index">
      <template v-for="(mprivate,index) in messageprivated">
        <Message :message="mprivate" :index="index" :inbox="true">
          {{mprivate.contents}}
        </Message>
      </template>
    </Inbox>

    <Footer></Footer>
  </div>

</template>

<script>
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import Navbar from '@/components/utils/Navbar'
import Footer from '@/components/utils/Footer'
import MenuLeft from '@/components/utils/MenuLeft'
import Message from '@/components/Message'
import Inbox from '@/components/Inbox'
import ChatServices from '@/services/ChatServices'
import YandexServices from '@/services/YandexServices'

Vue.use(VueSocketio, 'ws://localhost:5000')

  export default {
    name: 'Home',
    data(){
      return {
        messages: [],
        messageprivated: [],
        user: {},
        chooseLang: false,
        language: 'en',
        languages: {},
        users: [],
        text: '',
        textprivated: '',
        userPrivated: {},
        inboxs:[],
        isLoad : false
      }
    },
    computed: {
      userPri (to) {
        return to;
      }
    },
    components:{
      Navbar,
      MenuLeft,
      Footer,
      Message,
      Inbox
    },
    sockets: {
      connect () {
        console.log('socket connected')
      },
      usersConnected (response) {
        this.loadUsers(response).then(()=>{
        })
      },
      addMessagePrivated (response) {
        console.log('received');
        if (response.ok) {
          this.messageprivated.push(response.data);
          this.textprivated = '';
        } else {
          console.log(response.err);
        }
      }
    },
    mounted() {
      this.getUser()
      this.getLangs()
    },
    filters: {
      count (users) {
        return users.length;
      }
    },
    watch: {
      user (val) {
        this.user = val;
      },
      chooseLang (val) {
        if (val) {
          this.messages = []
        }
      }
    },
    methods: {
      loadUsers (response) {
        return new Promise ((resolve) => {
          let usersOn = response.data.map((element) => {
            return element
          })
          usersOn = usersOn.filter(function(n){ return n != undefined });
          this.users = usersOn;
          resolve()
        })
      },
      getLangs () {
        YandexServices.getLangs().then((response) => {
          console.log(response);
          this.languages = response.data.langs
        })
      },
      addPrivateUser (to) {
        this.inboxs.push(to);
        this.getHistorial(this.user._id, to.user._id);
      },

      getHistorial(user, to) {
        ChatServices.getHistorial(user, to).then((response) => {
          console.log(response.data);
          this.messageprivated = response.data;
        })
      },
      getMessagesLanguage () {
        ChatServices.getMessagesPerLanguage(this.language).then((response) => {
            this.messages = response.data
            console.log(response.data);
        })
      },
      getUser () {
        ChatServices.user().then((response) => {
          this.user = response.data;
          this.$socket.emit('userConnected', {
            user: this.user
          });
        }).catch((err) => {
          this.$router.push({name: 'Login'});
        });
      },
      addMessagePrivateSocket () {
        this.$socket.emit('addMessagePrivated', {
          to: this.userPrivated,
          user: this.user,
          text: this.textprivated
        });
      }
    }
  }
</script>
<style >
@import '../assets/css/styles.css';
.circle:before {
  content: ' \25CF';
  font-size: 20px;
  color:#23d160;
}

.containerinbox {
    background-color: rgba(255, 0, 255, 0.2);
    position: absolute;
    left: 10px;
    top: 10px;
    width: calc(100% - 200px);
    height: auto;
    overflow-x: auto;
    white-space: nowrap;
}

.iteminbox {
    background-color: rgba(255, 0, 0, 0.2);
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
}
</style>
