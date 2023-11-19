<script setup lang="ts">
import { ref, watch } from 'vue'
import TopicForm from '@/components/TopicForm.vue'
import tableSVG from '@/assets/table.svg'
import yashComputer from '@/assets/yash/yash-laptop.svg'
import hayatComputer from '@/assets/hayat/hayat-laptop.svg'
import CharectorAnim from '@/components/CharectorAnim.vue'
import ChatBox from '@/components/ChatBox.vue'
import AudioPlayer from '@/components/audioPlayer.vue'
import { usePodcastStore } from '@/stores/podcast'
const podcastStore = usePodcastStore()
let introVideo = ref<any>(null)
let introVideoELement = introVideo.value
let voiceC = ref(podcastStore.voiceComplete)
watch(voiceC, ()=>{
  console.log("woa this works, video can start from now")
  PlayVideo()
})

function PlayVideo() {
  if (introVideoELement) {
    introVideoELement.play()
  }
}
function reload(){
  history.go()
}
</script>

<template>
  <main class="flex flex-col justify-center items-center h-screen overflow-clip" id="bg">
    <TopicForm
      class="w-2/5 z-20 bg-slate-200 p-2 rounded-md shadow-xl"
      v-show="!podcastStore.chatComplete"
    />
    <ChatBox :podcastStore="podcastStore" />
    <!-- <video class="z-50 w-full h-full absolute top-0 left-0 object-cover" ref="introVideo" v-show="podcastStore.voiceComplete">
      <source src="../assets/intro-vid.mp4" type="video/mp4"/>
      Your browser does not support the video tag.
    </video> -->
    <div>
      <Transition name="fromRight">
        <CharectorAnim
          src="hayat_animation.riv"
          class="w-72 absolute right-32 bottom-48 z-0"
          :animation="podcastStore.hayatAnim"
          v-show="podcastStore.chatComplete"
        />
      </Transition>

      <Transition name="fromLeft">
        <CharectorAnim
          src="yash_animation.riv"
          class="w-72 absolute left-32 bottom-48 z-0"
          :animation="podcastStore.yashAnim"
          v-show="podcastStore.chatComplete"
        />
      </Transition>
      <Transition name="fromLeft">
        <img
          :src="yashComputer"
          alt=""
          class="w-72 absolute left-80 bottom-40 z-10"
          v-show="podcastStore.chatComplete"
        />
      </Transition>
      <Transition name="fromRight">
        <img
          :src="hayatComputer"
          alt=""
          class="w-72 absolute right-80 bottom-36 z-10"
          v-show="podcastStore.chatComplete"
        />
      </Transition>
      <img :src="tableSVG" alt="" class="w-screen absolute z-0 bottom-0 left-0" />
    </div>
    <Transition name="fromBottom">
      <div
        class="w-full bg-slate-200 h-28 absolute bottom-0 left-0 p-4 text-lg flex justify-between items-center"
        v-show="podcastStore.chatComplete"
      >
        <div class="flex justify-center items-center">
          <img src="../assets/podcast-image.png" alt="" class="w-20 rounded-lg" />
          <p class="p-4">
            Topic of discussion: <b>{{ podcastStore.topic }}</b>
          </p>
          <button type="button" class="rounded-full p-2 hover:bg-slate-600 hover:text-white " @click="reload">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6"> <path d="M18 2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v2H2v6h6v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2V2zm0 8h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2h2v-2h2v-2h2V8h2V6h2v2h2v2zM6 16H4v4h4v-2H6v-2z" fill="currentColor"/> </svg>
    </button>
        </div>
        <div v-if="!podcastStore.voiceComplete" class="flex justify-center items-center text-3xl">
          <div role="status" class="p-2">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-400 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          Voice Loading ...
        </div>

        <AudioPlayer
          :blobUrls="podcastStore.blobURLs"
          v-if="podcastStore.voiceComplete"
          class="z-20"
        />
      </div>
    </Transition>
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
.fromLeft-enter-active,
.fromLeft-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fromLeft-enter-from,
.fromLeft-leave-to {
  opacity: 0;
  left: 0;
}
.fromRight-enter-active,
.fromRight-leave-active {
  transition: all 0.5s ease;
}

.fromRight-enter-from,
.fromRight-leave-to {
  opacity: 0;
  right: 0;
}
.fromBottom-enter-active,
.fromBottom-leave-active {
  transition: all 0.5s ease;
}

.fromBottom-enter-from,
.fromBottom-leave-to {
  bottom: -120px;
}
</style>
