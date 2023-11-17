<template>
  <div>
    <canvas ref="canvas" width="350" height="350"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Rive } from '@rive-app/canvas'

export default defineComponent({
  name: 'CharectorRive',
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
