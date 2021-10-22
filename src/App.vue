<template>
  <div id="app">
    <Header
      :new-message-count="newMessageCount"
    />
    <div class="container mx-auto mt-5">
      <ChatList
        :chat-list="chatList"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // vuex 에서 Data 를 가져오기 위한 mapState helper
import Header from '@/components/Header.vue';
import ChatList from '@/components/ChatList.vue';

import { bus } from '@/event-bus.js'; // 파일에서 export 한 bus 를 가져옴.

export default {
  name: 'app',
  data() {
    return {
    };
  },
  computed: {
    newMessageCount() { // 전체 count 계산 method
      return this.chatList.map(item => item.new).reduce((a, b) => a + b); // App.vue 에 선언된 chatList 에서 item => item.new 값만 가져온뒤 reduce(더하기) 연산
    },
    ...mapState({ // parameter 로 넘긴 json 값을 가지고 개발자가 원하는 state 를 꺼내와서 computed 로 사용할 수 있는 json 객체를 return 한다.
      chatList: 'chatList'
    })
  },
  methods: {
    readChatItem(chatItem) { // 각 항목에 click event 를 받아서 count 를 0으로 만들어주는 method
      this.chatList.filter(item => item.id === chatItem.id)[0].new = 0; // 클릭한 item 값의 id 값을 찾아서 클릭한 항목의 알림 count 를 0으로 만든다.
    }
  },
  created() { // componet 가 생성될때 실행되는 method
    bus.$on('CHAT_CLICK', chat => { // CHAT_CLICK event 를 받아와서
      this.readChatItem(chat); // 기존에 선언한 readChatItem 를 호출
    });
  },
  mounted() {
    console.log(this.$store); // store 연결확인.
  },
  components: {
    Header,
    ChatList,
  }
}
</script>

<style>
</style>
