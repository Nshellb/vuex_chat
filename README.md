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

App.vue 에서 넘겨 받은 chatList 배열을 가지고 v-for 구문을 돌려서 ChatListItem component 를 출력해준다.



ChatListItem.vue

ChatList.vue 에서 넘겨받은 lastmessage 와 읽지 않은 chat count 를 button 에 출력한다.
button 의 click event 발생시 itemClick 이벤트를 발생시켜서 'click' 이라는 component click event 를 발생시킨다.
(ChatList 에 선언된 ChatListItem @click="itemClick" 을 호출.)

ChatListItem.vue 의 click event 인 'click' 으로 
ChatList.vue 의 click event 인 'itemClick' 을 호출하고
App.vue 의 click event 인 'read-item' 을 호출한다.



App.vue의 Data 를 Header.vue 와 ChatList.vue 에 props 로 각각 전달하고
ChatList.vue 에서 props 로 전달받은 Data 는 다시 ChatListItem.vue 에 props 로 전달한다.

message count 를 App.vue 에서 각 component 에 동기화 되는 구조.
그러나 component 가 추가될때 마다 App.vue 에서 동기화 하기위한 로직이 추가되어야 하는 번거로움이 있다.






Vue.js 상태관리 - Event bus

Event-bus 를 이용한 부모-자식간 component 로 연관되지 않은 component 끼리 event 를 주고 받는 방법.
event 를 받아 Data 를 update 하는 방법.



App.vue 에서 기존 방식으로 event 를 받아오는 방법
App.vue 과 ChatList.vue 와 같이 부모자식 관계의 component 끼리는 this.$emit 을 통해서 이벤트를 발생시키고
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
로그인한 유저정보와 같은 다양한 component 에서 사용하는 Data 와 같은 Data 를 한번에 가져오고 수정이 가능하다.






Vue.js 상태관리 - Vuex 소개 및 설치

1) Vuex 소개

Vuex 는 Data 를 성격에 맞게 Grouping 해서 개발자가 원하는 Data 에 좀 더 직관적으로 접근할 수 있도록 도와주기도 하고
Data 변경 이력을 남겨 전후사항을 판단할 수 있도록 하여 디버깅을 원활히 할 수 있도록 도와준다.


여러 component 에서 사용할 Data들을 vuex 안에 있는 'State' 에 올려놓고 사용한다.
component 와 Data 가 분리됬기에 
component 에 Data 를 넘겨주고 하위 component event 를 상위 component 에서 받아 Data 를 수정해야하는 불편함이 없이 
Data 가 필요한 component 는 Vuex 에서 꺼내서 사용하고 
Data 수정이 필요한 경우 다시 Vuex 에게 알려주면 된다.


'Action' 과 'Mutation' 은 'State' 를 변경하기위한 단계이다.
component 에서 'State' 에 직접 접근해서 Data 를 수정하다보니 
component 가 많아질 수 록 Data 관리가 복잡해지기 때문에(Data 동기화 문제 등)
'Action' 과 'Mutation' 단계를 추가하여 관리하는 것이다.


Action 은 비동기 처리가 가능하고 
Mutation 은 동기 처리만 가능하다.
Data 변경을 쉽게 추적하기 위해 동기/비동기 처리 단계를 구분해놓은 것이다.

Mutaion 은 동기 처리만 가능하기 때문에 Mutation 으로 넘어온 값으로 State 값이 변경됨을 보장한다.
-> Mutation 으로 log 를 남기면 State 값이 언제 변경되었는지, 어떤 Mutation 에 의해 바뀌었는지 추적이 가능하다.

(ex. chat message 클릭시 
-> component 는 click event 를 받아서 click 이 일어난 message 를 포함해서 Action 을 실행한다.
-> Action 은 Ajax 로 api 를 호출해서 서버에 있는 DB 에 해당 chat message 상태를 안읽음->읽음으로 변경한다.
-> 이어서 Mutation 을 호출해서 State 를 변경한다.
-> 변경된 State 값은 component 로 들어가서 읽지않은 message count 와 같은 값들을 바꾼다.)

Data 의 흐름이 단방향으로 이루어지기 때문에 단방향 Data Binding 이라고 부른다.



2) Vuex 설치
vue 프로젝트 위치에서 vuex 설치
> npm install vuex --save

vuex 관련 코드를 넣을 src/store/index.js 생성
vuex 관련 코드를 작성한다.

main.js 파일에 store(store/index.js) 를 import 하고 
Vue 인스턴스 생성 위치에도 store 를 추가한다.
-> 모든 component 에서 store 에 접근이 가능해진다.


App.vue 에서 component 가 화면에 뿌려진뒤 실행되는 mounted method 에서
store 에 접근이 잘되는지 console.log 로 찍어서 확인.