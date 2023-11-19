import { defineStore } from 'pinia'
import { useVoiceStore } from '@/stores/elevenLabsUtils'
import { useAIStore } from '@/stores/openaiUtils'
import type { Chats } from '@/models/chat'
import type { Voice } from "@/models/speaker";

type Animation = 'idle' | 'speaking'


export const usePodcastStore = defineStore('PodcastStore', {
  state: () => ({
    topic: '',
    total_ping_pongs: 1,
    blobURLs: [] as string[],
    messages: [] as Chats,
    chatComplete: false,
    voiceComplete: false,
    hayatAnim: 'idle' as Animation,
    yashAnim: 'idle' as Animation,
    completePodcastURI: ''
  }),
  actions: {
    checkVoiceCompletion() {
      console.log('checking voice completion')
      if (this.blobURLs.length == this.messages.length) {
        for (let i = 0; i < this.messages.length; i++) {
          console.log(this.blobURLs[i])
          if (this.blobURLs[i] == null) {
            break
          }
          if (i == this.messages.length - 1) {
            if (!this.chatComplete) {
              return
            }
            console.log('voice is all loaded now')
            const voiceStore = useVoiceStore()
            this.completePodcastURI = voiceStore.getCombinedAudio()
            console.log(this.completePodcastURI)
            this.voiceComplete = true
          }
        }
      }
    },
    createSeperateVoice(speaker: Voice, message: string, index: number) {
      const voiceStore = useVoiceStore()
      voiceStore.generateVoice({ speaker: speaker, message: message }).then((url) => {
        this.blobURLs[index] = url
        console.log(url + 'added to position ' + String(index))
        this.checkVoiceCompletion()
      })
    },
    async generateTextContent(test = false) {
      const openAIStore = useAIStore()
      if (test) {
        return
      }
      openAIStore.startPodcastByHayat(this.topic)
      
      for (let i = 0; i < this.total_ping_pongs; i++) {
        await openAIStore.hayatSpitsText().then((res) => {
          this.messages.push({ speaker: 'hayat', message: res })
          this.createSeperateVoice('hayat', res, i*2)
        })
        // --------------------------------
        await openAIStore.yashSpitsText().then((res) => {
          this.messages.push({ speaker: 'yash', message: res })
          this.createSeperateVoice('yash', res, i*2 +1)
        })
      }
      console.info('Text Content completed')
      console.table(this.messages)
      this.checkVoiceCompletion()
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
