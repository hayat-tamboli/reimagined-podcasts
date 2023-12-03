import { defineStore } from 'pinia'
import { useVoiceStore } from '@/stores/elevenLabsUtils'
import { useAIStore } from '@/stores/openaiUtils'
import type { Chats } from '@/models/chat'
import type { Voice } from "@/models/speaker";

type Animation = 'idle' | 'speaking'

export const usePodcastStore = defineStore('PodcastStore', {
  state: () => ({
    topic: '',
    total_ping_pongs: 2,
    blobURLs: [] as string[],
    arrayBufferArr: [] as ArrayBuffer[],
    messages: [] as Chats,
    chatComplete: false,
    voiceComplete: false,
    hayatAnim: 'idle' as Animation,
    yashAnim: 'idle' as Animation,
    completePodcastURI: ''
  }),
  actions: {
    async generateTextContent(test = false) {
      const openAIStore = useAIStore()
      if (test) {
        return
      }
      // start podcast
      openAIStore.startPodcastByHayat(this.topic)
      
      // main conversation
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
      // end of podcast
      openAIStore.endPodcastByHayat()
      await openAIStore.hayatSpitsText().then((res) => {
        this.messages.push({ speaker: 'hayat', message: res })
        this.createSeperateVoice('hayat', res, this.total_ping_pongs*2)
      })
      console.table(this.messages)
      this.checkVoiceCompletion()
    },
    createSeperateVoice(speaker: Voice, message: string, index: number) {
      console.warn(index)
      const voiceStore = useVoiceStore()
      voiceStore.generateVoice({ speaker: speaker, message: message }).then((url) => {
        console.table(url)
        this.blobURLs[index] = url.responseurl
        this.arrayBufferArr[index] = url.arraybuffer
        this.checkVoiceCompletion()
      })
    },
    checkVoiceCompletion() {
      if (this.blobURLs.length == this.messages.length) {
        for (let i = 0; i < this.messages.length; i++) {
          if (this.blobURLs[i] == null) {
            break
          }
          if (i == this.messages.length - 1) {
            if (!this.chatComplete) {
              return
            }
            const voiceStore = useVoiceStore()
            this.completePodcastURI = voiceStore.getCombinedAudio(this.arrayBufferArr)
            this.voiceComplete = true
          }
        }
      }
      else
      {
        return
      }
    },
    /**  
    * @deprecated generateFullVoiceContent method is not used for speed and optimization reasons   
    */ 
    async generateFullVoiceContent() {
      const voiceStore = useVoiceStore()
      for (let i = 0; i < this.messages.length; i++) {
        await voiceStore.generateVoice(this.messages[i]).then((url) => {
          this.blobURLs[i] = url.responseurl
          this.arrayBufferArr[i] = url.arraybuffer
        })
      }
      this.checkVoiceCompletion()
    }
  }
})
