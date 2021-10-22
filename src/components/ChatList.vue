<template>
    <div>
        <div class="list-group">
            <template v-for="chat in chatList">
                <ChatListItem
                    :chat="chat"
                    @click="itemClick"
                />
            </template>
        </div>
    </div>
</template>

<script>
import ChatListItem from '@/components/ChatListItem.vue';

export default {
    props: ['chatList'],
    methods: {
        itemClick(chatItem) {
            this.$emit('read-item', chatItem);
        }
    },
    components: {
        ChatListItem,
    }
}
</script>