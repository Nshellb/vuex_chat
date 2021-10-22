<template>
    <button type="button" class="list-group-item text-left d-flex justify-content-between align-items-center" @click="itemClick">
        {{ chat.lastMessage }}
        <span class="badge badge-primary badge-pill"> {{ chat.new }} </span>
    </button>
</template>

<script>
import { bus } from '@/event-bus.js'; // 파일에서 export 한 bus 를 가져옴.

export default {
    props: ['chat'],
    methods: {
        itemClick() {
            bus.$emit('CHAT_CLICK', {...this.chat}); // event-bus 의 CHAT_CLICK 이라는 event 를 발생시킨다.
        }
    },
}
</script>