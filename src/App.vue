<template>
  <div id="app">
    <button type="button" @click="makeEvent">이벤트 생성</button>
  </div>
</template>

<script>
import Vue from 'vue'; // 새로운 vue 인스턴스를 만들어서
const bus = new Vue(); // bus 라는 상수에 저장

export default {
  name: 'app',
  methods: {
    makeEvent() { // 생성한 버튼과 연결할 click event method 를 만들고
      bus.$emit('BUTTON-CLICK', 'data'); // $emit 으로 bus 의 BUTTON-CLICK event 를 발생시키고 parameter 로 data 를 넘겨줌.
    }
  },
  created() { // componet 가 생성될때 실행되는 method
    bus.$on('BUTTON-CLICK', data => { // 새로운 vue 인스턴스가 들어있는 bus 에 $on 이라는 method 로 BUTTON-CLICK 이라는 event 를 받아서 
      console.log(data); // console.log 로 값을 출력하도록 만든다.
    });
  },
}
</script>

<style>
</style>
