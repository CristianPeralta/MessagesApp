<template lang="html">
	<div ref="allbox" id="live-chat">

		<header @click="minimize" class="clearfix">

			<a @click="close($event)" class="chat-close">x</a>

			<h4>{{user.user.name}}</h4>

			<span ref="counter" class="chat-message-counter">3</span>

		</header>

		<div ref="chat" class="chat">

			<div class="chat-history">
				<template>
					<div class="chat-message clearfix">

						<div class="chat-message-content clearfix">
						</div> <!-- end chat-message-content -->

					</div> <!-- end chat-message -->

					<hr>
				</template>
				<slot></slot>

			</div> <!-- end chat-history -->

			<p class="chat-feedback">Your partner is typing…</p>

				<fieldset>

					<input type="text" placeholder="Type your message…" v-model="text" autofocus>
					<input type="hidden">
					<button type="button" @click="addMessage" name="button">Send</button>
				    <div class="select is-small">
							<select v-model="language" placeholder="Choose a language">
 							 <option v-for="(lang, prop) in $parent.languages" :value="prop">{{lang}}</option>
 						 </select>
				    </div>
				</fieldset>

		</div> <!-- end chat -->

	</div> <!-- end live-chat -->
</template>

<script>
export default {
  data () {
    return {
      open: true,
      heightChecked: false,
      initHeight: 0,
			message: [],
			language: 'en',
			text: ''
    }
  },
  props: ['user'],
  methods: {
		addMessage () {
			this.$parent.$socket.emit('addMessagePrivated', {
				to: {
					user: this.user.user._id,
					id: this.user.id
				},
				from: this.$parent.user._id,
				contents: this.text,
				lang: this.language
			});

			this.text = '';
		},
    minimize () {
      this.slideToggle(this.$refs.chat);
    },
    close (e) {
      e.preventDefault();
      this.fadeOut(this.$refs.allbox);
    },
    slideToggle(el) {
      if(!this.heightChecked) {
          this.initHeight = el.offsetHeight;
          this.heightChecked = true;
      }
      if(this.open) {
          this.open = false;
          el.style.height = '0px';
      }
      else {
          this.open = true;
          el.style.height = this.initHeight + 'px';
      }
    },
    fadeOut(el) {
        el.style.opacity = 1 / 100;
        el.style.filter = 'alpha(opacity=' + 1 + ')';
        if (1 == 1) {
            el.style.display = 'none';
        }
    }
  }
}
</script>

<style lang="css">
@import '../assets/css/imbox.css'
</style>
