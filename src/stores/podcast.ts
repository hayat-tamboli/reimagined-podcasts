import { defineStore } from 'pinia'
import { useVoiceStore } from '@/stores/elevenLabsUtils'
import { useAIStore } from '@/stores/openaiUtils'
import type { Chats } from '@/models/chat'

export const usePodcastStore = defineStore('PodcastStore', {
  state: () => ({
    topic: '',
    speaker_1: '',
    speaker_2: '',
    blobURLs: [],
    messages: [] as Chats,
  }),
  actions: {
    setSpeaker({ speaker_1 = 'hayat', speaker_2 = 'yash' }) {
      this.speaker_1 = speaker_1
      this.speaker_2 = speaker_2
    },
    async generateTextContent() {
      const openAIStore = useAIStore()
      const voiceStore = useVoiceStore()
      openAIStore.startPodcastByHayat(this.topic)
      for(let i = 0; i<2;i++){
        await openAIStore.hayatSpitsText()
        this.messages.push({speaker: 'hayat', message: openAIStore.response})
        await voiceStore.generateVoice({speaker: 'hayat', message: openAIStore.response})
        await openAIStore.yashSpitsText()
        this.messages.push({speaker: 'yash', message: openAIStore.response})
        await voiceStore.generateVoice({speaker: 'yash', message: openAIStore.response})
      }
      console.table(this.messages)
    },
    async generateFullVoiceContent() {
      const voiceStore = useVoiceStore()
      for(let i = 0;i<this.messages.length; i++)
      {
        await voiceStore.generateVoice(this.messages[i])
      }
    }
  }
})
