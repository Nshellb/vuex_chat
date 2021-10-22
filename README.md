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






Vue.js 상태관리 - Vuex 사용하기

1) Vuex 에 Data 넣기
App.vue 의 data 항목을 store/index.js 의 state 에 넣기.
App.vue 에서 없어진 chatList 를 vuex 에서 가져와야 함.

vuex 에서 Data 를 가져오기 위해서는 vuex 에서 제공하는 mapState helper 를 사용.
mapState helper 를 App.vue 에 import 하고
computed 에 mapState 로 값을 가져오는 구문 작성. (mapState 함수가 return 하는 값을 받아옴.)

(+ ...는 스프레드 연산자로, json 이나 배열을 쉽게 합칠 수 있게 한다.
아래는 예제 코드
let json1 = {a: 'a', b: 'b'};
let json2 = {c: 'c', d: 'd'};

{...json1, ...json2}

결과 : {a: "a", b: "b", c: "c", d: "d"} )

스프레드 연산자를 사용하면 개발자가 만든 코드와 mapState Helper 함수가 return 한 내용을 병합해서
computed 로 사용할 수 있도록 Vue.js 에게 알려주게된다.


2) Vuex state 의 data 가져오기
mapState 로 Data 를 꺼내오는 방법은 3가지가 있다.

방법 1 
vuex state 에서 받아올 값과 위치를 지정하는 방법
...mapState 내부에 다음 구문 정의.
chatList: state => state.chatList // component 에서 변수처럼 사용할 변수명 : State 에서 원하는 값을 꺼내올 익명함수를 정의
이 익명함수는 vuex state 를 parameter 로 받아서 내부에 접근이 가능하다.
브라우저 Vue 개발툴에서 vuex bindings 아래에 데이터가 잘 들어가 있는것을 확인할수 있다.


방법 2
Vuex state 에서 바로 값을 가져와서 적용하는 방법
...mapState 내부에 다음 구문 정의.
chatList: state => 'chatList' // vuex 의 state 값인 chatList 를 그대로 사용하여 가져옴.


방법 3
Vuex state 에서 해당하는 값을 method 형태로 가져오는 방법.
가져온 state 값과 내부 data 값을 가지고 계산해야하는 등의 복잡한 작업이 필요한 경우에 사용.
...mapState 내부에 다음 구문 정의.
chatList(state) {
    return state.chatList.filter(chat => chat.new >= 2); // method 를 선언하여 필요한 data 만 가져오는 로직 작성. new 가 2개 이상인 경우만 가져옴.
}

+ component 의 data 를 가져와서 사용하는 경우 ...mapState 안에 this.~ 으로 호출하면된다.



3) Getter 로 vuex 값 가져오기
여러 component 에서 공통으로 특정 값만 가져오는 로직을 사용할때 각 component 에 개별로 선언하지 않고
vuex 에 getter 로 정의해서 사용할 수 있다.

store/index.js 에 
state 정의와 같은 형태로 getter 영역을 작성하고
chatList: (state, getters) => state.chatList.filter(chat => chat.new >= 2) 
- (state, getters) : vuex 내부에 접근할 수 있는 state 값, 개발자가 만든 다른 getter 들에 접근할 수 있도록 만든 getter 들이 들어온다.
- state.chatList.filter(chat => chat.new >= 2) : method 를 선언하여 필요한 data 만 가져오는 로직 부분.

App.vue 에 
mapState 대신 mapGetters 를 import.



4) 비정상적인 vuex state 접근 차단 ( 2) 에서 이어짐 )
Action, Mutation 조작이 없는데도 클릭 event 에 따른 vuex new 가 0으로 바뀌는 조작이 이루어지고 있다.

store/index.js 에서
strict: true, 를 통해서 vuex strict mode 를 켜야한다.
strict mode 를 동작시키면 vuex 설계대로 동작하지 않는 event 들을 catch 해서 오류 메시지를 출력해준다.
(조작을 막지는 못하지만 오류 메시지를 통해서 로직 수정에 용이하게 사용할 수 있다.)

실제 배포시에 strict: true 를 사용하는 경우 성능저하 이슈가 발생할 수 있기 때문에
strict: process.env.NODE_ENV != 'production', 으로 사용한다.
nodejs 환경 변수를 사용해서 production 모드가 아닐때만 사용하도록 정의.
production mode 로 compile 하는경우에는 오류 메시지가 출력되지 않음.



5) State 를 변화시키는 Mutation 작성
state 처럼 mutations 영역을 작성.
선언한 mutation 에 기존 ChatListItem.vue 의 click event 실행 구문을 삭제하고
App.vue 에서도 기존 click event 와 관련된 구문을 삭제.

실제 클릭이 일어나는 component 인 ChatListItem.vue 의 click event method 에 vuex 를 활용한 구문을 작성한다.
this.$store.commit('readChat', {...this.chat}); // $store 의 commit method 로 Mutation 을 실행. / 실행할 Mutation 명, Mutation 에 넘길 data

ChatListItem.vue 의 props 인 chat 을 넘기는 것이 
src/store/index.js 안에 있는 Mutation 의 chat 에 채팅 항목 값이 넘어간다.

Mutation 에 넘겨받은 chat 값과 일치하는 id 값을 가진 state chatList 값의 new 값을 0으로 변경.(클릭한 항목의 new 값 0으로 변경)

console 에 오류가 찍히지는 않지만 
component 는 Action 을 실행하고 
Action 아 Mutation 을 실행하지만 그렇지 않고 있다.

component 에서 Mutation 을 바로 실행하기도 하지만 
Mutation은 항상 동기적이어야 한다.
-> Action 에서 비동기 처리를 한뒤 Mutation 에서 동기적 처리로 state 에 반영하는 형태로 실행되어야 한다.



6) Mutation 의 동기 처리하기 전을 위한 비동기 처리 Action 작성
state 처럼 actions 영역을 작성.
method 형태로 action 선언.

this.$store.dispatch('readChat', {...this.chat}); // $store 의 dispatch method 로 Action 을 실행. / 실행할 Action 명, Action 에 넘길 data.

Mutation 은 commit, Action 은 dispatch 로 실행된다.

실제 서비스 에서는 Action 에서 API 호출을 해서 서버 DB 에 읽음 상태로 변경한뒤 Mutation 을 실행하는 코드를 작성 하게될것.