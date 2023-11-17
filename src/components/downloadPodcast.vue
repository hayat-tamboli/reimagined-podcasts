<template>
    <div>
      <it-button  @click="combineAndDownload">Download</it-button>
    </div>
  </template>
  
  <script setup lang="ts">
  // import lamejs from 'libmp3lame.js';
  import { usePodcastStore } from "@/stores/podcast"

      async function combineAndDownload() {
        const podcastStore = usePodcastStore()
        try {
          // Fetch audio blobs
          const audioBlob1 = await fetchAudioBlob(podcastStore.blobURLs[0]);
          const audioBlob2 = await fetchAudioBlob(podcastStore.blobURLs[1]);
  
          // Combine audio blobs
          const combinedBlob = new Blob([audioBlob1, audioBlob2], { type: 'audio/wav' });
  
          // Convert to MP3 using libmp3lame.js
          // const mp3Blob = await lamejs.encodeAudio(combinedBlob, 44100, 128);
  
          // Create a download link
          const downloadLink = document.createElement('a');
          // downloadLink.href = URL.createObjectURL(mp3Blob);
          downloadLink.download = 'combined.mp3';
  
          // Append the link to the document
          document.body.appendChild(downloadLink);
  
          // Trigger a click on the link to start the download
          // downloadLink.click();
        } catch (error) {
          console.error('Error combining and downloading audio:', error);
        }
      }
  
      async function fetchAudioBlob(uri: any) {
        const response = await fetch(uri);
        return response.blob();
      }
  </script>
  
  <style scoped>
  /* Add your component styles here */
  </style>
  