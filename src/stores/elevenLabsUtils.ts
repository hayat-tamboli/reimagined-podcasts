import type { Chat } from '@/models/chat'
import axios, { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

const XI_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
const HAYAT_VOICE_ID = '2WWfkCAM5iPXFUZIkThb'
const YASH_VOICE_ID = 'ecNbgYOckYI8JER9009p'
const TEST_VOICE_1 = 'C9AK6zDFrEtKcEaxUuxq'
const TEST_VOICE_2 = 'HM3qBuoTewc24lzCcCvw'

const _appendBuffer = function(bufferKaArray: ArrayBuffer[]) {
  let temp = new Uint8Array(0)
  for(let i = 0; i<bufferKaArray.length;i++)
  {
    temp = new Uint8Array(temp.byteLength + bufferKaArray[i].byteLength)
  }
  let pos = 0
  for(let i = 0; i<bufferKaArray.length;i++)
  {
    temp.set(new Uint8Array(bufferKaArray[i],pos))
    pos += bufferKaArray[i].byteLength
  }
  return temp.buffer;
};

export const useVoiceStore = defineStore('elevenLabsUtils', {
  state: () => ({
    response: new Uint8Array(0) as ArrayBuffer,
    responseURL: '',
    arrayBufferArr: [] as ArrayBuffer[],
  }),

  actions: {
    async generateVoice(chat: Chat, istest?: boolean) {
      const apiKey = XI_API_KEY
      let voiceID
      if (chat.speaker == 'hayat') voiceID = TEST_VOICE_1
      if (chat.speaker == 'yash') voiceID = TEST_VOICE_2
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
      const apiResponse : AxiosResponse = await axios.request(apiRequestOptions).then(function (response) : AxiosResponse {
        console.log("⚠️⚠️⚠️")
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response
      });
      this.response = apiResponse.data
      this.arrayBufferArr.push(this.response)
      //   this.response = await convertTextToAudio(text, voice_of, testing)
      const audioBlob = new Blob([this.response], { type: 'audio/mpeg' })
      console.log(audioBlob)
      // Create a URL for the audio blob
      this.responseURL = URL.createObjectURL(audioBlob)
      console.log(this.responseURL)
      return this.responseURL
    },
    // return the combined url of audio file
    getCombinedAudio() :string {
      const audioBlob = new Blob([_appendBuffer(this.arrayBufferArr)], { type: 'audio/mpeg' })
      return URL.createObjectURL(audioBlob)
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
