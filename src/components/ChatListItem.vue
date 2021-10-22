<template>
    <button type="button" class="list-group-item text-left d-flex justify-content-between align-items-center" @click="itemClick">
        {{ chat.lastMessage }}
        <span class="badge badge-primary badge-pill"> {{ chat.new }} </span>
    </button>
</template>

<script>
export default {
    props: ['chat'],
    methods: {
        itemClick() {
            this.$store.dispatch('readChat', {...this.chat}); // $store 의 dispatch method 로 Action 을 실행. / 실행할 Action 명, Action 에 넘길 data
        }
    },
}
</script>