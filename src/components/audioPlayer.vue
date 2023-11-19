<script lang="ts">
import { usePodcastStore } from '@/stores/podcast'

export default {
  props: ['blobUrls'],
  data() {
    return {
      currentIndex: 0,
      play: false,
      combinedURL: ''
    }
  },
  mounted() {
    this.playAll()
  },
  methods: {
    setYashSpeaking(podcastStore: any) {
      podcastStore.hayatAnim = 'idle'
      podcastStore.yashAnim = 'speaking'
    },
    setHayatSpeaking(podcastStore: any) {
      podcastStore.hayatAnim = 'speaking'
      podcastStore.yashAnim = 'idle'
    },
    setBothAnimationIdle(podcastStore: any) {
      podcastStore.hayatAnim = 'idle'
      podcastStore.yashAnim = 'idle'
    },

    Pause() {
      this.play = !this.play
      const podcastStore = usePodcastStore()
      const audioPlayer: any = this.$refs.audioPlayerC
      audioPlayer.pause()
      podcastStore.hayatAnim = 'idle'
      podcastStore.yashAnim = 'idle'
    },
    Play() {
      this.play = !this.play
      const podcastStore = usePodcastStore()
      const audioPlayer: any = this.$refs.audioPlayerC
      audioPlayer.play()
      if (this.currentIndex / 2 != 0) {
        this.setYashSpeaking(podcastStore)
      } else {
        this.setHayatSpeaking(podcastStore)
      }
    },
    playAll() {
      this.getCombinedURL()
      const podcastStore = usePodcastStore()
      this.setHayatSpeaking(podcastStore)
      this.currentIndex = 0
      this.playCurrent()
    },

    playCurrent() {
      const audioPlayer: any = this.$refs.audioPlayerC
      audioPlayer.src = this.blobUrls[this.currentIndex]
      audioPlayer.load()
      audioPlayer.play()
    },
    PlayPrevious() {
      const podcastStore = usePodcastStore()
      this.currentIndex--
      if (this.currentIndex >= 0) {
        if (this.currentIndex / 2 != 0) {
          this.setYashSpeaking(podcastStore)
        } else {
          this.setHayatSpeaking(podcastStore)
        }
        this.playCurrent()
      } else {
        this.setBothAnimationIdle(podcastStore)
      }
    },
    playNext() {
      const podcastStore = usePodcastStore()
      this.currentIndex++
      if (this.currentIndex < this.blobUrls.length) {
        if (this.currentIndex / 2 != 0) {
          this.setYashSpeaking(podcastStore)
        } else {
          this.setHayatSpeaking(podcastStore)
        }
        this.playCurrent()
      } else {
        this.setBothAnimationIdle(podcastStore)
      }
    },
    getCombinedURL() {
      const podcastStore = usePodcastStore()
      this.combinedURL = podcastStore.completePodcastURI
    },
    downloadPodcast() {
      const link = document.createElement('a')
      link.href = this.combinedURL
      link.download = 'Aironicals_podcast.mp3' // Replace with your desired file name

      // Append the link to the body
      document.body.appendChild(link)

      // Programmatically trigger the click event
      link.click()

      // Clean up: remove the link from the DOM
      document.body.removeChild(link)
    }
  }
}
</script>

<template>
  <div class="flex">
    <audio ref="audioPlayerC" autoplay @ended="playNext"></audio>
    <button
      @click="PlayPrevious"
      class="m-2 px-6 text-sm font-semibold shadow-sm rounded-md border border-slate-200 text-slate-900 bg-white flex flex-col justify-center items-center"
      type="button"
    >
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12">
        <path
          d="M21 3v18H3V3h18zM5 19h14V5H5v14zm12-8v2h-6v2H9v-2H7v-2h2V9h2v2h6zm-4-2h-2V7h2v2zm0 8v-2h-2v2h2z"
          fill="currentColor"
        />
      </svg>
      Previous Speaker
    </button>
    <it-button @click="playAll" class="m-2"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2V2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2v2z"
          fill="currentColor"
        /></svg
      >Replay</it-button
    >
    <it-button @click="Pause" class="m-2" v-show="!play"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 4H5v16h5V4zm9 0h-5v16h5V4z" fill="currentColor" /></svg
      >Pause</it-button
    >
    <it-button @click="Play" class="m-2" v-show="play"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z" fill="currentColor" />
      </svg>
      Play</it-button
    >
    <button
      @click="playNext"
      class="m-2 px-6 text-sm font-semibold shadow-sm rounded-md border border-slate-200 text-slate-900 bg-white flex flex-col justify-center items-center"
      type="button"
    >
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12">
        <path
          d="M3 21V3h18v18H3zM19 5H5v14h14V5zM7 13v-2h6V9h2v2h2v2h-2v2h-2v-2H7zm4 2h2v2h-2v-2zm0-8v2h2V7h-2z"
          fill="currentColor"
        />
      </svg>
      Next Speaker
    </button>
    <button
      @click="downloadPodcast"
      class="m-2 px-6 text-sm font-semibold shadow-sm rounded-md border border-slate-200 text-slate-900 bg-white flex flex-col justify-center items-center"
      type="button"
    >
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12">
        <path
          d="M11 4h2v8h2v2h-2v2h-2v-2H9v-2h2V4zm-2 8H7v-2h2v2zm6 0v-2h2v2h-2zM4 18h16v2H4v-2z"
          fill="currentColor"
        />
      </svg>
      Download
    </button>
  </div>
</template>
