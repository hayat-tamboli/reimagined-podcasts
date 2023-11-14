<template>
  <div class="flex">
    <audio ref="audioPlayerC" autoplay @ended="playNext"></audio>
    <it-button @click="playAll" class="m-2"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2V2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2v2z"
          fill="currentColor"
        /></svg
      >Replay</it-button
    >
    <it-button @click="Pause" class="m-2"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 4H5v16h5V4zm9 0h-5v16h5V4z" fill="currentColor" /></svg
      >Pause</it-button
    >
    <it-button @click="Play" class="m-2"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z" fill="currentColor" />
      </svg>
      Play</it-button
    >
  </div>
</template>

<script lang="ts">
import { usePodcastStore } from '@/stores/podcast'

export default {
  props: ['blobUrls'],
  data() {
    return {
      currentIndex: 0,
      play: false
    }
  },
  mounted() {
    this.playAll()
  },
  methods: {
    Pause() {
      const podcastStore = usePodcastStore()
      const audioPlayer: any = this.$refs.audioPlayerC
      audioPlayer.pause()
      podcastStore.hayatAnim = 'idle'
      podcastStore.yashAnim = 'idle'
    },
    Play() {
      const podcastStore = usePodcastStore()
      const audioPlayer: any = this.$refs.audioPlayerC
      audioPlayer.play()
      this.play = true
      if (this.currentIndex / 2 != 0) {
        podcastStore.hayatAnim = 'idle'
        podcastStore.yashAnim = 'speaking'
      } else {
        podcastStore.hayatAnim = 'speaking'
        podcastStore.yashAnim = 'idle'
      }
    },
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
      } else {
        podcastStore.hayatAnim = 'idle'
        podcastStore.yashAnim = 'idle'
      }
    }
  }
}
</script>
