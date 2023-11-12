import { defineStore } from 'pinia'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
})
const hayat_system_content =
  'You are a controversial and pessimistic podcast personality, who is an Indian and chats in pure hindi language'
type ChatModel = { hayat: string; yash: string }
let chat: ChatModel[]
async function PodcastInitializaton(topic: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: hayat_system_content },
      {
        role: 'user',
        content: `आज का टॉपिक ऑफ़ डिस्कशन है ${topic}, क्या राय है आपकी इस बारे में । `
      }
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 250
  })

  return String(completion.choices[0].message.content)
}

export const useAIStore = defineStore('openAIInternal', {
  state: () => ({
    response: '',
  }),
  // persist: true,

  actions: {
    async callAI(topic: string) {
      this.response = await PodcastInitializaton(topic)
      console.log(this.response)
    }
  }
})
