<script setup lang="ts">
import { ref } from 'vue';
import { useAIStore } from '@/stores/openai_internal'
const textContentStore = useAIStore()
import { useVoiceStore } from '@/stores/elevenLabsUtils'
const voiceStore = useVoiceStore()
let topic = ref('')
let voice = ref('')

async function submitTopic(topic = "Technology and physical health") {
  // await textContentStore.callAI(topic);
  await voiceStore.generateVoice({voice_of: "yash", istest: true, textToConvert: textContentStore.response});
  await voiceStore.generateVoice({voice_of: "hayat", istest: true, textToConvert: textContentStore.response});
  // voiceStore.getModels();
  voice.value = voiceStore.responseURL;
}
</script>
<template>
  <div class="flex justify-center items-center h-screen">
    <audio autoPlay v-if="voiceStore.responseURL != ''" >
      <source :src=voice type="audio/mpeg" />
    </audio>
    <div class="p-4">
      <form @submit.prevent="submitTopic(topic)" class="flex flex-col justify-center">
        <input
          v-model="topic"
          type="text"
          class="w-96 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Topic for the podcast"
        />
        <button
          type="submit"
          class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
        <div v-if="(false)">loading</div>
        <div v-else >
          Generate Podcast
        </div>
        </button>
      </form>
    </div>
  </div>
</template>
@/stores/openai_internal