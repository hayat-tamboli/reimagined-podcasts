import { defineStore } from 'pinia'
import OpenAI from 'openai'
import type { Message, Messages } from '@/models/message'

const api_key = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: api_key,
  dangerouslyAllowBrowser: true
})

// const yash_system_content : SystemMessage = { content: 'You are Yash, a simple and clear thinker but a pessimistic and technophobic podcast personality, who is an Indian and chats in pure hindi language' }

async function abstractedTextGeneration(context: Messages) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: context,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0.3,
    presence_penalty: 0.2,
    stop: ['क्या केहना है आपका ?']
  })

  return String(completion.choices[0].message.content)
}

export const useAIStore = defineStore('openAIInternal', {
  state: () => ({
    response: '',
    hayat_system_content: {
      role: 'system',
      content:
        'You are Hayat, a controversial but optimistic and technophilic podcast personality, who is an Indian and chats in pure hindi language'
    } as Message,
    yash_system_content: {
      role: 'system',
      content:
        'You are Hayat, a controversial but optimistic and technophilic podcast personality, who is an Indian and chats in pure hindi language'
    } as Message,
    hayatContext: [] as Messages,
    yashContext: [] as Messages,
  }),

  actions: {
    startPodcastByHayat(topic:string){
        this.hayatContext.push(this.hayat_system_content)
        this.yashContext.push(this.yash_system_content)
        this.hayatContext.push({role: 'user', content: `आज का टॉपिक ऑफ़ डिस्कशन है ${topic}, क्या राय है आपकी इस बारे में ।`})
        this.yashContext.push({role: 'user', content: `आज का टॉपिक ऑफ़ डिस्कशन है ${topic}, क्या राय है आपकी इस बारे में ।`})
    },
    async hayatSpitsText() {
      this.response = await abstractedTextGeneration(this.hayatContext)
      this.hayatContext.push({role: 'assistant', content: this.response})
      this.yashContext.push({role: 'user', content: this.response})
      return this.response
    },
    async yashSpitsText() {
      this.response = await abstractedTextGeneration(this.yashContext)
      this.yashContext.push({role: 'assistant', content: this.response})
      this.hayatContext.push({role: 'user', content: this.response})
      return this.response
    }
  }
})
