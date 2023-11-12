import { defineStore } from 'pinia'
// import { useVoiceStore } from '@/stores/elevenLabsUtils'
// const voiceStore = useVoiceStore()
import { useAIStore } from '@/stores/openaiUtils'
import type { Chats } from '@/models/chat'

export const usePodcastStore = defineStore('PodcastStore', {
  state: () => ({
    topic: '',
    speaker_1: '',
    speaker_2: '',
    blobURLs: [],
    hayat_ki_bakwaas: '',
    yash_ki_bakwaas: '',
    messages: [] as Chats,
    chatArr: [] as string[]
  }),
  actions: {
    setSpeaker({ speaker_1 = 'hayat', speaker_2 = 'yash' }) {
      this.speaker_1 = speaker_1
      this.speaker_2 = speaker_2
    },
    async generateTextContent() {
      const openAIStore = useAIStore()
      for(let i = 0; i<2;i++){
        await openAIStore.generateText(this.topic, this.speaker_1)
        this.hayat_ki_bakwaas = openAIStore.response
        this.chatArr.push(openAIStore.response)
        await openAIStore.generateText(this.topic, this.speaker_2)
        this.yash_ki_bakwaas = openAIStore.response
        this.chatArr.push(openAIStore.response)
        this.messages.push({ hayat: this.hayat_ki_bakwaas, yash: this.yash_ki_bakwaas })
      }
      console.table(this.messages)
    }
  }
})
