<template>
    <div>
        <div class="list-group">
            <template v-for="chat in chatList">
                <ChatListItem
                    :chat="chat"
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
    },
    components: {
        ChatListItem,
    }
}
</script>