<script lang="ts">
import router from '@/router'

export default {
  data() {
    return {
      play: false
    }
  },
  mounted() {
    this.PlayVideo()
  },
  methods: {
    PlayVideo() {
      const videoPlayer: any = this.$refs.introVideo
      videoPlayer.load()
      videoPlayer.play()
    },
    GoToHome() {
      router.push('/')
    }
  }
}
</script>

<template>
  <div>
    <video
      class="z-50 w-full h-full absolute top-0 left-0 object-cover"
      ref="introVideo"
      @ended="GoToHome"
    >
      <source src="../assets/intro-vid.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>
