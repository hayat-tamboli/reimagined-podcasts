<!-- <script setup lang="ts">
import { usePodcastStore } from '@/stores/podcast'
import { ref, onMounted } from 'vue'
let props = defineProps(['blobUrls'])
let currentIndex = 0
let audioPlayerC = ref<HTMLAudioElement | null>(null)
const audioPlayer = audioPlayerC.value
onMounted(() => {
  playAll()
})
function Pause() {
  const podcastStore = usePodcastStore()
  audioPlayer?.pause()
  podcastStore.hayatAnim = 'idle'
  podcastStore.yashAnim = 'idle'
}
function Play() {
  const podcastStore = usePodcastStore()
  audioPlayer?.play()
  if (currentIndex / 2 != 0) {
    podcastStore.hayatAnim = 'idle'
    podcastStore.yashAnim = 'speaking'
  } else {
    podcastStore.hayatAnim = 'speaking'
    podcastStore.yashAnim = 'idle'
  }
}
function playAll() {
  const podcastStore = usePodcastStore()
  podcastStore.hayatAnim = 'speaking'
  podcastStore.yashAnim = 'idle'
  currentIndex = 0
  playCurrent()
}

function playCurrent() {
  if (audioPlayer) audioPlayer.src = props.blobUrls[currentIndex]
  audioPlayer?.load()
  audioPlayer?.play()
}
function playNext() {
  const podcastStore = usePodcastStore()
  currentIndex++
  if (currentIndex < props.blobUrls.length) {
    if (currentIndex / 2 != 0) {
      podcastStore.hayatAnim = 'idle'
      podcastStore.yashAnim = 'speaking'
    } else {
      podcastStore.hayatAnim = 'speaking'
      podcastStore.yashAnim = 'idle'
    }
    playCurrent()
  } else {
    podcastStore.hayatAnim = 'idle'
    podcastStore.yashAnim = 'idle'
  }
}
function PlayPrevious() {
  const podcastStore = usePodcastStore()
  currentIndex--
  if (currentIndex >= 0) {
    if (currentIndex / 2 != 0) {
      podcastStore.hayatAnim = 'idle'
      podcastStore.yashAnim = 'speaking'
    } else {
      podcastStore.hayatAnim = 'speaking'
      podcastStore.yashAnim = 'idle'
    }
    playCurrent()
  } else {
    podcastStore.hayatAnim = 'idle'
    podcastStore.yashAnim = 'idle'
  }
}
</script>

<template>
  <div class="flex">
    <audio ref="audioPlayerC" autoplay @ended="playNext"></audio>
    <it-button @click="playAll" class="m-2"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12">
        <path
          d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2V2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2v2z"
          fill="currentColor"
        /></svg
      >Replay</it-button
    >
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
    <it-button @click="Pause" class="m-2"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12">
        <path d="M10 4H5v16h5V4zm9 0h-5v16h5V4z" fill="currentColor" /></svg
      >Pause</it-button
    >
    <it-button @click="Play" class="m-2"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12">
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
    <it-button @click="Download" class="m-2"
      ><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12">
        <path
          d="M13 17V3h-2v10H9v-2H7v2h2v2h2v2h2zm8 2v-4h-2v4H5v-4H3v6h18v-2zm-8-6v2h2v-2h2v-2h-2v2h-2z"
          fill="currentColor"
        />
      </svg>
      Download</it-button
    > 
  </div>
</template> -->

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
    PlayPrevious() {
      const podcastStore = usePodcastStore()
      this.currentIndex--
      if (this.currentIndex >= 0) {
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
    },
    downloadPodcast(){
      const audioPlayer: any = this.$refs.audioPlayerD
      const podcastStore = usePodcastStore()
      const comboBlobUrl = podcastStore.completePodcastURI
      audioPlayer.src = comboBlobUrl
      audioPlayer.download()
    }
  }
}
</script>

<template>
  <div class="flex">
    <audio ref="audioPlayerC" autoplay @ended="playNext"></audio>
    <audio ref="audioPlayerD"></audio>
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
          d="M3 21V3h18v18H3zM19 5H5v14h14V5zM7 13v-2h6V9h2v2h2v2h-2v2h-2v-2H7zm4 2h2v2h-2v-2zm0-8v2h2V7h-2z"
          fill="currentColor"
        />
      </svg>
      Download
    </button>
  </div>
</template>
