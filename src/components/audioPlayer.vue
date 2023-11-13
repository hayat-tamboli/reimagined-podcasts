<template>
    <div>
      <audio ref="audioPlayer" controls></audio>
      <button @click="playAll">Play All</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        blobUrls: [/* your blob URLs here */],
      };
    },
    methods: {
      playAll() {
        const audioPlayer :any = this.$refs.audioPlayer;
  
        // Clear any existing sources
        while (audioPlayer.firstChild) {
          audioPlayer.removeChild(audioPlayer.firstChild);
        }
  
        // Create and append audio sources
        this.blobUrls.forEach((blobUrl) => {
          const source = document.createElement('source');
          source.src = blobUrl;
          audioPlayer.appendChild(source);
        });
  
        // Load and play the audio
        audioPlayer.load();
        audioPlayer.play();
      },
    },
  };
  </script>
  