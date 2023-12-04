import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs'

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface Messages extends Array<ChatCompletionMessageParam> {}

export interface UserMessage extends Message {
  role: 'user'
  content: string // Hindi content
}

export interface AssistantMessage extends Message {
  role: 'assistant'
  content: string // Hindi content
}

export interface SystemMessage extends Message {
  role: 'system'
  content: string // Hindi content
}
