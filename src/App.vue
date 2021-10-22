<template>
  <div id="app">
    <Header
      :new-message-count="newMessageCount"
    />
    <div class="container mx-auto mt-5">
      <ChatList
        :chat-list="chatList"
        @read-item="readChatItem"
      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import ChatList from '@/components/ChatList.vue'

export default {
  name: 'app',
  data() {
    return {
      chatList: [ // chatList 임의 지정
        {
          id: 1, // chat 식별 번호
          lastMessage: '채팅 메시지1', // 가장 마지막으로 전달 받은 채팅 메시지
          new: 1, // 읽지 않은 채팅 메시지 개수 count
        },
        {
          id: 2,
          lastMessage: '채팅 메시지2',
          new: 2,
        },
        {
          id: 3,
          lastMessage: '채팅 메시지3',
          new: 1,
        },
        {
          id: 4,
          lastMessage: '채팅 메시지4',
          new: 5,
        },
      ]
    };
  },
  computed: {
    newMessageCount() { // 전체 count 계산 method
      return this.chatList.map(item => item.new).reduce((a, b) => a + b); // App.vue 에 선언된 chatList 에서 item => item.new 값만 가져온뒤 reduce(더하기) 연산
    }
  },
  methods: {
    readChatItem(chatItem) { // 각 항목에 click event 를 받아서 count 를 0으로 만들어주는 method
      this.chatList.filter(item => item.id === chatItem.id)[0].new = 0; // 클릭한 item 값의 id 값을 찾아서 클릭한 항목의 알림 count 를 0으로 만든다.
    }
  },
  components: {
    Header,
    ChatList,
  }
}
</script>

<style>
</style>
