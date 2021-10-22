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






Vue.js 상태관리 - Event bus

Event-bus 를 이용한 부모-자식간 componet 로 연관되지 않은 componet 끼리 event 를 주고 받는 방법.
event 를 받아 Data 를 update 하는 방법.



App.vue 에서 기존 방식으로 event 를 받아오는 방법
App.vue 과 ChatList.vue 와 같이 부모자식 관계의 componet 끼리는 this.$emit 을 통해서 이벤트를 발생시키고
App.vue 에서 @read-item="readChatItem" 형태로 받아온다.
각 component 의 하위항목이 늘어날때마다 불필요한 로직이 계속해서 추가되어야한다.



Event bus 예시
vue 에 기본적으로 선언된 event 관련 기능을 활용해서 vue 인스턴스를 별도로 만들어 event 를 발생시키고 받아오는 도구로 사용.

새로운 vue 인스턴스를 만들어서 bus 라는 상수에 저장한다. (import Vue 필요)
created method 에 BUTTON-CLICK event 에 대해 선언한다.
버튼클릭시에는 $emit 으로 선언한 BUTTON-CLICK event 를 실행시킨다.
결과적으로 BUTTON-CLICK event 의 실행결과인 console.log 로 data 를 출력한다.



Event bus 적용

1) src/event-bus.js 생성
새로운 Vue 인스턴스를 생성하고 bus 에 넣고 export.
이 파일을 import 해서 사용하면 된다.

ChatListItem.vue 에서 발생시키는 Click event 를 event-bus 를 통해 app 으로 전달.

2) ChatListItem.vue, ChatList.vue, App.vue 각각에서 전달받던 용도의 코드를 모두 제거
(click event 내용, @XXX="XXXX" 형태의 코드)
브라우저에서 확인시 기능 동작이 없을것임.

3) event-bus 코드 추가 
ChatListItem.vue 에 bus 추가. import 후 bus 의 event-bus 에 event 발생
App.vue 의 created 에 click event 를 받고 readChatItem 를 실행하는 bus  적용

기능 정상동작 확인.

기능이 많아지고 코드가 복잡해질 수 록 어떤 event 를 발생시키고 있는지 파악하기 힘들어 관리가 힘들다.
대형 프로젝트에서는 대개 vuex 를 활용하여 어떤 event 를 사용중인지 쉽게 파악하고
로그인한 유저정보와 같은 다양한 componet 에서 사용하는 Data 와 같은 Data 를 한번에 가져오고 수정이 가능하다.