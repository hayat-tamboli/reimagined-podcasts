<script setup lang="ts">
import { ref } from 'vue'
import { usePodcastStore } from '@/stores/podcast'
const podcastStore = usePodcastStore()
let topic = ref('')
let btnLoading = ref(false)
// TODO: change test back to false before production
let isTest = ref(false)

function submitTopic(topic: string) {
  podcastStore.$reset
  btnLoading.value = true
  podcastStore.topic = topic
  podcastStore.generateTextContent(isTest.value).then(() => {
    podcastStore.chatComplete = true
    btnLoading.value = false
  })
}
</script>

<template>
  <main>
    <div class="flex w-full">
      <div class="p-4 w-full">
        <form @submit.prevent="submitTopic(topic)" class="flex flex-col justify-center">
          <it-input
            class="text-xl placeholder:text-xl"
            v-model="topic"
            placeholder="Topic for the podcast"
            :required = !isTest
          />
          <it-button
            class="mt-6 text-xl"
            type="submit"
            variant="primary"
            size="big"
            :loading="btnLoading"
            style="font-family: 'Satoshi', sans-serif"
            >Generate Podcast</it-button
          >
        </form>
      </div>
    </div>
  </main>
</template>
