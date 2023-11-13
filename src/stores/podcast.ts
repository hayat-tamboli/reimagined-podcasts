import { defineStore } from 'pinia'
import { useVoiceStore } from '@/stores/elevenLabsUtils'
import { useAIStore } from '@/stores/openaiUtils'
import type { Chats } from '@/models/chat'

type Animation = 'idle' | 'speaking'

export const usePodcastStore = defineStore('PodcastStore', {
  state: () => ({
    topic: '',
    speaker_1: '',
    speaker_2: '',
    blobURLs: [] as string[],
    messages: [] as Chats,
    chatComplete: false,
    hayatAnim: 'idle' as Animation,
    yashAnim: 'idle' as Animation
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
      for (let i = 0; i < 1; i++) {
        await openAIStore.hayatSpitsText().then((res) => {
          this.messages.push({ speaker: 'hayat', message: res })
          // voiceStore.generateVoice({ speaker: 'yash', message: res }).then((url) => {
          //   this.blobURLs.push(url)
          // })
        })
        // --------------------------------
        await openAIStore.yashSpitsText().then((res) => {
          this.messages.push({ speaker: 'yash', message: res })
          // voiceStore.generateVoice({ speaker: 'yash', message: res }).then((url) => {
          //   this.blobURLs.push(url)
          // })
        })
      }
      console.table(this.messages)
    },

    async generateFullVoiceContent() {
      const voiceStore = useVoiceStore()
      for (let i = 0; i < this.messages.length; i++) {
        await voiceStore.generateVoice(this.messages[i])
      }
    },

    
  }
})
