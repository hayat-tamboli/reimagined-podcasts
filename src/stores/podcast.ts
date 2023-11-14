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
    yashAnim: 'idle' as Animation,
    blobsLoaded: 0.0
  }),
  actions: {
    checkVoiceCompletion() {
      console.log("checking voice completion")
      if (this.blobURLs.length == this.messages.length) {
        for(let i = 0; i<this.messages.length; i++)
        {
          console.log(this.blobURLs[i])
          if(this.blobURLs[i] == null)
          {
            break
          }
          if(i == (this.messages.length-1))
          {
            console.log("voice is all loaded now")
            this.blobsLoaded = 100
            this.voiceComplete = true
          }
        }
      }
    },
    async generateTextContent() {
      const openAIStore = useAIStore()
      const voiceStore = useVoiceStore()
      openAIStore.startPodcastByHayat(this.topic)
      const total_chats = 3
      for (let i = 0; i < total_chats; i++) {
        await openAIStore.hayatSpitsText().then((res) => {
          this.messages.push({ speaker: 'hayat', message: res })
          voiceStore.generateVoice({ speaker: 'hayat', message: res }).then((url) => {
            // this.blobURLs.push(url)
            this.blobURLs[(i*2)] = url
            console.log(url + "added to position" + String((i*2)))
            this.blobsLoaded += (100/(total_chats*2))
            this.checkVoiceCompletion()
          })
        })
        // --------------------------------
        await openAIStore.yashSpitsText().then((res) => {
          this.messages.push({ speaker: 'yash', message: res })
          voiceStore.generateVoice({ speaker: 'yash', message: res }).then((url) => {
            // this.blobURLs.push(url)
            this.blobURLs[((i*2)+1)] = url
            console.log(url + "added to position" + String((i*2)+1))
            this.blobsLoaded += (100/(total_chats*2))
            this.checkVoiceCompletion()
          })
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
