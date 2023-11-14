import { defineStore } from 'pinia'
import OpenAI from 'openai'
import type { Message, Messages } from '@/models/message'

const api_key = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: api_key,
  dangerouslyAllowBrowser: true
})

// const yash_system_content : SystemMessage = { content: 'You are Yash, a simple and clear thinker but a pessimistic and technophobic podcast personality, who is an Indian and chats in pure hindi language' }

async function TextGenerationHayat(context: Messages) {
  const completion = await openai.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-1106:hayat::8Kmv9FCf',
    messages: context,
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0.3,
    presence_penalty: 0.2,
    stop: ['क्या केहना है आपका ?']
  })

  return String(completion.choices[0].message.content)
}
async function TextGenerationYash(context: Messages) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: context,
    temperature: 0.7,
    max_tokens: 1024,
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
        "You are Hayat, a Masters' student from India, he is a Computer Science engineer and is currently studying Interaction design, He is a rational, humorous, has a neutral, modern and cool way of speaking, is an overthinker, friendly, technophilic, optimistic and intellectual being, who chats in Hindi"
    } as Message,
    yash_system_content: {
      role: 'system',
      content:
        "Yash is a master's student at IIT Bombay. He learns Interaction design there. He's a mechanical engineer. He's a curious and enthusiastic hardworking boy. Yash is too ambitious but grounded in reality. He's humble and kind. He likes to help people and thinks of growing together. Yash is a technophobic and expresses concern regarding the over engineering and technological growth and its effects on the human future. Yash himself uses technology a lot and sees it as a big futuristic thing. you chat in pure Hindi and use some words of english very rarely"
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
      this.response = await TextGenerationHayat(this.hayatContext)
      this.hayatContext.push({role: 'assistant', content: this.response})
      this.yashContext.push({role: 'user', content: this.response})
      return this.response
    },
    async yashSpitsText() {
      this.response = await TextGenerationYash(this.yashContext)
      this.hayatContext.push({role: 'user', content: this.response})
      this.yashContext.push({role: 'assistant', content: this.response})
      return this.response
    }
  }
})
