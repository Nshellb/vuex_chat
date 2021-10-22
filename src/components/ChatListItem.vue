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
            this.$store.commit('readChat', {...this.chat}); // $store 의 commit method 로 Mutation 을 실행. / 실행할 Mutation 명, Mutation 에 넘길 data
        }
    },
}
</script>