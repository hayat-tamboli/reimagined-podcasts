<script setup lang="ts">
import TopicForm from '@/components/TopicForm.vue'
import RightChat from '@/components/RightChat.vue'
import LeftChat from '@/components/LeftChat.vue'
import tableSVG from '@/assets/table.svg'
import yashBody from '@/assets/yash/yash-body.svg'
import yashComputer from '@/assets/yash/yash-laptop.svg'
import hayatComputer from '@/assets/hayat/hayat-laptop.svg'
// import hayatBody from '@/assets/hayat/hayat-body.svg'
// import hayatNormalEyes from '@/assets/hayat/eyes.svg'
// import hayatChashma from '@/assets/hayat/chashma.svg'
import HayatAnim from '@/components/hayatanim.vue'
import { usePodcastStore } from '@/stores/podcast'
const podcastStore = usePodcastStore()
</script>

<template>
  <main class="flex flex-col justify-center items-center h-screen overflow-clip" id="bg">
    <TopicForm class="w-2/5 z-20 bg-slate-200 p-2 rounded-md shadow-xl" />
    <div
      class="w-2/5 overflow-y-scroll max-h-72 z-50 mb-80"
      style="font-family: 'Satoshi', sans-serif"
      id="main-chat-box"
    >
      <div
        :class="{ 'animate-pulse': !podcastStore.chatComplete }"
        id="chatbox"
        v-for="n in podcastStore.messages.length"
        :key="n"
      >
        <RightChat v-if="n % 2 != 0" :message="podcastStore.messages[n - 1].message"></RightChat>
        <LeftChat v-if="n % 2 == 0" :message="podcastStore.messages[n - 1].message"></LeftChat>
      </div>
    </div>
    <div>
      <!-- <img :src="hayatChashma" alt="" class="w-52 absolute right-44 bottom-72 z-10" /> -->
      <!-- <img :src="hayatNormalEyes" alt="" class="w-52 absolute right-44 bottom-72 z-10" /> -->
      <!-- <img :src="hayatBody" alt="" class="w-72 absolute right-32 bottom-28 z-0" /> -->
      <HayatAnim
        src="src\assets\hayat\hayat_animation.riv"
        class="w-72 absolute right-32 bottom-48 z-0"
        :animation= podcastStore.hayatAnim
      />
      <img :src="yashBody" alt="" class="w-72 absolute left-32 bottom-40 z-0" />
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
#main-chat-box {

}

.v-enter-from {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 2s ease;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
</style>
