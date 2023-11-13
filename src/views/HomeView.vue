<script setup lang="ts">
import TopicForm from '@/components/TopicForm.vue'
import tableSVG from '@/assets/table.svg'
import yashComputer from '@/assets/yash/yash-laptop.svg'
import hayatComputer from '@/assets/hayat/hayat-laptop.svg'
import CharectorAnimation from '@/components/CharectorAnim.vue'
import ChatBox from '@/components/ChatBox.vue'
import AudioPlayer from '@/components/audioPlayer.vue'
import { usePodcastStore } from '@/stores/podcast'
const podcastStore = usePodcastStore()
</script>

<template>
  <main class="flex flex-col justify-center items-center h-screen overflow-clip" id="bg">
    <TopicForm class="w-2/5 z-20 bg-slate-200 p-2 rounded-md shadow-xl" />
    <AudioPlayer :blobUrls=podcastStore.blobURLs v-if="podcastStore.voiceComplete" class="z-20" />
    <ChatBox :podcastStore="podcastStore" />
    <div>
      <CharectorAnimation
        src="src\assets\hayat\hayat_animation.riv"
        class="w-72 absolute right-32 bottom-48 z-0"
        :animation= podcastStore.hayatAnim
      />
      <CharectorAnimation
        src="src\assets\hayat\hayat_animation.riv"
        class="w-72 absolute left-32 bottom-48 z-0"
        :animation= podcastStore.yashAnim
      />
      <img :src="yashComputer" alt="" class="w-72 absolute left-72 bottom-40 z-10" />
      <img :src="hayatComputer" alt="" class="w-72 absolute right-80 bottom-36 z-10" />
      <img :src="tableSVG" alt="" class="w-screen absolute z-0 bottom-0 left-0" />
    </div>
  </main>
</template>

<style>
#bg {
  background-image: url('../assets/bg.png');
  background-size: cover;
}
/* #main-chat-box::-webkit-scrollbar {
  display: none;
}
#main-chat-box {
  -ms-overflow-style: none; 
  scrollbar-width: none;  
} 

*/
</style>
