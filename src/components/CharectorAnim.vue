<template>
  <div>
    <canvas ref="canvas" width="350" height="350"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Rive } from '@rive-app/canvas'
// import AIronicalVideo from "../assets/AIronicals intro video.mp4";
// import HayatAnimationIdle from "../assets/hayat/animation-idle.mp4";
// import HayatAnimationSpeaking from "../assets/hayat/animation-speaking.mp4";
// import YashAnimationIdle from "../assets/yash/animation-idle.mp4";
// import YashAnimationSpeaking from "../assets/yash/animation-speaking.mp4";

export default defineComponent({
  name: 'CharectorAnim',
  props: {
    src: String,
    animation: String
  },
  watch: {
    animation: function(){
      new Rive({
      canvas: this.$refs.canvas as any,
      src: this.$props.src,
      autoplay: true,
      animations: this.$props.animation
    })
    }
  },
  mounted() {
    new Rive({
      canvas: this.$refs.canvas as any,
      src: this.$props.src,
      autoplay: true,
      animations: this.$props.animation
    })
  }
})
</script>
