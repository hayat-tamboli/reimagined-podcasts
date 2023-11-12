<script setup lang="ts">
import TopicForm from '@/components/TopicForm.vue'
import  RightChat  from "@/components/RightChat.vue"
import LeftChat  from "@/components/LeftChat.vue"
import { usePodcastStore } from '@/stores/podcast'
const podcastStore = usePodcastStore()
</script>

<template>
  <main class="flex flex-col justify-center items-center h-screen">
    <TopicForm class="w-2/4"/>
    <div class=" w-2/4 overflow-y-scroll max-h-96">
    <div
    class=""
    id="chatbox"
    v-for="chat,n in podcastStore.chatArr"
      :key="chat"
    >
    <LeftChat v-if="(n%2 !=0)" :message="chat"></LeftChat>
    <RightChat v-if="(n%2 ==0)" :message="chat"></RightChat>
    </div></div>
  </main>
</template>
