<script setup lang="ts">
import { ref } from 'vue'
import { usePodcastStore } from '@/stores/podcast'
// import AudioPlayer from "./audioPlayer.vue";
const podcastStore = usePodcastStore()
let topic = ref('')
let btnLoading = ref(false)

function submitTopic(topic = 'Technology and physical health', start_by = 'hayat') {
  btnLoading.value = true
  podcastStore.topic = topic
  podcastStore.speaker_1 = start_by
  podcastStore.setSpeaker({})
  podcastStore.generateTextContent().then(() => {
    btnLoading.value = false
  })
}
</script>

<template>
  <main>
    <div class="flex w-full">
      <!-- <AudioPlayer/> -->
      <!-- <audio controls autoPlay > -->
        <!-- <source :src= type="audio/mpeg" /> -->
      <!-- </audio> -->

      <div class="p-4 w-full">
        <form @submit.prevent="submitTopic(topic)" class="flex flex-col justify-center">
          <it-input class="text-xl placeholder:text-xl" v-model="topic" placeholder="Topic for the podcast" required/>
          <it-button class="mt-6 text-xl" type="submit" variant="primary" size="big" :loading = "btnLoading" style="font-family: 'Satoshi', sans-serif;" >Generate Podcast</it-button>
        </form>
      </div>
    </div>
  </main>
</template>
