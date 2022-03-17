Vue.js 를 활용한 채팅 메시지를 클릭하면 삭제되는 웹.
(10.22.2021.)

Vuex 를 활용한 상태 관리 공부를 위한 개발이다.

![image](https://user-images.githubusercontent.com/24907719/158751488-d2183cca-eec1-4aec-b912-50c71e6c5879.png)


Vue.js 상태관리 - 각 part 설명

App.vue

읽지 않은 메시지 알림이 각 행에 부여되고
상단바 알림창에 모두 합한 값의 알림이 출력된다.



전체 message count 값은 computed 로 Header 에 표시하도록 넘겨준다.

ChatList 에는 ChatList 배열을 넘겨주며
각 항목이 클릭했을 때 발생하는 이벤트는 readChatItem 이라는 method 와 연결해준다.



Header.vue

App.vue 에서 넘겨받은 전체 message count 값을 출력
props 로 넘겨받은값을 사용했다.


[프로젝트간 유기적으로 임시적인 설정값등을 짧은 경로간에 넘겨주는 경우에는 props 를 사용하고
vuex 를 사용하면 전역적인 범위에서 어디서든 값을 가져올수 있는것 같다.]



ChatList.vue

App.vue 에서 넘겨 받은 chatList 배열을 가지고 v-for 구문을 돌려서 ChatListItem componet 를 출력해준다.



ChatListItem.vue

ChatList.vue 에서 넘겨받은 lastmessage 와 읽지 않은 chat count 를 button 에 출력한다.
button 의 click event 발생시 itemClick 이벤트를 발생시켜서 'click' 이라는 component click event 를 발생시킨다.
(ChatList 에 선언된 ChatListItem @click="itemClick" 을 호출.)

ChatListItem.vue 의 click event 인 'click' 으로 
ChatList.vue 의 click event 인 'itemClick' 을 호출하고
App.vue 의 click event 인 'read-item' 을 호출한다.



App.vue의 Data 를 Header.vue 와 ChatList.vue 에 props 로 각각 전달하고
ChatList.vue 에서 props 로 전달받은 Data 는 다시 ChatListItem.vue 에 props 로 전달한다.

message count 를 App.vue 에서 각 componet 에 동기화 되는 구조.
그러나 componet 가 추가될때 마다 App.vue 에서 동기화 하기위한 로직이 추가되어야 하는 번거로움이 있다.





