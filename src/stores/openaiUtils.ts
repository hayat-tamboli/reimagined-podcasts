import { defineStore } from 'pinia'
import OpenAI from 'openai'
import type { Message, SystemMessage, UserMessage } from '@/models/message'
import type { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources/index.mjs'

const api_key = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: api_key,
  dangerouslyAllowBrowser: true
})

const hayat_system_content : SystemMessage = {content: 'You are Hayat, a controversial but optimistic and technophilic podcast personality, who is an Indian and chats in pure hindi language'}
  
// const yash_system_content : SystemMessage = { content: 'You are Yash, a simple and clear thinker but a pessimistic and technophobic podcast personality, who is an Indian and chats in pure hindi language' }

async function abstractedTextGeneration(topic: string, speaker: string) {
  // let system_content: string
  // if (speaker == 'hayat') {
  //   system_content = hayat_system_content.content
  // } else {
  //   system_content = yash_system_content.content
  // }
  const contextMessages = [
    hayat_system_content,
    {content: `आज का टॉपिक ऑफ़ डिस्कशन है ${topic}, क्या राय है आपकी इस बारे में । `} as UserMessage
  ]
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: contextMessages as ChatCompletionMessageParam[],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0.3,
    presence_penalty: 0.2,
    stop: ["क्या केहना है आपका "],
  })

  return String(completion.choices[0].message.content)
}

export const useAIStore = defineStore('openAIInternal', {
  state: () => ({
    response: ''
  }),

  actions: {
    async generateText(topic: string, speaker: string) {
      this.response = await abstractedTextGeneration(topic, speaker)
      console.warn(speaker + ' says\n' + this.response + '\n')
    }
  }
})
