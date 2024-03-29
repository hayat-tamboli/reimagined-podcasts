import { defineStore } from 'pinia'
import OpenAI from 'openai'
import type { Messages } from '@/models/message'
import { useAccessControlStore } from './accessControl'

const HAYAT_FINETUNED_MODEL = 'ft:gpt-3.5-turbo-1106:hayat::8Kmv9FCf'
const YASH_FINETUNED_MODEL = 'ft:gpt-3.5-turbo-1106:hayat::8KpEL3vk'
const GPT35 = 'gpt-3.5-turbo'
const stopSequence = ['क्या केहना है आपका ?', 'क्या राय है आपकी?', 'क्या सोचा इसके बारे में?']
// const MAX_TOKENS = 20
const MAX_TOKENS = 128


async function TextGeneration(context: Messages, model = GPT35) {
  const openai = new OpenAI({
    apiKey: useAccessControlStore().openaiAPIKey,
    dangerouslyAllowBrowser: true
  })
  context.push({
    role: 'system',
    content: `आप एक चैटबॉट हैं जो पूरी तरह से हिंदी में चैट करते हैं और आपकी अपनी controversial और अनोखी राय होनी चाहिए`
  })
  const completion = await openai.chat.completions.create({
    model: model,
    messages: context,
    temperature: 0.9,
    max_tokens: MAX_TOKENS,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
    stop: stopSequence
  })

  return String(completion.choices[0].message.content)
}

export const useAIStore = defineStore('openAIInternal', {
  state: () => ({
    response: '',
    //     "You are Hayat, a Masters' student from India, he is a Computer Science engineer and is currently studying Interaction design, He is a rational, humorous, has a neutral, modern and cool way of speaking, is an overthinker, friendly, technophilic, optimistic and intellectual being, who compltely chats in Hindi."
    //     "You are Yash, Yash is a master's student at IIT Bombay. He learns Interaction design there. He's a mechanical engineer. He's a curious and enthusiastic hardworking boy. Yash is too ambitious but grounded in reality. He's humble and kind. He likes to help people and thinks of growing together. Yash is technophobic and expresses concern regarding the over engineering and technological growth and its effects on the human future. Yash himself uses technology a lot and sees it as a big futuristic thing. Yash chats completly in Hindi."
    hayatContext: [
      {
        role: 'system',
        content:
          'आप Hayat हैं, भारत से masters के student हैं, वह एक computer science engineer हैं और वर्तमान में interaction design का अध्ययन कर रहे हैं, वह rational, humorous हैं, neutral, modern और शांत बोलने का तरीका रखते हैं, overthinker, friendly, technophilic हैं। optimistic और intellectual व्यक्ति, जो पूरी तरह से हिंदी में चैट करता है।'
      }
    ] as Messages,
    yashContext: [
      {
        role: 'system',
        content:
          'आप Yash हैं, Yash आईआईटी बॉम्बे में masters का student है। वह वहां interaction design सीखता है। वह एक mechanical engineer है. वह एक जिज्ञासु और उत्साही मेहनती लड़का है। यश बहुत ambitious है लेकिन वास्तविकता से जुड़ा हुआ है। वह humble और दयालु है. वह लोगों की मदद करना पसंद करता है और साथ मिलकर आगे बढ़ने के बारे में सोचता है। यश technophobic है और अत्यधिक engineering और तकनीकी विकास और मानव भविष्य पर इसके प्रभावों के बारे में चिंता व्यक्त करता है। यश खुद technology का काफी इस्तेमाल करते हैं और इसे एक बड़े भविष्य की चीज के तौर पर देखते हैं। यश पूरी तरह से हिंदी में चैट करते हैं।'
      }
    ] as Messages
  }),

  actions: {
    startPodcastByHayat(topic: string) {
      this.hayatContext.push({
        role: 'user',
        content: `आज का टॉपिक ऑफ़ डिस्कशन है ${topic}, क्या राय है आपकी इस बारे में ।`
      })
      this.yashContext.push({
        role: 'user',
        content: `आज का टॉपिक ऑफ़ डिस्कशन है ${topic}, क्या राय है आपकी इस बारे में ।`
      })
    },
    async hayatSpitsText() {
      this.response = await TextGeneration(this.hayatContext, HAYAT_FINETUNED_MODEL)
      this.hayatContext.push({ role: 'assistant', content: this.response })
      this.yashContext.push({ role: 'user', content: this.response })
      return this.response
    },
    async yashSpitsText() {
      this.response = await TextGeneration(this.yashContext, YASH_FINETUNED_MODEL)
      this.hayatContext.push({ role: 'user', content: this.response })
      this.yashContext.push({ role: 'assistant', content: this.response })
      return this.response
    },
    async endPodcastByHayat() {
      this.hayatContext.push({
        role: 'system',
        content: `Hayat is going to end this podcast by speaking 1 final concluding line`
      })
    }
  }
})
