<template>
  <div>
    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Rive } from '@rive-app/canvas'

export default defineComponent({
  name: 'HayatRive',
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
