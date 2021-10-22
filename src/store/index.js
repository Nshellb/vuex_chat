import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV != 'production', // vuex 외부에서 비정상적인 접근 차단을 위한 strict mode 켜기.
  state: { // copmonent 에서 data 값 정의 하듯이 작성.
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
  },
  mutations: {
    readChat(state, chat) { // 각 prameter는 내부 state 값에 접근할 수 있는 state, Mutation 을 실행될때 넘겨받는 값. // readChat 의 parameter 로 ChatListItem.vue 의 props chat 에 들어있는 채팅 정보인 클릭한 체팅 항목의 data 값이 들어간다.
      // mutation 안에서 넘겨받은 chat 값을 가지고 state 값을 변경하는 로직
      state.chatList.forEach(item => { // state 안에 있는 chatList 값에 forEach 구문을 돌면서 
        if (item.id === chat.id) { // 넘겨받은 chat의 id 값(chat.id)과 기존 state 의 chatList 값인 item id 값(item.id)과 같다면 
          item.new = 0; // 해당 항목의 new 값을 0으로 설정.
        }
      })
    }
  },
  actions: {
  },
  modules: {
  },
})
