<script setup lang="ts">
import  RightChat  from "./RightChat.vue"
import LeftChat  from "./LeftChat.vue"
defineProps(['messages', 'chatNum'])
</script>

<template>
    <main class="w-1/4">
        <RightChat :message=messages[chatNum-1] />
        <LeftChat :message=messages[chatNum] />
    </main>
</template>