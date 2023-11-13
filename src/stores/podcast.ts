import { defineStore } from 'pinia'
import { useVoiceStore } from '@/stores/elevenLabsUtils'
import { useAIStore } from '@/stores/openaiUtils'
import type { Chats } from '@/models/chat'

type Animation = 'idle' | 'speaking'

export const usePodcastStore = defineStore('PodcastStore', {
  state: () => ({
    topic: '',
    blobURLs: [] as string[],
    messages: [] as Chats,
    chatComplete: false,
    voiceComplete: false,
    hayatAnim: 'idle' as Animation,
    yashAnim: 'idle' as Animation
  }),
  actions: {
    checkVoiceCompletion() {
      console.log("checking voice completion")
      if (this.blobURLs.length == this.messages.length) {
        console.log("voice is all loaded now")
        this.voiceComplete = true
      }
    },
    async generateTextContent() {
      const openAIStore = useAIStore()
      // const voiceStore = useVoiceStore()
      openAIStore.startPodcastByHayat(this.topic)
      for (let i = 0; i < 1; i++) {
        await openAIStore.hayatSpitsText().then((res) => {
          this.messages.push({ speaker: 'hayat', message: res })
          // voiceStore.generateVoice({ speaker: 'hayat', message: res }).then((url) => {
          //   this.blobURLs.push(url)
          //   this.checkVoiceCompletion()
          // })
        })
        // --------------------------------
        await openAIStore.yashSpitsText().then((res) => {
          this.messages.push({ speaker: 'yash', message: res })
          // voiceStore.generateVoice({ speaker: 'yash', message: res }).then((url) => {
          //   this.blobURLs.push(url)
          //   this.checkVoiceCompletion()
          // })
        })
      }
      console.info('Text Content completed')
      console.table(this.messages)
    },

    async generateFullVoiceContent() {
      const voiceStore = useVoiceStore()
      for (let i = 0; i < this.messages.length; i++) {
        await voiceStore.generateVoice(this.messages[i]).then((url) => {
          this.blobURLs[i] = url
        })
      }
      this.checkVoiceCompletion()
    }
  }
})
