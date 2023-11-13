import type { Chat } from '@/models/chat'
import axios from 'axios'
import { defineStore } from 'pinia'

const XI_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
const HAYAT_VOICE_ID = '2WWfkCAM5iPXFUZIkThb'
const YASH_VOICE_ID = 'ecNbgYOckYI8JER9009p'


export const useVoiceStore = defineStore('elevenLabsUtils', {
  state: () => ({
    response: '',
    responseURL: '',
  }),

  actions: {
    async generateVoice(chat: Chat, istest?: boolean) {
      const apiKey = XI_API_KEY
      let voiceID
      if (chat.speaker == 'hayat') voiceID = HAYAT_VOICE_ID
      if (chat.speaker == 'yash') voiceID = YASH_VOICE_ID
      if (istest)
        chat.message =
          "आज का टॉपिक है tech और mental health; so मैं ही पहले start करता हु; so let's come to tech;"

      // API request options
      const apiRequestOptions: any = {
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
        headers: {
          accept: 'audio/mpeg',
          'content-type': 'application/json',
          'xi-api-key': apiKey
        },
        data: {
          text: chat.message,
          model_id: 'eleven_multilingual_v2'
        },
        responseType: 'arraybuffer' // To receive binary data in response
      }

      // Sending the API request and waiting for response
      const apiResponse = await axios.request(apiRequestOptions)
      this.response = apiResponse.data
      //   this.response = await convertTextToAudio(text, voice_of, testing)
      const audioBlob = new Blob([this.response], { type: 'audio/mpeg' })
      console.log(audioBlob)
      // Create a URL for the audio blob
      this.responseURL = URL.createObjectURL(audioBlob)
      console.log(this.responseURL)
    },
    async getModels() {
      const apiRequestOptions: any = {
        method: 'GET',
        url: `https://api.elevenlabs.io/v1/models`,
        headers: {
          accept: 'audio/mpeg',
          'content-type': 'application/json',
          'xi-api-key': XI_API_KEY
        }
      }
      const apiResponse = await axios.request(apiRequestOptions)
      console.log(apiResponse.data)
    }
  }
})
