import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
  },
  actions: {
  },
  modules: {
  },
  getters: {
    chatList: (state, getters) => state.chatList.filter(chat => chat.new >= 2) // vuex 내부에 접근할 수 있는 state 값, 개발자가 만든 다른 getter 들에 접근할 수 있도록 만든 getter 들이 들어온다.
  }
})
