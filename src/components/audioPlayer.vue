<template>
  <div>
    <audio ref="audioPlayerC" autoplay @ended="playNext"></audio>
    <it-button @click="playAll" class="m-2">Play podcast again</it-button>
  </div>
</template>

<script lang="ts">
import { usePodcastStore } from '@/stores/podcast'

export default {
  props: ['blobUrls'],
  data() {
    return {
      currentIndex: 0
    }
  },
  mounted() {
    this.playAll()
  },
  methods: {
    playAll() {
      const podcastStore = usePodcastStore()
      podcastStore.hayatAnim = 'speaking'
      podcastStore.yashAnim = 'idle'
      this.currentIndex = 0
      this.playCurrent()
    },
    
    playCurrent() {
      const audioPlayer: any = this.$refs.audioPlayerC
      audioPlayer.src = this.blobUrls[this.currentIndex]
      audioPlayer.load()
      audioPlayer.play()
    },
    playNext() {
      const podcastStore = usePodcastStore()
      this.currentIndex++
      if (this.currentIndex < this.blobUrls.length) {
        if (this.currentIndex / 2 != 0) {
        podcastStore.hayatAnim = 'idle'
        podcastStore.yashAnim = 'speaking'
      } else {
        podcastStore.hayatAnim = 'speaking'
        podcastStore.yashAnim = 'idle'
      }
        this.playCurrent()
      }
      else{
        podcastStore.hayatAnim = 'idle'
        podcastStore.yashAnim = 'idle'
      }
    },
  }
}
</script>
