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
            this.$emit('click', {...this.chat});
        }
    },
}
</script>