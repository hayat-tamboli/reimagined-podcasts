<script setup lang="ts">
import TopicForm from '@/components/TopicForm.vue'
import RightChat from '@/components/RightChat.vue'
import LeftChat from '@/components/LeftChat.vue'
import { usePodcastStore } from '@/stores/podcast'
import yashBody from '@/assets/yash-body-01.svg'
import tableSVG from '@/assets/table.svg'
const podcastStore = usePodcastStore()
</script>

<template>
  <main class="flex flex-col justify-center items-center h-screen overflow-clip" id="bg">
    <TopicForm class="w-2/4 z-10" />
    <div class="w-2/4 overflow-y-scroll max-h-96 z-10">
      <div id="chatbox" v-for="n in podcastStore.messages.length" :key="n">
        <LeftChat v-if="n % 2 != 0" :message="podcastStore.messages[n-1].message"></LeftChat>
        <RightChat v-if="n % 2 == 0" :message="podcastStore.messages[n-1].message"></RightChat>
      </div>
    </div>
    <img :src="yashBody" alt="" class="w-72 absolute left-32 bottom-36" />
    <img :src="tableSVG" alt="" class="w-screen absolute z-0" />
  </main>
</template>

<style>
#bg {
  background-image: url('../assets/bg.png');
  background-size: cover;
}
</style>
