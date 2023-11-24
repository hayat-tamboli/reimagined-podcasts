import type { Chat } from '@/models/chat'
import axios, { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

const XI_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
const HAYAT_VOICE_ID = 'Mdp8P6fvVv8ZHDGdZ7cN'
const YASH_VOICE_ID = 'MiWSDXEiGyYZnK10PGWr'
const TEST_VOICE_1 = 'C9AK6zDFrEtKcEaxUuxq'
const TEST_VOICE_2 = 'HM3qBuoTewc24lzCcCvw'

function combineMultipleArrayBuffers(arrayOfBuffers: ArrayBuffer[]) {
  // Calculate the total length of the combined buffer
  const totalLength = arrayOfBuffers.reduce((acc, buffer) => acc + buffer.byteLength, 0);

  // Create a new combined buffer with the total length
  const combinedBuffer = new ArrayBuffer(totalLength);
  const uint8Combined = new Uint8Array(combinedBuffer);

  let offset = 0; // Track the offset in the combined buffer

  // Loop through each buffer and copy its contents into the combined buffer
  arrayOfBuffers.forEach((buffer) => {
      const uint8Buffer = new Uint8Array(buffer);
      uint8Combined.set(uint8Buffer, offset);
      offset += buffer.byteLength; // Update the offset for the next buffer
  });

  return combinedBuffer;
}

export const useVoiceStore = defineStore('elevenLabsUtils', {
  state: () => ({
    response: new Uint8Array(0) as ArrayBuffer,
    combinedResponseURL: '',
    responseURL: '',
  }),

  actions: {
    async generateVoice(chat: Chat, istest: boolean = false) {
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
          'xi-api-key': XI_API_KEY
        },
        data: {
          text: chat.message,
          model_id: 'eleven_multilingual_v2'
        },
        responseType: 'arraybuffer' // To receive binary data in response
      }

      // Sending the API request and waiting for response
      const apiResponse : AxiosResponse = await axios.request(apiRequestOptions).then(function (response) : AxiosResponse {
        // console.log("❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️")
        // console.log("⚠️⚠️⚠️")
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        // console.log("❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️")
        return response
      });
      this.response = apiResponse.data
      const audioBlob = new Blob([this.response], { type: 'audio/mpeg' })
      // Create a URL for the audio blob
      this.responseURL = URL.createObjectURL(audioBlob)
      return {
        'responseurl': this.responseURL,
        'arraybuffer': this.response
      }
    },
    // return the combined url of audio file
    getCombinedAudio(arrayBufferArr : ArrayBuffer[]) {
      const audioBlob = new Blob([combineMultipleArrayBuffers(arrayBufferArr)], { type: 'audio/mpeg' })
      console.log(audioBlob)
      this.combinedResponseURL = URL.createObjectURL(audioBlob)
      return this.combinedResponseURL
    }
  }
})
