<script setup lang="ts">
import TopicForm from '@/components/TopicForm.vue'
import RightChat from '@/components/RightChat.vue'
import LeftChat from '@/components/LeftChat.vue'
import { usePodcastStore } from '@/stores/podcast'
import yashBody from '@/assets/yash-body-01.svg'
import hayatBody from '@/assets/hayat-body-01.svg'
import yashComputer from '@/assets/yash-laptop.svg'
import hayatComputer from '@/assets/hayat-laptop.svg'
import tableSVG from '@/assets/table.svg'
const podcastStore = usePodcastStore()
</script>

<template>
  <main class="flex flex-col justify-center items-center h-screen overflow-clip" id="bg">
    <TopicForm class="w-2/4 z-20" />
    <div class="font-bold text-3xl p-2 m-2 rounded-lg bg-opacity-40 bg-white"> Today we are talking on {{ podcastStore.topic }} </div>
    <div class="w-2/5 overflow-y-scroll max-h-72 z-20 mb-80" style="font-family: 'Satoshi', sans-serif;">
      <div id="chatbox" v-for="n in podcastStore.messages.length" :key="n">
        <LeftChat v-if="n % 2 != 0" :message="podcastStore.messages[n-1].message"></LeftChat>
        <RightChat v-if="n % 2 == 0" :message="podcastStore.messages[n-1].message"></RightChat>
      </div>
    </div>
    <img :src="yashBody" alt="" class="w-72 absolute left-32 bottom-40" />
    <img :src="hayatBody" alt="" class="w-72 absolute right-32 bottom-28" />
    <img :src="yashComputer" alt="" class="w-72 absolute left-72 bottom-40 z-10" />
    <img :src="hayatComputer" alt="" class="w-72 absolute right-80 bottom-36 z-10" />
    <img :src="tableSVG" alt="" class="w-screen absolute z-0 bottom-0" />
  </main>
</template>

<style>
#bg {
  background-image: url('../assets/bg.png');
  background-size: cover;
}
</style>
